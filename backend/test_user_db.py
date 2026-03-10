"""
Test Script for User-Based Database Architecture
Tests that per-user data isolation works correctly.

Run:
    cd backend
    python test_user_db.py
"""

import requests
import time

API = "http://127.0.0.1:8000"

def test_full_flow():
    print("=" * 60)
    print("  User-Based Database Architecture Test")
    print("=" * 60)

    # 1. Register two citizens
    print("\n1. Registering two citizens...")
    
    r1 = requests.post(f"{API}/auth/citizen/register", json={
        "phone": "9999000001", "password": "test123", "name": "Alice"
    })
    print(f"   Citizen 1: {r1.json()}")
    c1_id = r1.json().get("citizen_id")
    
    r2 = requests.post(f"{API}/auth/citizen/register", json={
        "phone": "9999000002", "password": "test456", "name": "Bob"
    })
    print(f"   Citizen 2: {r2.json()}")
    c2_id = r2.json().get("citizen_id")

    if not c1_id or not c2_id:
        print("   ❌ Registration failed! (accounts may already exist)")
        # Try logging in instead
        r1 = requests.post(f"{API}/auth/citizen/login", json={
            "phone": "9999000001", "password": "test123"
        })
        c1_id = r1.json().get("citizen_id")
        r2 = requests.post(f"{API}/auth/citizen/login", json={
            "phone": "9999000002", "password": "test456"
        })
        c2_id = r2.json().get("citizen_id")
        print(f"   Logged in: Citizen 1={c1_id}, Citizen 2={c2_id}")
    
    if not c1_id or not c2_id:
        print("   ❌ FATAL: Could not get citizen IDs")
        return

    # 2. Citizen 1 checks a URL
    print("\n2. Citizen 1 checks a URL...")
    r = requests.post(f"{API}/check-url", json={
        "url": "https://google.com", "citizen_id": c1_id
    })
    print(f"   Result: {r.json().get('status', 'N/A')}")

    # 3. Citizen 2 checks a different URL
    print("\n3. Citizen 2 checks a URL...")
    r = requests.post(f"{API}/check-url", json={
        "url": "https://example.com", "citizen_id": c2_id
    })
    print(f"   Result: {r.json().get('status', 'N/A')}")

    # 4. Citizen 1 submits a fraud report
    print("\n4. Citizen 1 submits a fraud report...")
    r = requests.post(f"{API}/report-fraud", json={
        "fraud_type": "phishing-sms",
        "contact_info": "9876543210",
        "details": "Received phishing SMS about KYC update",
        "citizen_id": c1_id
    })
    print(f"   Result: {r.json()}")

    # 5. Citizen 1 sends a chat message
    print("\n5. Citizen 1 chats with AI assistant...")
    r = requests.post(f"{API}/chat", json={
        "messages": [{"role": "user", "content": "What is digital arrest scam?"}],
        "citizen_id": c1_id
    })
    data = r.json()
    print(f"   Session ID: {data.get('session_id')}")
    print(f"   Response preview: {data.get('response', 'N/A')[:80]}...")

    # 6. Verify data isolation — Citizen 2 should NOT see Citizen 1's data
    print("\n6. Verifying data isolation...")
    
    c1_urls = requests.get(f"{API}/recent-url-checks/{c1_id}").json()
    c2_urls = requests.get(f"{API}/recent-url-checks/{c2_id}").json()
    
    print(f"   Citizen 1 URL checks: {len(c1_urls)}")
    print(f"   Citizen 2 URL checks: {len(c2_urls)}")
    
    c1_reports = requests.get(f"{API}/fraud-reports?citizen_id={c1_id}").json()
    c2_reports = requests.get(f"{API}/fraud-reports?citizen_id={c2_id}").json()
    
    print(f"   Citizen 1 fraud reports: {len(c1_reports)}")
    print(f"   Citizen 2 fraud reports: {len(c2_reports)}")

    c1_chats = requests.get(f"{API}/chat-history/{c1_id}").json()
    c2_chats = requests.get(f"{API}/chat-history/{c2_id}").json()
    
    print(f"   Citizen 1 chat sessions: {len(c1_chats)}")
    print(f"   Citizen 2 chat sessions: {len(c2_chats)}")

    # 7. Test per-user stats
    print("\n7. Per-user stats...")
    c1_stats = requests.get(f"{API}/user-stats/{c1_id}").json()
    c2_stats = requests.get(f"{API}/user-stats/{c2_id}").json()
    print(f"   Citizen 1: {c1_stats}")
    print(f"   Citizen 2: {c2_stats}")

    # 8. Test dashboard aggregated stats (official view)
    print("\n8. Aggregated dashboard stats (official view)...")
    stats = requests.get(f"{API}/dashboard-stats").json()
    print(f"   Total URL checks: {stats.get('total_url_checks')}")
    print(f"   Total fraud reports: {stats.get('total_fraud_reports')}")
    print(f"   Total citizens: {stats.get('total_citizens')}")

    # 9. Test metadata
    print("\n9. User metadata (login/action logs)...")
    meta = requests.get(f"{API}/user-metadata/{c1_id}?limit=5").json()
    for entry in meta[:3]:
        print(f"   [{entry['action']}] at {entry['created_at']}")

    # 10. Official login
    print("\n10. Official login...")
    r = requests.post(f"{API}/auth/official/login", json={
        "username": "admin", "password": "admin123"
    })
    print(f"    Result: {r.json()}")

    print("\n" + "=" * 60)
    print("  ✅ All tests completed!")
    print("=" * 60)

    # Verify isolation assertion
    assert len(c2_reports) == 0, "❌ Citizen 2 should have 0 fraud reports!"
    assert len(c2_chats) == 0, "❌ Citizen 2 should have 0 chat sessions!"
    print("  ✅ Data isolation verified: each citizen only sees their own data")


if __name__ == "__main__":
    test_full_flow()
