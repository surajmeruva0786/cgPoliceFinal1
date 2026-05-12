import os
from groq import Groq

MODEL_NAME = "llama-3.1-8b-instant"
GROQ_API_KEY = "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"
client = Groq(api_key=GROQ_API_KEY)

class AIChatBot:
    def __init__(self):
        self.system_prompt = {
            "role": "system",
            "content": (
                "You are a professional, intelligent, and helpful AI assistant for the Chhattisgarh Police Department. "
                "Give clear, structured, and concise answers. "
                "You can help with cybercrime trends, digital arrest cases, deepfake analysis, and general police queries. "
                "If needed, explain step-by-step."
            )
        }

    def chat(self, messages):
        """
        messages: list of dicts [{'role': 'user', 'content': '...'}, ...]
        """
        # Ensure system prompt is at the beginning
        if not messages or messages[0].get('role') != 'system':
            messages.insert(0, self.system_prompt)
        
        try:
            response = client.chat.completions.create(
                model=MODEL_NAME,
                messages=messages,
                stream=False,
                temperature=0.4,
                top_p=0.9,
                max_completion_tokens=800
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Chat Error: {e}")
            return "I'm having trouble connecting to my AI brain right now. Please ensure Ollama is running."

    def chat_stream(self, messages):
        """
        streams the response back token by token
        """
        if not messages or messages[0].get('role') != 'system':
            messages.insert(0, self.system_prompt)
        
        try:
            response = client.chat.completions.create(
                model=MODEL_NAME,
                messages=messages,
                stream=True,
                temperature=0.4,
                top_p=0.9,
                max_completion_tokens=800
            )
            for chunk in response:
                if chunk.choices[0].delta.content is not None:
                    yield chunk.choices[0].delta.content
        except Exception as e:
            print(f"Chat Error: {e}")
            yield "I'm having trouble connecting to my AI brain right now. Please ensure Groq API is functioning."

# Singleton instance or create new per request?
# For simple usage, creating new instance or just using static method is fine since state is passed in.
chatbot = AIChatBot()

def get_chat_response(messages):
    return chatbot.chat(messages)

def get_chat_stream(messages):
    return chatbot.chat_stream(messages)
