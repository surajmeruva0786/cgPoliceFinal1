
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import re
from collections import Counter
import os
try:
    from PIL import Image
    import pytesseract
except ImportError:
    pass

try:
    import ollama
except ImportError:
    pass

# ================= OCR =================

def extract_text_from_image(image_path):
    try:
        img = Image.open(image_path)
        # You might need to specify tesseract cmd path if not in PATH
        # pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        text = pytesseract.image_to_string(img)
        return text.strip() if text.strip() else "No text extracted."
    except Exception as e:
        return f"Error extracting text: {str(e)}"

# ================= KEYWORD EXTRACTION =================

def extract_keywords(text):
    crime_keywords = [
        'fraud','scam','cybercrime','theft','robbery','murder','assault',
        'kidnapping','arrest','police','investigation','suspect','victim',
        'crime','criminal','gang','shooting','attack','hacking','phishing',
        'ransomware','deepfake','smuggling','trafficking','corruption',
        'bribery','extortion'
    ]

    text_lower = text.lower()
    found_keywords = [kw for kw in crime_keywords if kw in text_lower]

    words = text.split()
    capitalized = [w.strip('.,!?;:"()[]') for w in words if w and w[0].isupper() and len(w) > 3]

    seen = set()
    unique_keywords = []
    for kw in found_keywords + capitalized[:10]:
        if kw.lower() not in seen:
            seen.add(kw.lower())
            unique_keywords.append(kw)

    return unique_keywords[:15]

# ================= RSS FETCHING =================

def fetch_from_rss(rss_url, source_name):
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(rss_url, timeout=15, headers=headers)
        soup = BeautifulSoup(response.content, 'xml')
        items = soup.find_all('item')

        articles = []
        for item in items[:30]:
            title = item.title.text.strip() if item.title else ''
            desc = item.description.text.strip() if item.description else ''
            link = item.link.text.strip() if item.link else ''

            if desc:
                desc = BeautifulSoup(desc, 'html.parser').get_text()

            if title:
                articles.append({
                    'title': title,
                    'summary': desc,
                    'source': source_name,
                    'url': link
                })

        return articles
    except:
        return []

def search_related_articles(keywords):
    rss_feeds = [
        ('https://timesofindia.indiatimes.com/rssfeedstopstories.cms','Times of India'),
        ('https://www.thehindu.com/news/national/feeder/default.rss','The Hindu'),
        ('https://feeds.feedburner.com/ndtvnews-top-stories','NDTV'),
        ('https://indianexpress.com/feed/','Indian Express')
    ]

    all_articles = []
    for url, name in rss_feeds:
        all_articles.extend(fetch_from_rss(url, name))

    related = []
    for article in all_articles:
        text = (article['title'] + " " + article['summary']).lower()
        matched = [kw for kw in keywords if kw.lower() in text]
        if matched:
            article['matched_keywords'] = matched
            article['relevance_score'] = len(matched)
            related.append(article)

    related.sort(key=lambda x: x['relevance_score'], reverse=True)
    return related

# ================= COMMON TERMS =================

def extract_common_terms(articles, top_n=20):
    stop_words = {'the','and','for','with','this','that','from','have','been','are','was'}
    words = []
    for article in articles:
        text = article['title'] + " " + article['summary']
        words.extend(re.findall(r'\b[a-zA-Z]{4,}\b', text.lower()))

    words = [w for w in words if w not in stop_words]
    return Counter(words).most_common(top_n)

# ================= LLM ANALYSIS =================

def analyze_for_investigation(original_text, articles, common_terms):
    context = "\n\n".join(
        f"{a['source']} - {a['title']}\n{a['summary'][:200]}"
        for a in articles[:5]
    )


    prompt = f"""
You are a senior crime intelligence analyst.

Original Text:
{original_text[:1000]}

Related News:
{context}

Common Terms:
{', '.join([t for t,_ in common_terms[:10]])}

Provide a structured analysis in VALID JSON format with the following keys:
- "summary": A brief summary of the case.
- "key_entities": List of strings (people, places, organizations).
- "timeline": List of strings (chronological events).
- "clues": List of strings (investigative clues).
- "recommendations": List of strings (recommended actions).
- "risk_level": String (High, Medium, or Low).

IMPORTANT: Return ONLY the JSON object. Do not wrap it in markdown code blocks like ```json ... ```. Do not add conversational text.
"""

    try:
        response = ollama.chat(
            model='llama3.2:latest',
            messages=[{'role':'user','content':prompt}],
            options={'temperature':0.1}
        )
        
        content = response['message']['content']

        # Regex to extract JSON object
        import re
        import json
        match = re.search(r'(\{.*\})', content, re.DOTALL)
        if match:
             json_str = match.group(1)
             try:
                return json.loads(json_str)
             except:
                return { "summary": "Error parsing JSON.", "clues": [], "recommendations": [], "risk_level": "Unknown", "key_entities": [], "timeline": [] } 
        else:
             # Fallback if no JSON found
             return { "summary": "No structured analysis generated.", "clues": [], "recommendations": [], "risk_level": "Unknown", "key_entities": [], "timeline": [] }

    except Exception as e:
        # Return a fallback JSON dict if error
        return { "summary": f"Error generating analysis: {str(e)}", "clues": [], "recommendations": [], "risk_level": "Unknown", "key_entities": [], "timeline": [] }


def process_document(file_path):
    extracted_text = extract_text_from_image(file_path)
    keywords = extract_keywords(extracted_text)
    related_articles = search_related_articles(keywords)
    common_terms = extract_common_terms(related_articles)
    analysis = analyze_for_investigation(extracted_text, related_articles, common_terms)
    
    return {
        "text": extracted_text,
        "keywords": keywords,
        "related_articles": related_articles[:5],
        "analysis": analysis
    }
