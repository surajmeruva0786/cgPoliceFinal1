import sys
import os
from chatbot import get_chat_response
from news_intelligence import get_news_intel

print("=== Testing Chatbot ===")
try:
    resp = get_chat_response([{"role": "user", "content": "Hello, who are you?"}])
    print("Chatbot response:", resp)
except Exception as e:
    print("Chatbot error:", e)

print("\n=== Testing News Intel ===")
try:
    intel = get_news_intel()
    print("News Intel analysis keys:", intel.get('analysis', {}).keys() if isinstance(intel.get('analysis'), dict) else "Not dict")
    print("Analysis content:", intel.get('analysis'))
except Exception as e:
    print("News Intel error:", e)
