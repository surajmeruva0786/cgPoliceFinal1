"""
Deepfake Detector — ResNet50 + Bi-LSTM + Attention
Loads best_model.pth and classifies videos as REAL or FAKE.
"""

import os
import cv2
import torch
import torch.nn as nn
import numpy as np
from PIL import Image
from facenet_pytorch import MTCNN
from torchvision import models
import warnings
warnings.filterwarnings("ignore")

torch.backends.cudnn.benchmark = True


# ============================================================
# MODEL ARCHITECTURE (must match best_model.pth checkpoint)
# ============================================================

class AttentionLayer(nn.Module):
    """Attention mechanism over LSTM sequence outputs."""

    def __init__(self, hidden_size):
        super().__init__()
        self.attention = nn.Sequential(
            nn.Linear(hidden_size, 128),
            nn.Tanh(),
            nn.Linear(128, 1),
        )

    def forward(self, lstm_output):
        # lstm_output: (batch, seq_len, hidden_size)
        weights = self.attention(lstm_output)          # (batch, seq_len, 1)
        weights = torch.softmax(weights, dim=1)        # (batch, seq_len, 1)
        weighted = torch.sum(lstm_output * weights, dim=1)  # (batch, hidden_size)
        return weighted


class DeepfakeModel(nn.Module):
    """ResNet50 + Bi-LSTM + Attention deepfake classifier."""

    def __init__(self, num_classes=2, lstm_hidden=256, lstm_layers=2):
        super().__init__()

        # CNN backbone: ResNet50 (all layers exposed as nn.Sequential children)
        resnet = models.resnet50(weights=None)
        self.cnn = nn.Sequential(
            resnet.conv1,    # 0
            resnet.bn1,      # 1
            resnet.relu,     # 2
            resnet.maxpool,  # 3
            resnet.layer1,   # 4
            resnet.layer2,   # 5
            resnet.layer3,   # 6
            resnet.layer4,   # 7
        )

        # Projection: 2048 -> 512
        self.project = nn.Linear(2048, lstm_hidden * 2)  # 512

        # Bi-LSTM
        self.lstm = nn.LSTM(
            input_size=lstm_hidden * 2,    # 512
            hidden_size=lstm_hidden,        # 256
            num_layers=lstm_layers,
            batch_first=True,
            bidirectional=True,
        )

        # Attention
        self.attention = AttentionLayer(lstm_hidden * 2)  # 512

        # Classifier
        self.classifier = nn.Sequential(
            nn.Linear(lstm_hidden * 2, 256),  # 0
            nn.ReLU(),                         # 1
            nn.Dropout(0.3),                   # 2
            nn.Linear(256, num_classes),       # 3
        )

    def forward(self, x):
        """
        x: (batch, seq_len, C, H, W)
        """
        batch, seq_len, C, H, W = x.shape

        # Process all frames through CNN
        x = x.view(batch * seq_len, C, H, W)
        features = self.cnn(x)                           # (B*T, 2048, h, w)
        features = features.mean(dim=[2, 3])              # GAP → (B*T, 2048)
        features = self.project(features)                 # (B*T, 512)
        features = features.view(batch, seq_len, -1)      # (B, T, 512)

        # Sequence modelling
        lstm_out, _ = self.lstm(features)                 # (B, T, 512)
        attended = self.attention(lstm_out)                # (B, 512)

        # Classification
        logits = self.classifier(attended)                # (B, 2)
        return logits


# ============================================================
# DETECTOR WRAPPER
# ============================================================

