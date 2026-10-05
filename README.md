<div align="center">

# 🚀 SkillPath AI

### **Next-Gen AI Career Navigator, ATS Diagnostic & Skill-Gap Platform**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.127-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.14-3776AB?logo=python&logoColor=white)](https://python.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF?logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

*Empowering developers and tech professionals to bridge skill gaps, optimize resumes for ATS, and navigate career paths with cutting-edge AI mentorship.*

---

[Key Features](#-key-features) • [Career Tracks](#-supported-career-tracks) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Deployment](#-deployment) • [Project Structure](#-project-structure)

</div>

---

## 🌟 Key Features

### 📄 **AI-Powered ATS Resume Diagnostic**
* **Instant ATS Score (0–100%)**: Evaluates resumes against real industry job descriptions and hiring benchmarks.
* **Skill Extraction & Verification**: Identifies detected skills and detects missing core competencies.
* **Actionable Recommendations**: Bullet-by-bullet advice on impactful metrics, action verbs, and formatting.
* **PDF & Text Support**: Upload resumes directly or paste raw text.

### 📊 **Dynamic Skill-Gap Matrix**
* Visual breakdown of foundational, intermediate, and advanced requirements for each track.
* Progress tracking with proficiency ratings and personalized readiness scores.
* Direct recommendations for certifications, documentation, and hands-on practice.

### 🧭 **Interactive Career Roadmap & Market Intelligence**
* **Salary Progression Tiers**: Real-world compensation benchmarks (Entry, Mid, Senior, Staff).
* **Hiring Hotspots & Velocity**: Geographic & remote ratio hiring analytics.
* **Tool Adoption Radar**: Industry momentum tracking for frameworks, vector databases, and MLOps tools.
* **Capstone Project Blueprints**: Production-grade architectural designs and portfolio deliverables to impress recruiters.
* **Curated Interview Prep**: System design blueprints, technical questions, and model talking points.

### 🤖 **AI Career Mentor**
* Interactive conversational assistant powered by **Ollama / Gemma**.
* Role-specific guidance tailored to the user's resume and target career trajectory.
* Offline & Cloud AI fallback resilience.

### 📱 **Cross-Platform Mobile Ready**
* Native Android build configured via **Capacitor**.
* Responsive glassmorphic UI optimized for desktop, tablet, and mobile screens.

---

## 🎯 Supported Career Tracks

1. **AI / ML Engineer** — Deep Learning, LLMs, PyTorch, Vector DBs, MLOps
2. **Software Developer** — Clean Architecture, Distributed Systems, Microservices, CI/CD
3. **Data Scientist** — Predictive Modeling, Machine Learning, Statistical Inference, Python/R
4. **Data Analyst** — SQL, Business Intelligence, Data Pipelines, Tableau/PowerBI
5. **Web Developer** — Modern React/TypeScript, Performance, Next-gen Web Standards
6. **Cybersecurity Engineer** — Threat Modeling, Penetration Testing, Cloud Defense, Zero Trust

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework**: React 18 with TypeScript
* **Build Tool**: Vite 5
* **Styling**: Tailwind CSS, Glassmorphic Design System, Custom Micro-animations
* **Icons**: Lucide React
* **Mobile Bridge**: Capacitor Core & Capacitor Android

### **Backend**
* **Framework**: FastAPI (High-performance async Python)
* **Server**: Uvicorn ASGI
* **Resume Parsing**: `pypdf` for binary PDF extraction
* **Data Validation**: Pydantic v2
* **API Documentation**: Interactive Swagger UI (`/docs`) & ReDoc (`/redoc`)

### **AI & Mentorship Engine**
* **LLM Core**: Ollama API Integration (Gemma / Llama / Mistral models)
* **Fallback Strategy**: Dual-mode execution (FastAPI backend service with browser-level fallback)

---

## 🚀 Quick Start

### Prerequisites
* **Node.js** (v18 or higher)
* **Python** (v3.10 or higher)
* **Git**

---

### 1. Clone the Repository
```bash
git clone https://github.com/dinesh1729893/SKILLPATH.git
cd SKILLPATH
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
```
The frontend will start at **`http://localhost:5173`**.

---

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn main:app --reload --port 8000
```
The backend API will run at **`http://127.0.0.1:8000`**.  
Interactive API docs are available at **`http://127.0.0.1:8000/docs`**.

---

### 4. Android Build (Capacitor)
```bash
# Build production web bundle and sync to Android
npm run android:sync

# Open project in Android Studio
npm run android:open
```

---

## ⚙️ Environment Variables

### Backend Configuration (`backend/.env`)
Copy `backend/.env.example` to `backend/.env` and update the values:

```env
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Optional: Remote/Local Ollama LLM Configuration
OLLAMA_API_KEY=your_optional_api_key
OLLAMA_API_URL=https://ollama.com/api
OLLAMA_MODEL=gemma4:31b
```

---

## 📁 Project Structure

```text
SKILLPATH/
├── android/               # Capacitor Android native project
├── backend/               # FastAPI Python backend
│   ├── data/              # Role databases & career intelligence
│   ├── services/          # AI & ATS analysis services
│   ├── main.py            # FastAPI entrypoint & REST routes
│   └── requirements.txt   # Python dependencies
├── public/                # Static assets & favicons
├── src/                   # React frontend application
│   ├── components/        # UI components (Dashboard, Matrix, Chat, etc.)
│   ├── data/              # Career paths, interview questions, salary data
│   ├── services/          # Frontend API & AI client integration
│   ├── types/             # TypeScript interfaces & types
│   ├── App.tsx            # Main application coordinator
│   └── index.css          # Design system & custom CSS utilities
├── capacitor.config.ts    # Capacitor mobile configuration
├── render.yaml            # Render backend deployment blueprint
├── vercel.json            # Vercel frontend deployment configuration
└── package.json           # Node.js dependencies & scripts
```

---

## 🌐 Deployment

### Frontend (Vercel)
This repository includes a ready-to-deploy `vercel.json`:
1. Connect your repository to [Vercel](https://vercel.com).
2. Set Framework Preset to **Vite**.
3. Deploy!

### Backend (Render)
This repository includes a native `render.yaml` Blueprint:
1. Connect your repository on [Render](https://render.com).
2. Select **New Blueprint Instance**.
3. Render automatically provisions the Python FastAPI environment and runs the web service on the free tier.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/dinesh1729893/SKILLPATH/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/dinesh1729893">dinesh1729893</a></sub>
</div>
