from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import asyncio
import json
import shutil
import os
from dotenv import load_dotenv

load_dotenv()

import uuid
try:
    from deepfake_detector import DeepfakeDetector
except ImportError as e:
    print(f"Warning: Could not import DeepfakeDetector: {e}")
    DeepfakeDetector = None
    
from document_analysis import process_document
from news_intelligence import get_news_intel
from chatbot import get_chat_response, get_chat_stream
from url_detector import check_url_safety
from pydantic import BaseModel
from typing import List, Dict, Optional
from database import (
    init_db,
    # Auth
    login_official, register_official,
    login_citizen, register_citizen,
    # Per-user data
    insert_url_check, get_recent_url_checks,
    insert_deepfake_scan, get_recent_deepfake_scans,
    insert_fraud_report, get_fraud_reports, update_fraud_report_status,
    # Shared data
    insert_alert, get_alerts, toggle_alert,
    # Dashboard & activity
    get_dashboard_stats, get_recent_activity,
    get_user_stats,
    # AI Content (generated content storage)
    save_chat_session, get_chat_history, get_chat_session,
    save_document_analysis, get_document_analyses,
    save_news_intel, get_news_intel_history,
    # Metadata
    log_user_metadata, get_user_metadata,
)

app = FastAPI()

# Initialize database on startup
init_db()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Request Models ───────────────────────────────────────────────────────────

class OfficialLoginRequest(BaseModel):
    username: str
    password: str

class OfficialRegisterRequest(BaseModel):
    username: str
    password: str
    name: str = "Official"

class CitizenRegisterRequest(BaseModel):
    phone: str
    password: str
    name: str = "Citizen"

class CitizenLoginRequest(BaseModel):
    phone: str
    password: str

class URLCheckRequest(BaseModel):
    url: str
    citizen_id: int

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]
    citizen_id: int
    session_id: Optional[int] = None
    stream: bool = True

class FraudReportRequest(BaseModel):
    fraud_type: str
    contact_info: str = ""
    details: str
    amount_lost: float = 0
    location: str = "Unknown"
    citizen_id: int

class AlertRequest(BaseModel):
    title: str
    description: str
    severity: str = "medium"
    location: str = "Pan India"
    type: str = "general"

class UpdateReportStatusRequest(BaseModel):
    status: str
    citizen_id: Optional[int] = None

# ─── Authentication ───────────────────────────────────────────────────────────

@app.post("/auth/official/login")
async def official_login(request: OfficialLoginRequest):
    result = login_official(request.username, request.password)
    if not result["success"]:
        raise HTTPException(status_code=401, detail=result["error"])
    return result

@app.post("/auth/official/register")
async def official_register(request: OfficialRegisterRequest):
    result = register_official(request.username, request.password, request.name)
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/auth/citizen/register")
async def citizen_register(request: CitizenRegisterRequest):
    result = register_citizen(request.phone, request.password, request.name)
    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/auth/citizen/login")
async def citizen_login(request: CitizenLoginRequest):
    result = login_citizen(request.phone, request.password)
    if not result["success"]:
        raise HTTPException(status_code=401, detail=result["error"])
    return result

# ─── URL Checking (per-user) ─────────────────────────────────────────────────

@app.post("/check-url")
async def api_check_url(request: URLCheckRequest):
    result = check_url_safety(request.url)
    threats = result.get("threats", [])
    insert_url_check(
        url=request.url,
        status=result.get("status", "UNKNOWN"),
        threats=threats,
        citizen_id=request.citizen_id
    )
    
    try:
        if result.get("status") == "UNSAFE":
            from sheets_integration import push_to_sheets_async
            push_to_sheets_async(
                source="Fraud URL Scanner",
                entities=request.url,
                locations="Cyber",
                keywords=", ".join([t.get("threatType", "") for t in threats]),
                risk_level="High",
                summary=f"Malicious URL requested by User ID: {request.citizen_id}"
            )
    except Exception as e:
        print(f"Error triggering sheets sync: {e}")
        
    return result

