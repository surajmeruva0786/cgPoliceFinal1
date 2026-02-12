"""
DFDC Deepfake Detector - Largest Face Version
Fully compatible with selimsef/dfdc_deepfake_challenge
GPU optimized + FP16
"""

import os
import cv2
import torch
import timm
import numpy as np
from PIL import Image
from facenet_pytorch import MTCNN
import warnings
warnings.filterwarnings("ignore")

torch.backends.cudnn.benchmark = True


# ============================================================
# MODEL
# ============================================================

class DeepfakeDetector:

    def __init__(self, weights_dir="weights", device="auto", use_ensemble=True):

        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        ) if device == "auto" else torch.device(device)

        if self.device.type == "cuda":
            print(f"🚀 Using GPU: {torch.cuda.get_device_name(0)}")
        else:
            print("⚠ Running on CPU")

        # MTCNN detector (inference thresholds)
        self.detector = MTCNN(
            margin=0,
            thresholds=[0.7, 0.8, 0.8],
            device=self.device
        )

        self.models = self._load_models(weights_dir, use_ensemble)

    # --------------------------------------------------------

    def _create_model(self):
        model = timm.create_model(
            "tf_efficientnet_b7_ns",
            pretrained=False,
            num_classes=1
        )
        return model

    # --------------------------------------------------------

    def _load_models(self, weights_dir, use_ensemble):

        if not os.path.exists(weights_dir):
             os.makedirs(weights_dir, exist_ok=True)
             print(f"⚠ Created weights directory at {weights_dir}. Please add model weights.")
             return []

        weight_files = [
            os.path.join(weights_dir, f)
            for f in os.listdir(weights_dir)
            if "tf_efficientnet_b7_ns" in f
        ]

        if not weight_files:
            print("⚠ No weights found in weights directory. Models will not be loaded.")
            return []

        if not use_ensemble:
            weight_files = weight_files[:1]

        print(f"📥 Loading {len(weight_files)} model(s)...")

        models = []

        for wf in weight_files:
            print(f"   → {os.path.basename(wf)}")

            model = self._create_model()

            checkpoint = torch.load(wf, map_location="cpu", weights_only=False)

            state_dict = checkpoint["state_dict"] if "state_dict" in checkpoint else checkpoint

            cleaned = {}
            for k, v in state_dict.items():
                if k.startswith("module."):
                    k = k[7:]
                if k.startswith("model."):
                    k = k[6:]
                cleaned[k] = v

            model.load_state_dict(cleaned, strict=False)
            model.to(self.device)
            model.eval()

            models.append(model)

        print("✅ Models loaded successfully\n")
        return models

    # --------------------------------------------------------
    # ISOTROPIC RESIZE
    # --------------------------------------------------------

    def isotropic_resize(self, img, size=380):
        h, w = img.shape[:2]

        if w > h:
            scale = size / w
            new_w = size
            new_h = int(h * scale)
        else:
            scale = size / h
            new_h = size
            new_w = int(w * scale)

        interpolation = cv2.INTER_CUBIC if scale > 1 else cv2.INTER_AREA
        resized = cv2.resize(img, (new_w, new_h), interpolation=interpolation)

        canvas = np.zeros((size, size, 3), dtype=np.uint8)

        start_x = (size - new_w) // 2
        start_y = (size - new_h) // 2

        canvas[start_y:start_y + new_h, start_x:start_x + new_w] = resized

        return canvas

    # --------------------------------------------------------

    def confident_strategy(self, preds, t=0.8):

        preds = np.array(preds)
        sz = len(preds)
        fakes = np.count_nonzero(preds > t)

        if fakes > sz // 2.5 and fakes > 11:
            return np.mean(preds[preds > t])
        elif np.count_nonzero(preds < 0.2) > 0.9 * sz:
            return np.mean(preds[preds < 0.2])
        else:
            return np.mean(preds)

    # --------------------------------------------------------

    def predict_video(self, video_path, num_frames=32):
        
        if not self.models:
            return {"prediction": "ERROR: No models loaded", "confidence": 0.0}

        cap = cv2.VideoCapture(video_path)
        total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        if total <= 0:
             cap.release()
             return {"prediction": "ERROR: Could not read video", "confidence": 0.0}

        indices = np.linspace(0, total - 1, num_frames, dtype=int)

        preds = []

        for idx in indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if not ret:
                continue

            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            h, w = frame.shape[:2]

            # Half resolution detection
            img_half = Image.fromarray(frame).resize((w // 2, h // 2))
            boxes, _ = self.detector.detect(img_half)

            if boxes is None:
                continue

            # Take largest face
            areas = [(b[2]-b[0])*(b[3]-b[1]) for b in boxes]
            bbox = boxes[np.argmax(areas)]

            xmin, ymin, xmax, ymax = [int(b * 2) for b in bbox]

            w_box = xmax - xmin
            h_box = ymax - ymin

            pad_w = w_box // 3
            pad_h = h_box // 3

            crop = frame[
                max(ymin - pad_h, 0):ymax + pad_h,
                max(xmin - pad_w, 0):xmax + pad_w
            ]
            
            if crop.size == 0:
                continue

            crop = self.isotropic_resize(crop, 380)

            tensor = torch.tensor(crop, device=self.device).float()
            tensor = tensor.permute(2, 0, 1) / 255.0

            # ImageNet normalization
            mean = torch.tensor([0.485, 0.456, 0.406], device=self.device).view(3,1,1)
            std = torch.tensor([0.229, 0.224, 0.225], device=self.device).view(3,1,1)
            tensor = (tensor - mean) / std

            if self.device.type == "cuda":
                tensor = tensor.unsqueeze(0).half()
            else:
                tensor = tensor.unsqueeze(0).float()

            with torch.no_grad():
                with torch.cuda.amp.autocast(enabled=self.device.type == "cuda"):
                    frame_preds = []
                    for model in self.models:
                        output = model(tensor)
                        prob = torch.sigmoid(output)[0].item()
                        frame_preds.append(prob)

                    preds.append(np.mean(frame_preds))

        cap.release()

        if len(preds) == 0:
            return {"prediction": "UNKNOWN", "confidence": 0.0}

        final_score = self.confident_strategy(preds)

        prediction = "FAKE" if final_score > 0.5 else "REAL"

        return {"prediction": prediction, "confidence": float(final_score)}

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("video_path")
    args = parser.parse_args()
    
    # Initialize with default weights dir
    detector = DeepfakeDetector()
    result = detector.predict_video(args.video_path)
    print(f"Prediction: {result}")
