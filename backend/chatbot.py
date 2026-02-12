
import ollama

MODEL_NAME = "llama3.2:latest"

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
            response = ollama.chat(
                model=MODEL_NAME,
                messages=messages,
                stream=False, # Web API usually easier with non-streaming first
                options={
                    "temperature": 0.4,
                    "top_p": 0.9,
                    "num_predict": 800
                }
            )
            return response['message']['content']
        except Exception as e:
            print(f"Chat Error: {e}")
            return "I'm having trouble connecting to my AI brain right now. Please ensure Ollama is running."

# Singleton instance or create new per request?
# For simple usage, creating new instance or just using static method is fine since state is passed in.
chatbot = AIChatBot()

def get_chat_response(messages):
    return chatbot.chat(messages)
