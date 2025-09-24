# app.python 
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from gradio_client import Client
import asyncio

GRADIO_URL = os.getenv("GRADIO_URL", "https://cf28039c99834cabce.gradio.live")

app = FastAPI(title="Tamil ChatBot Proxy API", version="1.0.0")

# CORS (adjust allow_origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # put your frontend origin(s) here in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str = Field(..., description="User message (Tamil/English)")
    max_new_tokens: int = 512
    temperature: float = 0.3
    top_p: float = 0.95
    top_k: int = 50
    repetition_penalty: float = 1.1

class ChatResponse(BaseModel):
    reply: str

@app.on_event("startup")
def _startup():
    # Create and cache a single Client instance
    app.state.client = Client(GRADIO_URL)

@app.get("/health")
def health():
    return {"status": "ok", "gradio_url": GRADIO_URL}

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    client: Client = app.state.client
    try:
        # gradio_client is blocking; run it in a thread so FastAPI stays async
        result = await asyncio.to_thread(
            client.predict,
            req.message,
            req.max_new_tokens,
            req.temperature,
            req.top_p,
            req.top_k,
            req.repetition_penalty,
            api_name="/chat",
        )
        # result is typically a string from ChatInterface
        return ChatResponse(reply=str(result))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream Gradio error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:chat",  # not used because we specify app below
        app=app,
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