@app.get("/url-history/{citizen_id}")
async def url_history(citizen_id: int, limit: int = 20):
    return get_recent_url_checks(citizen_id, limit)

# ─── Deepfake Detection (per-user) ──────────────────────────────────────────

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
    return {"status": "CG Police API is running", "database": "Per-user SQLite", "auth": "enabled"}

@app.post("/detect")
async def detect_deepfake(file: UploadFile = File(...), citizen_id: int = Form(0)):
    if detector is None:
        raise HTTPException(status_code=500, detail="Detector not initialized. check server logs.")

    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    if citizen_id == 0:
        raise HTTPException(status_code=400, detail="citizen_id is required")

    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = detector.predict_video(file_path)
        
        insert_deepfake_scan(
            filename=file.filename,
            prediction=result["prediction"],
            confidence=result["confidence"],
            citizen_id=citizen_id
        )
        
        try:
            if result["prediction"] == "FAKE":
                from sheets_integration import push_to_sheets_async
                push_to_sheets_async(
                    source="Deepfake Scanner",
                    entities=file.filename,
                    locations="N/A",
                    keywords="Deepfake, Impersonation",
                    risk_level=f"{result['confidence']*100:.1f}% Confidence",
                    summary=f"Fake Audio/Video scanned by Citizen ID {citizen_id}"
                )
        except Exception as e:
            print(f"Error triggering sheets sync: {e}")
        
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
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except:
                pass

@app.get("/deepfake-history/{citizen_id}")
async def deepfake_history(citizen_id: int, limit: int = 20):
    return get_recent_deepfake_scans(citizen_id, limit)

# ─── Chat (per-user, stores generated content) ────────────────────────────────

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if not request.stream:
        full_response = ""
        try:
            for chunk in get_chat_stream(request.messages):
                full_response += chunk
            
            all_messages = request.messages + [{"role": "assistant", "content": full_response}]
            session_id = save_chat_session(
                citizen_id=request.citizen_id,
                messages=all_messages,
                session_id=request.session_id
            )
            return {"response": full_response, "session_id": session_id}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def generate_response():
        full_response = ""
        try:
            for chunk in get_chat_stream(request.messages):
                full_response += chunk
                yield f"data: {json.dumps({'content': chunk})}\n\n"
                await asyncio.sleep(0.005) # Yield control allowing tiny flushes
                
            # Always save to user's DB after generation completes
            all_messages = request.messages + [{"role": "assistant", "content": full_response}]
            session_id = save_chat_session(
                citizen_id=request.citizen_id,
                messages=all_messages,
                session_id=request.session_id
            )
            yield f"data: {json.dumps({'session_id': session_id})}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(generate_response(), media_type="text/event-stream")

@app.get("/chat-history/{citizen_id}")
async def chat_history(citizen_id: int, limit: int = 20):
    return get_chat_history(citizen_id, limit)

