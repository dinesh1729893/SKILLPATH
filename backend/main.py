import os
import io
import pypdf
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Header, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from data.roles_db import CAREER_ROLES_DB
from services.ai_service import analyze_resume_ai, ask_mentor_ai, chat_general_ai

load_dotenv()

app = FastAPI(
    title="SkillPath AI Backend API",
    description="FastAPI Backend Engine for ATS Resume Analysis, Skill-Gap Diagnostic, and Ollama Career Mentoring.",
    version="1.0.0"
)

# Enable CORS for React Frontend
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class ResumeAnalyzeRequest(BaseModel):
    resumeText: str
    targetRoleId: str
    ollamaUrl: Optional[str] = None
    ollamaModel: Optional[str] = None

class MentorChatRequest(BaseModel):
    userMessage: str
    targetRoleId: str
    resumeContext: Optional[str] = None
    ollamaUrl: Optional[str] = None
    ollamaModel: Optional[str] = None

class ChatMessageSchema(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessageSchema]
    ollamaUrl: Optional[str] = None
    ollamaModel: Optional[str] = None
    systemPrompt: Optional[str] = "You are a helpful AI assistant."
    temperature: Optional[float] = 0.7

# Routes
@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "SkillPath AI Backend Engine",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "ok", 
        "ollamaConfigured": bool(os.getenv("OLLAMA_API_KEY"))
    }

@app.get("/api/roles")
def get_all_roles():
    return {"roles": CAREER_ROLES_DB}

@app.get("/api/roles/{role_id}")
def get_role_by_id(role_id: str):
    role = next((r for r in CAREER_ROLES_DB if r["id"] == role_id), None)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role

@app.post("/api/resume/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        pdf_bytes = await file.read()
        pdf_file = io.BytesIO(pdf_bytes)
        reader = pypdf.PdfReader(pdf_file)
        
        extracted_text = ""
        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_text += text + "\n"
        
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="No readable text found in PDF. Make sure it is not scanned/image-only.")
            
        return {"text": extracted_text.strip()}
    except Exception as e:
        print(f"[PDF Extract Error]: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to parse PDF: {str(e)}")

@app.post("/api/resume/analyze")
def analyze_resume(req: ResumeAnalyzeRequest, x_api_key: Optional[str] = Header(None)):
    role = next((r for r in CAREER_ROLES_DB if r["id"] == req.targetRoleId), CAREER_ROLES_DB[0])
    result = analyze_resume_ai(
        resume_text=req.resumeText,
        target_role=role["title"],
        core_skills=role["coreSkills"],
        api_key=x_api_key or "",
        ollama_url=req.ollamaUrl or "",
        ollama_model=req.ollamaModel or ""
    )
    return result

@app.post("/api/mentor/chat")
def chat_with_mentor(req: MentorChatRequest, x_api_key: Optional[str] = Header(None)):
    role = next((r for r in CAREER_ROLES_DB if r["id"] == req.targetRoleId), CAREER_ROLES_DB[0])
    response_text = ask_mentor_ai(
        user_message=req.userMessage,
        target_role=role["title"],
        core_skills=role["coreSkills"],
        api_key=x_api_key or "",
        ollama_url=req.ollamaUrl or "",
        ollama_model=req.ollamaModel or ""
    )
    return {"reply": response_text}

@app.post("/api/chat")
def general_chat(req: ChatRequest, x_api_key: Optional[str] = Header(None)):
    messages_list = [{"role": msg.role, "content": msg.content} for msg in req.messages]
    response_text = chat_general_ai(
        messages=messages_list,
        system_prompt=req.systemPrompt or "You are a helpful AI assistant.",
        temperature=req.temperature or 0.7,
        api_key=x_api_key or "",
        ollama_url=req.ollamaUrl or "",
        ollama_model=req.ollamaModel or ""
    )
    return {"reply": response_text}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
