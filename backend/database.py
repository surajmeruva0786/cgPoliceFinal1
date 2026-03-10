"""
In-Memory Storage Backend (No Database)
All data lives in Python dicts/lists and resets on server restart.
Perfect for prototyping.
"""

import hashlib
from datetime import datetime
from typing import Optional

# ─── In-Memory Storage ────────────────────────────────────────────────────────

_officials = []   # list of dicts
_citizens = []     # list of dicts
_alerts = []       # list of dicts
_url_checks = []   # list of dicts
_deepfake_scans = []
_fraud_reports = []
_chat_sessions = []
_document_analyses = []
_news_intel_queries = []
_metadata_log = []

_next_id = {
    "official": 1, "citizen": 1, "alert": 1, "url_check": 1,
    "deepfake": 1, "fraud_report": 1, "chat_session": 1,
    "document": 1, "news": 1, "metadata": 1
}

def _get_id(key):
    _id = _next_id[key]
    _next_id[key] += 1
    return _id

def _now():
    return datetime.now().isoformat()

def _hash(pw):
    return hashlib.sha256(pw.encode()).hexdigest()


# ─── Init (no-op) ────────────────────────────────────────────────────────────

def init_db():
    """No-op — nothing to initialize."""
    # Seed a default admin official
    if not _officials:
        _officials.append({
            "id": _get_id("official"),
            "username": "admin",
            "password_hash": _hash("admin123"),
            "name": "IG Cyber Crime",
            "created_at": _now()
        })
    print("✅ In-memory storage ready (no database)")


# ─── Auth ─────────────────────────────────────────────────────────────────────

def login_official(username, password):
    pw_hash = _hash(password)
    for o in _officials:
        if o["username"] == username and o["password_hash"] == pw_hash:
            return {"success": True, "official_id": o["id"], "name": o["name"], "username": o["username"]}
    return {"success": False, "error": "Invalid username or password"}

def register_official(username, password, name="Official"):
    for o in _officials:
        if o["username"] == username:
            return {"success": False, "error": "Username already exists"}
    official = {
        "id": _get_id("official"),
        "username": username,
        "password_hash": _hash(password),
        "name": name,
        "created_at": _now()
    }
    _officials.append(official)
    return {"success": True, "official_id": official["id"], "name": name, "username": username}

def login_citizen(phone, password):
    pw_hash = _hash(password)
    for c in _citizens:
        if c["phone"] == phone and c["password_hash"] == pw_hash:
            return {"success": True, "citizen_id": c["id"], "name": c["name"], "phone": c["phone"]}
    return {"success": False, "error": "Invalid phone or password"}

def register_citizen(phone, password, name="Citizen"):
    for c in _citizens:
        if c["phone"] == phone:
            return {"success": False, "error": "Phone already registered"}
    citizen = {
        "id": _get_id("citizen"),
        "phone": phone,
        "password_hash": _hash(password),
        "name": name,
        "created_at": _now()
    }
    _citizens.append(citizen)
    return {"success": True, "citizen_id": citizen["id"], "name": name, "phone": phone}


# ─── URL Checks ──────────────────────────────────────────────────────────────

def insert_url_check(url, status, threats, citizen_id=0):
    import json
    record = {
        "id": _get_id("url_check"),
        "url": url,
        "status": status,
        "threats_json": json.dumps(threats) if threats else "[]",
        "citizen_id": citizen_id,
        "checked_at": _now()
    }
    _url_checks.insert(0, record)
    return record["id"]

def get_recent_url_checks(citizen_id=0, limit=20):
    if citizen_id:
        return [u for u in _url_checks if u["citizen_id"] == citizen_id][:limit]
    return _url_checks[:limit]


# ─── Deepfake Scans ──────────────────────────────────────────────────────────

def insert_deepfake_scan(filename, prediction, confidence, citizen_id=0):
    record = {
        "id": _get_id("deepfake"),
        "filename": filename,
        "prediction": prediction,
        "confidence": confidence,
        "citizen_id": citizen_id,
        "scanned_at": _now()
    }
    _deepfake_scans.insert(0, record)
    return record["id"]

def get_recent_deepfake_scans(citizen_id=0, limit=20):
    if citizen_id:
        return [s for s in _deepfake_scans if s["citizen_id"] == citizen_id][:limit]
    return _deepfake_scans[:limit]


# ─── Fraud Reports ───────────────────────────────────────────────────────────

def insert_fraud_report(fraud_type, contact_info, details, amount_lost=0, location="Unknown", citizen_id=0):
    record = {
        "id": _get_id("fraud_report"),
        "fraud_type": fraud_type,
        "contact_info": contact_info,
        "details": details,
        "amount_lost": amount_lost,
        "location": location,
        "citizen_id": citizen_id,
        "status": "pending",
        "created_at": _now()
    }
    _fraud_reports.insert(0, record)
    return record["id"]

def get_fraud_reports(citizen_id=None, limit=50):
    if citizen_id:
        return [r for r in _fraud_reports if r["citizen_id"] == citizen_id][:limit]
    return _fraud_reports[:limit]

def update_fraud_report_status(report_id, status, citizen_id=None):
    for r in _fraud_reports:
        if r["id"] == report_id:
            r["status"] = status
            return


# ─── Alerts (shared) ─────────────────────────────────────────────────────────

def insert_alert(title, description, severity="medium", location="Pan India", alert_type="general"):
    record = {
        "id": _get_id("alert"),
        "title": title,
        "description": description,
        "severity": severity,
        "location": location,
        "type": alert_type,
        "active": True,
        "created_at": _now()
    }
    _alerts.insert(0, record)
    return record["id"]

def get_alerts(active_only=True, limit=50):
    if active_only:
        return [a for a in _alerts if a.get("active", True)][:limit]
    return _alerts[:limit]

