# Farm ChatBot (Tamil Crop Consult)

A full-stack chatbot for Tamil-speaking farmers. The frontend provides a chat UI, and the backend proxies requests to a Gradio-hosted model that answers crop and farming questions.

## Use Case

- Farmers ask questions about crop care, pests, irrigation, and seasonal practices in Tamil.
- The system returns concise guidance from a hosted model through a simple chat interface.

## Tech Stack

- Frontend: React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix UI
- Backend: FastAPI (Python) with `gradio_client` as a proxy to the model
- Tooling: ESLint, PostCSS

## Project Structure

```
.
├─ src/                 # React app
├─ public/              # Static assets
├─ fastApi.py           # FastAPI backend proxy
├─ package.json         # Frontend scripts and deps
└─ README.md
```

## Getting Started

### Backend (FastAPI)

Requirements: Python 3.10+

```bash
python -m venv .venv
.venv\Scripts\activate
pip install fastapi uvicorn gradio_client pydantic
```

Run the API:

```bash
uvicorn fastApi:app --reload --port 8000
```

Endpoints:

- `GET /health`
- `POST /chat` with JSON body:
  `{ "message": "..." }`

### Frontend (React)

Requirements: Node.js + npm

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. The backend defaults to `http://localhost:8000` in the app code.

## Configuration

- `GRADIO_URL`: Set to a different Gradio deployment if needed.

## Notes

- CORS is currently open for local dev. Lock down origins in production.