@app.get("/chat-session/{citizen_id}/{session_id}")
async def chat_session_detail(citizen_id: int, session_id: int):
    session = get_chat_session(session_id, citizen_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

# ─── Document Analysis (per-user, stores generated content) ───────────────────

@app.post("/analyze-document")
async def analyze_document_endpoint(file: UploadFile = File(...), citizen_id: int = Form(0)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    if citizen_id == 0:
        raise HTTPException(status_code=400, detail="citizen_id is required")
        
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        result = process_document(file_path)
        
        # Save generated analysis result to user's DB  
        save_document_analysis(
            filename=file.filename,
            result=result,
            citizen_id=citizen_id
        )
        
        return result
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(file_path):
            try:
                os.remove(file_path)
            except:
                pass

@app.get("/document-history/{citizen_id}")
async def document_history(citizen_id: int, limit: int = 20):
    return get_document_analyses(citizen_id, limit)

# ─── News Intelligence (per-user, stores generated content) ──────────────────

@app.get("/news-intel")
async def news_intelligence_endpoint(user_id: int = 0, user_type: str = "citizen"):
    try:
        result = get_news_intel()
        # Save generated news intel result to user's DB
        if user_id > 0:
            save_news_intel(result=result, user_type=user_type, user_id=user_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/news-intel-history/{user_id}")
async def news_intel_history_endpoint(user_id: int, limit: int = 20):
    return get_news_intel_history(user_id, limit)

# ─── Fraud Reports ─────────────────────────────────────────────────────────────

@app.post("/report-fraud")
async def report_fraud(request: FraudReportRequest):
    report_id = insert_fraud_report(
        fraud_type=request.fraud_type,
        contact_info=request.contact_info,
        details=request.details,
        amount_lost=request.amount_lost,
        location=request.location,
        citizen_id=request.citizen_id
    )
    
    try:
        from sheets_integration import push_to_sheets_async
        push_to_sheets_async(
            source="Citizen Fraud Report",
            entities=request.contact_info,
            locations=request.location,
            keywords=request.fraud_type,
            risk_level=f"₹{request.amount_lost}",
            summary=request.details
        )
    except Exception as e:
        print(f"Error triggering sheets sync: {e}")
        
    return {
        "success": True,
        "report_id": report_id,
        "reference": f"FR-2024-{report_id:04d}",
        "message": "Fraud report submitted successfully"
    }

@app.get("/fraud-reports")
async def get_all_fraud_reports(citizen_id: Optional[int] = None, limit: int = 50):
    """Get fraud reports. If citizen_id provided, returns only that user's reports.
       Without citizen_id (official view), aggregates across all users."""
    return get_fraud_reports(citizen_id, limit)

@app.put("/fraud-reports/{report_id}/status")
async def update_report(report_id: int, request: UpdateReportStatusRequest):
    update_fraud_report_status(report_id, request.status, request.citizen_id)
    return {"success": True, "message": f"Report {report_id} updated to '{request.status}'"}

# ─── Alerts (shared) ─────────────────────────────────────────────────────────

@app.post("/alerts")
async def create_alert(request: AlertRequest):
    alert_id = insert_alert(
        title=request.title,
        description=request.description,
        severity=request.severity,
        location=request.location,
        alert_type=request.type
    )
    return {"success": True, "alert_id": alert_id, "message": "Alert created"}

@app.get("/alerts")
async def list_alerts(active_only: bool = True, limit: int = 50):
    return get_alerts(active_only, limit)

@app.put("/alerts/{alert_id}/toggle")
async def toggle_alert_status(alert_id: int, active: bool = True):
    toggle_alert(alert_id, active)
    return {"success": True}

# ─── Dashboard Stats (aggregated for officials) ──────────────────────────────

@app.get("/dashboard-stats")
async def dashboard_stats():
    return get_dashboard_stats()

@app.get("/user-stats/{citizen_id}")
async def user_stats(citizen_id: int):
    """Get per-user statistics."""
    return get_user_stats(citizen_id)

@app.get("/recent-activity")
async def recent_activity(type: Optional[str] = None, limit: int = 20, citizen_id: Optional[int] = None):
    return get_recent_activity(activity_type=type, limit=limit, citizen_id=citizen_id)

@app.get("/recent-url-checks/{citizen_id}")
async def recent_url_checks(citizen_id: int, limit: int = 20):
    return get_recent_url_checks(citizen_id, limit)

@app.get("/recent-deepfake-scans/{citizen_id}")
async def recent_deepfake_scans(citizen_id: int, limit: int = 20):
    return get_recent_deepfake_scans(citizen_id, limit)

# ─── Metadata ─────────────────────────────────────────────────────────────────

@app.get("/user-metadata/{user_id}")
async def user_metadata(user_id: int, user_type: str = "citizen", limit: int = 50):
    """Get metadata/activity log for a specific user."""
    return get_user_metadata(user_id, user_type, limit)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
