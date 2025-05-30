import requests

API_KEY = "YOUR_XAI_API_KEY"  # Replace with your key
API_URL = "https://api.x.ai/v1/grok"

def query_grok(prompt):
    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
        payload = {"model": "grok-3", "prompt": prompt, "max_tokens": 200}
            try:
                    response = requests.post(API_URL, headers=headers, json=payload)
                            return response.json()["choices"][0]["text"]
                                except:
                                        return "Error"

                                        print("Grok Assistant")
                                        while True:
                                            prompt = input("> ")
                                                if prompt in ["exit", "quit"]:
                                                        break
                                                            print("Grok:", query_grok(prompt))
