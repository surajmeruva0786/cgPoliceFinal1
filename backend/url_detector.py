import requests
import os
import json

# ==============================
# CONFIGURATION
# ==============================

def get_api_key():
    # Try to get from environment variable, fallback to user provided string if needed (though env is better)
    return os.environ.get("GOOGLE_SAFE_BROWSING_API_KEY")

SAFE_BROWSING_URL_TEMPLATE = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key={}"

# ==============================
# URL CHECK FUNCTION
# ==============================

def check_url_safety(url):
    """
    Checks a given URL using Google Safe Browsing API.
    """
    api_key = get_api_key()
    if not api_key:
        return {
            "status": "ERROR",
            "details": "API Key not configured on server."
        }

    safe_browsing_url = SAFE_BROWSING_URL_TEMPLATE.format(api_key)

    payload = {
        "client": {
            "clientId": "cybercrime-detection-system",
            "clientVersion": "1.0"
        },
        "threatInfo": {
            "threatTypes": [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION"
            ],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [
                {"url": url}
            ]
        }
    }

    try:
        response = requests.post(safe_browsing_url, json=payload, timeout=10)

        if response.status_code != 200:
            return {
                "status": "ERROR",
                "details": f"API Error {response.status_code}: {response.text}"
            }

        result = response.json()

        if "matches" in result:
            return {
                "status": "UNSAFE",
                "threats": result["matches"]
            }
        else:
            return {
                "status": "SAFE",
                "threats": None
            }

    except requests.exceptions.RequestException as e:
        return {
            "status": "ERROR",
            "details": str(e)
        }
