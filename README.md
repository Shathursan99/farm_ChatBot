# Tamil ChatBot – Crop Consult Chat

A full-stack chatbot application for Tamil-speaking farmers, built with FastAPI (Python) backend and React (TypeScript) frontend. The bot answers questions about crops and farming techniques in Tamil.

---

## Features

- **Conversational AI**: Chatbot answers farming-related queries in Tamil.
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS.
- **FastAPI Backend**: Handles chat requests and proxies them to a Gradio-based model.

---

## Project Structure

```
Tamil_ChatBot/
│
├── fastApi.py                # FastAPI backend (Python)
├── .venv/                    # Python virtual environment
│
└── crop-consult-chat/
    ├── src/
    │   ├── App.tsx           # Main React app
    │   └── components/
    │       └── ChatInterface.tsx
    └── ...                   # Other frontend files
```

---

## Getting Started

### 1. Backend (FastAPI)

**Requirements:** Python 3.10+, pip

```bash
cd Tamil_ChatBot
python -m venv .venv
.venv\Scripts\activate  # On Windows
pip install fastapi uvicorn gradio_client pydantic
```

**Run the backend:**
```bash
uvicorn fastApi:app --reload --port 8000
```

- The API will be available at `http://localhost:8000`
- Health check: `GET /health`
- Chat endpoint: `POST /chat` with JSON body:  
  `{ "message": "..." }`

### 2. Frontend (React)

**Requirements:** Node.js, npm

```bash
cd crop-consult-chat
npm install
npm run dev
```

- The frontend runs at `http://localhost:5173` (or as shown in your terminal)
- Make sure the backend is running at `http://localhost:8000` (default in code)

---

## Configuration

- **Gradio Model URL:**  
  Set the `GRADIO_URL` environment variable in your backend if you want to use a different Gradio deployment.

---


- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Gradio](https://gradio.app/)
