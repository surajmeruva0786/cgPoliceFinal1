import requests
import json

print("Testing Chat Endpoint...")
try:
    with requests.post("http://127.0.0.1:8000/chat", json={"messages": [{"role": "user", "content": "hi"}], "citizen_id": 1}, stream=True, timeout=120) as resp:
        for line in resp.iter_lines():
            if line:
                print(line.decode('utf-8'))
except Exception as e:
    print("Chat Error:", e)

print("\nTesting News Intel Endpoint...")
try:
    resp = requests.get("http://127.0.0.1:8000/news-intel?user_id=1&user_type=official", timeout=120)
    data = resp.json()
    print("News Intel Keys:", data.keys() if isinstance(data, dict) else "Not dict")
    print("News Intel Analysis:", data.get('analysis') if isinstance(data, dict) else data)
except Exception as e:
    print("News Error:", e)