def toggle_alert(alert_id, active=True):
    for a in _alerts:
        if a["id"] == alert_id:
            a["active"] = active
            return


# ─── Chat Sessions ───────────────────────────────────────────────────────────

def save_chat_session(citizen_id, messages, session_id=None):
    import json
    if session_id:
        for s in _chat_sessions:
            if s["id"] == session_id:
                s["messages_json"] = json.dumps(messages)
                s["updated_at"] = _now()
                # Update title from first user message
                for m in messages:
                    if m.get("role") == "user":
                        s["title"] = m["content"][:50]
                        break
                return session_id

    title = "New Chat"
    for m in messages:
        if m.get("role") == "user":
            title = m["content"][:50]
            break

    record = {
        "id": _get_id("chat_session"),
        "citizen_id": citizen_id,
        "title": title,
        "messages_json": json.dumps(messages),
        "created_at": _now(),
        "updated_at": _now()
    }
    _chat_sessions.insert(0, record)
    return record["id"]

def get_chat_history(citizen_id, limit=20):
    import json
    results = [s for s in _chat_sessions if s["citizen_id"] == citizen_id][:limit]
    return [{"id": s["id"], "title": s["title"], "updated_at": s["updated_at"]} for s in results]

def get_chat_session(session_id, citizen_id):
    import json
    for s in _chat_sessions:
        if s["id"] == session_id and s["citizen_id"] == citizen_id:
            return {
                "id": s["id"],
                "title": s["title"],
                "messages": json.loads(s["messages_json"]),
                "updated_at": s["updated_at"]
            }
    return None


# ─── Document Analysis ───────────────────────────────────────────────────────

def save_document_analysis(filename, result, citizen_id=0):
    import json
    record = {
        "id": _get_id("document"),
        "filename": filename,
        "result_json": json.dumps(result),
        "citizen_id": citizen_id,
        "created_at": _now()
    }
    _document_analyses.insert(0, record)
    return record["id"]

def get_document_analyses(citizen_id, limit=20):
    return [d for d in _document_analyses if d["citizen_id"] == citizen_id][:limit]


# ─── News Intelligence ───────────────────────────────────────────────────────

def save_news_intel(result, user_type="citizen", user_id=0):
    import json
    record = {
        "id": _get_id("news"),
        "result_json": json.dumps(result),
        "user_type": user_type,
        "user_id": user_id,
        "created_at": _now()
    }
    _news_intel_queries.insert(0, record)
    return record["id"]

def get_news_intel_history(user_id, limit=20):
    return [n for n in _news_intel_queries if n["user_id"] == user_id][:limit]


# ─── Metadata (no-op for prototyping) ────────────────────────────────────────

def log_user_metadata(user_id, user_type, action, details=None):
    record = {
        "id": _get_id("metadata"),
        "user_id": user_id,
        "user_type": user_type,
        "action": action,
        "details": details or "",
        "created_at": _now()
    }
    _metadata_log.insert(0, record)

def get_user_metadata(user_id, user_type="citizen", limit=50):
    return [m for m in _metadata_log if m["user_id"] == user_id and m["user_type"] == user_type][:limit]


# ─── Dashboard Stats ─────────────────────────────────────────────────────────

def get_dashboard_stats():
    return {
        "total_url_checks": len(_url_checks),
        "total_deepfake_scans": len(_deepfake_scans),
        "total_fraud_reports": len(_fraud_reports),
        "total_citizens": len(_citizens),
        "total_officials": len(_officials),
        "unsafe_urls": sum(1 for u in _url_checks if u["status"] == "UNSAFE"),
        "deepfakes_detected": sum(1 for s in _deepfake_scans if s["prediction"] == "FAKE"),
        "pending_reports": sum(1 for r in _fraud_reports if r["status"] == "pending"),
        "today_url_checks": len(_url_checks),  # simplified for prototyping
        "today_deepfake_scans": len(_deepfake_scans),
    }

def get_user_stats(citizen_id):
    return {
        "total_url_checks": sum(1 for u in _url_checks if u["citizen_id"] == citizen_id),
        "total_deepfake_scans": sum(1 for s in _deepfake_scans if s["citizen_id"] == citizen_id),
        "total_fraud_reports": sum(1 for r in _fraud_reports if r["citizen_id"] == citizen_id),
        "total_chat_sessions": sum(1 for c in _chat_sessions if c["citizen_id"] == citizen_id),
    }

def get_recent_activity(activity_type=None, limit=20, citizen_id=None):
    activities = []

    for u in _url_checks:
        if citizen_id and u["citizen_id"] != citizen_id:
            continue
        activities.append({
            "id": f"url_check-{u['id']}",
            "type": "url_check",
            "description": f"URL checked: {u['url'][:50]}",
            "status": u["status"],
            "timestamp": u["checked_at"]
        })

    for s in _deepfake_scans:
        if citizen_id and s["citizen_id"] != citizen_id:
            continue
        activities.append({
            "id": f"deepfake-{s['id']}",
            "type": "deepfake_scan",
            "description": f"Deepfake scan: {s['filename']}",
            "status": s["prediction"],
            "timestamp": s["scanned_at"]
        })

    for r in _fraud_reports:
        if citizen_id and r["citizen_id"] != citizen_id:
            continue
        activities.append({
            "id": f"fraud-{r['id']}",
            "type": "fraud_report",
            "description": f"Fraud report: {r['fraud_type']}",
            "status": r["status"],
            "timestamp": r["created_at"]
        })

    if activity_type:
        activities = [a for a in activities if a["type"] == activity_type]

    activities.sort(key=lambda x: x["timestamp"], reverse=True)
    return activities[:limit]
