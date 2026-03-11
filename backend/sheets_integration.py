import requests
import threading
import os
import json
import logging

logger = logging.getLogger(__name__)

# The user can configure this in their .env file later
GOOGLE_SHEETS_WEBHOOK = os.getenv("GOOGLE_SHEETS_WEBHOOK")

def push_to_sheets_async(source: str, entities: str, locations: str, keywords: str, risk_level: str, summary: str):
    """
    Fire-and-forget background task to push metadata to the Google Sheets Apps Script Webhook.
    """
    if not GOOGLE_SHEETS_WEBHOOK:
        logger.warning(f"Google Sheets sync skipped for {source}. GOOGLE_SHEETS_WEBHOOK is not set in environment.")
        return
        
    payload = {
        "source": source,
        "entities": entities,
        "locations": locations,
        "keywords": keywords,
        "risk_level": risk_level,
        "summary": summary
    }
    
    def _send():
        try:
            response = requests.post(GOOGLE_SHEETS_WEBHOOK, json=payload, timeout=10)
            if response.status_code == 200:
                logger.info(f"Successfully synced {source} metadata to Google Sheets.")
            else:
                logger.error(f"Failed to sync {source} to Google Sheets. Status: {response.status_code}, Body: {response.text}")
        except Exception as e:
            logger.error(f"Exception syncing {source} to Google Sheets: {e}")

    # Run in background to avoid blocking the main FastAPI thread
    threading.Thread(target=_send, daemon=True).start()
