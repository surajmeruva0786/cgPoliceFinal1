import requests
from bs4 import BeautifulSoup
from groq import Groq

def fetch_chhattisgarh_news():
    # Example sources - strictly placeholders. Real-world would involve more specific scraping or API.
    # We will search specifically for Chhattisgarh + Cybercrime related queries via Google News RSS or similar if possible, 
    # but standard RSS feeds are safer/easier for this demo without external keys.
    rss_urls = [
        "https://timesofindia.indiatimes.com/rssfeeds/-2128838597.cms", # TOI Chhattisgarh
        "https://www.thehindu.com/news/national/other-states/feeder/default.rss" 
    ]
    
    articles = []
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    for url in rss_urls:
        try:
            response = requests.get(url, headers=headers, timeout=5)
            soup = BeautifulSoup(response.content, 'xml')
            items = soup.find_all('item')
            
            for item in items:
                title = item.title.text if item.title else ""
                desc = item.description.text if item.description else ""
                
                # Simple filter for relevance
                text_to_check = (title + " " + desc).lower()
                keywords = ['cyber', 'fraud', 'scam', 'chhattisgarh', 'police', 'crime', 'digital arrest', 'online', 'bank']
                
                if any(k in text_to_check for k in keywords):
                     # Clean up description (strip HTML)
                     try:
                         if desc and ('<' in desc or '&' in desc):
                            desc = BeautifulSoup(desc, 'html.parser').get_text()
                     except:
                         pass

                     articles.append({
                        'title': title,
                        'summary': desc.strip(),
                        'link': item.link.text if item.link else "",
                        'source': "News Feed"
                    })
        except Exception as e:
            print(f"Error fetching RSS {url}: {e}")
            
    return articles[:10] # Return top 10

def analyze_news_intelligence(articles):
    if not articles:
        return {
            "summary": "No relevant news found at this time.",
            "trends": [],
            "action_items": []
        }
        
    context = "\n\n".join([f"- {a['title']}: {a['summary']}" for a in articles])
    
    prompt = f"""
    You are a cybercrime intelligence officer. Analyze these recent news items related to Chhattisgarh or Cybercrime:
    
    {context}
    
    Provide a VALID JSON response with the following keys:
    1. "summary": A synthesis of the current threat landscape (NO MARKDOWN).
    2. "trends": List of strings (emerging crime trends).
    3. "action_items": List of strings (specific recommendations for police).
    
    IMPORTANT: Return ONLY the raw JSON object. Do not wrap it in markdown code blocks.
    """
    
    try:
        client = Groq(api_key="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")
        response = client.chat.completions.create(
            model='llama-3.1-8b-instant',
            messages=[{'role':'user', 'content': prompt}],
            response_format={"type": "json_object"},
            temperature=0.1
        )
        content = response.choices[0].message.content.strip()
        
        # Regex to extract JSON object
        import re
        import json
        match = re.search(r'(\{.*\})', content, re.DOTALL)
        if match:
             json_str = match.group(1)
             return json.loads(json_str) 
        else:
             # Fallback if no JSON found
             return { "summary": content[:200] + "...", "trends": [], "action_items": [] }

    except Exception as e:
         print(f"Analysis Error: {e}")
         return { "summary": "Error analyzing news.", "trends": [], "action_items": [] }


def get_news_intel():
    articles = fetch_chhattisgarh_news()
    analysis = analyze_news_intelligence(articles)
    try:
        from sheets_integration import push_to_sheets_async
        if isinstance(analysis, dict):
            push_to_sheets_async(
                source="News Intelligence (AI)",
                entities="N/A",
                locations="Chhattisgarh",
                keywords=", ".join(analysis.get("trends", [])),
                risk_level="N/A",
                summary=analysis.get("summary", "No summary")
            )
    except Exception as e:
        print(f"Error triggering sheets sync: {e}")
        
    return {
        "articles": articles,
        "analysis": analysis
    }
