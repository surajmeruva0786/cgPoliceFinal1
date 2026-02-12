from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import uuid
from deepfake_detector import DeepfakeDetector

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize detector
# Ensure you have 'weights' directory with model files
weights_path = os.path.join(os.path.dirname(__file__), "weights")
try:
    detector = DeepfakeDetector(weights_dir=weights_path)
except Exception as e:
    print(f"Error initializing detector: {e}")
    detector = None

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"status": "Deepfake Detector API is running"}

@app.post("/detect")
async def detect_deepfake(file: UploadFile = File(...)):
    if detector is None:
        raise HTTPException(status_code=500, detail="Detector not initialized. check server logs.")

    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    try:
        # Save uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Run detection
        result = detector.predict_video(file_path)
        
        return {
            "filename": file.filename,
            "prediction": result["prediction"],
            "confidence": result["confidence"],
            "details": "Processed successfully"
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        # Cleanup: remove uploaded file after processing
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except:
                pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
