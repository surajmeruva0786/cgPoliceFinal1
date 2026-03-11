import requests

url = "http://127.0.0.1:8000/analyze-document"
files = {'file': ('test.txt', 'This is a test document containing text about fraud.', 'text/plain')}
data = {'citizen_id': 1}

print("Testing Document Analysis...")
try:
    response = requests.post(url, files=files, data=data, timeout=120)
    json_resp = response.json()
    print("Document Analysis Keys:", json_resp.keys() if isinstance(json_resp, dict) else "Not dict")
    
    if 'detail' in json_resp:
        print("Error Details:", json_resp['detail'])
    else:
        print("Parsed Analysis:", json_resp.get('analysis'))
except Exception as e:
    print("Error:", e)
