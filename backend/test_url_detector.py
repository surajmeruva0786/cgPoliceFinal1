"""
Test Script for URL Detection API
Make sure backend is running before executing this.

Run:
    python test_url_detector.py
"""

import requests

API_ENDPOINT = "http://127.0.0.1:8000/check-url"

def test_url(url_to_test):
    payload = {"url": url_to_test}

    try:
        response = requests.post(
            API_ENDPOINT,
            json=payload,
            timeout=20
        )

        print("\n" + "=" * 60)
        print(f"Testing URL: {url_to_test}")
        print("=" * 60)
        print(f"Status Code: {response.status_code}")

        try:
            print("Response JSON:")
            print(response.json())
        except ValueError:
            print("Response Text:")
            print(response.text)

    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Cannot connect to backend.")
        print("Make sure FastAPI server is running:")
        print("uvicorn main:app --reload")
    except requests.exceptions.Timeout:
        print("\n❌ ERROR: Request timed out.")
    except Exception as e:
        print(f"\n❌ Unexpected Error: {e}")


if __name__ == "__main__":
    print("🔎 Starting URL Detection Tests...")

    # Test Safe URL
    test_url("http://google.com")

    # Test Known Phishing Test URL
    test_url("http://testsafebrowsing.appspot.com/s/phishing.html")

    print("\n✅ Testing Complete.")