class DeepfakeDetector:

    def __init__(self, weights_dir="weights", device="auto"):

        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        ) if device == "auto" else torch.device(device)

        if self.device.type == "cuda":
            print(f"🚀 Using GPU: {torch.cuda.get_device_name(0)}")
        else:
            print("⚠ Running on CPU")

        # MTCNN face detector
        self.detector = MTCNN(
            margin=0,
            thresholds=[0.7, 0.8, 0.8],
            device=self.device,
        )

        self.model = self._load_model(weights_dir)

    # --------------------------------------------------------

    def _load_model(self, weights_dir):

        weight_path = os.path.join(weights_dir, "best_model.pth")

        if not os.path.exists(weight_path):
            print(f"⚠ Model weights not found at {weight_path}")
            return None

        print(f"📥 Loading model from {weight_path}...")

        model = DeepfakeModel(num_classes=2, lstm_hidden=256, lstm_layers=2)

        state_dict = torch.load(weight_path, map_location="cpu", weights_only=False)

        # Clean keys if wrapped in DataParallel
        cleaned = {}
        for k, v in state_dict.items():
            key = k
            if key.startswith("module."):
                key = key[7:]
            cleaned[key] = v

        model.load_state_dict(cleaned, strict=True)
        model.to(self.device)
        model.eval()

        print("✅ Model loaded successfully\n")
        return model

    # --------------------------------------------------------

    def isotropic_resize(self, img, size=224):
        """Resize keeping aspect ratio, pad to square."""
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

    def predict_video(self, video_path, num_frames=16):
        """
        Classify a video as REAL or FAKE using the ResNet50 + BiLSTM + Attention model.
        Extracts face crops from evenly-sampled frames, then runs the full sequence
        through the model for a single prediction.
        """

        if self.model is None:
            return {"prediction": "ERROR: No model loaded", "confidence": 0.0}

        cap = cv2.VideoCapture(video_path)
        total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

        if total <= 0:
            cap.release()
            return {"prediction": "ERROR: Could not read video", "confidence": 0.0}

        indices = np.linspace(0, total - 1, num_frames, dtype=int)
        face_crops = []

        for idx in indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if not ret:
                continue

            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            h, w = frame.shape[:2]

            # Half-resolution face detection for speed
            img_half = Image.fromarray(frame).resize((w // 2, h // 2))
            boxes, _ = self.detector.detect(img_half)

            if boxes is None:
                continue

            # Take the largest face
            areas = [(b[2] - b[0]) * (b[3] - b[1]) for b in boxes]
            bbox = boxes[np.argmax(areas)]
            xmin, ymin, xmax, ymax = [int(b * 2) for b in bbox]

            # Pad bounding box
            w_box = xmax - xmin
            h_box = ymax - ymin
            pad_w = w_box // 3
            pad_h = h_box // 3

            crop = frame[
                max(ymin - pad_h, 0):ymax + pad_h,
                max(xmin - pad_w, 0):xmax + pad_w,
            ]

            if crop.size == 0:
                continue

            crop = self.isotropic_resize(crop, 224)
            face_crops.append(crop)

        cap.release()

        if len(face_crops) == 0:
            return {"prediction": "UNKNOWN", "confidence": 0.0}

        # Pad or truncate to exactly num_frames
        while len(face_crops) < num_frames:
            face_crops.append(face_crops[-1])  # repeat last frame
        face_crops = face_crops[:num_frames]

        # Build tensor: (1, seq_len, C, H, W)
        frames_np = np.stack(face_crops, axis=0)  # (T, H, W, 3)
        tensor = torch.tensor(frames_np, dtype=torch.float32, device=self.device)
        tensor = tensor.permute(0, 3, 1, 2) / 255.0  # (T, 3, H, W)

        # ImageNet normalization
        mean = torch.tensor([0.485, 0.456, 0.406], device=self.device).view(1, 3, 1, 1)
        std = torch.tensor([0.229, 0.224, 0.225], device=self.device).view(1, 3, 1, 1)
        tensor = (tensor - mean) / std

        tensor = tensor.unsqueeze(0)  # (1, T, 3, 224, 224)

        with torch.no_grad():
            logits = self.model(tensor)                        # (1, 2)
            probs = torch.softmax(logits, dim=1)[0]            # (2,)
            pred_class = torch.argmax(probs).item()
            confidence = probs[pred_class].item()

        # Class mapping: index 0 = REAL, index 1 = FAKE
        prediction = "FAKE" if pred_class == 1 else "REAL"

        return {"prediction": prediction, "confidence": float(confidence)}


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("video_path")
    args = parser.parse_args()

    detector = DeepfakeDetector()
    result = detector.predict_video(args.video_path)
    print(f"Prediction: {result}")
