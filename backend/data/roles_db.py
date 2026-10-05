from typing import Dict, List, Any

CAREER_ROLES_DB: List[Dict[str, Any]] = [
    {
        "id": "ai-ml-engineer",
        "title": "AI / ML Engineer",
        "category": "Artificial Intelligence",
        "tagline": "Architect LLMs, RAG systems, PyTorch models, and high-throughput AI pipelines.",
        "avgSalary": "$135,000 - $190,000",
        "demandGrowth": "+38% YoY",
        "iconName": "Cpu",
        "description": "Design, train, fine-tune, and deploy machine learning models and LLM agents to production systems using modern AI frameworks.",
        "coreSkills": ["PyTorch / TensorFlow", "LLMs & Fine-Tuning", "RAG & Vector DBs", "Python / CUDA", "MLOps & Triton", "LangChain / LlamaIndex"],
        "keyTools": ["Hugging Face", "Pinecone / Qdrant", "MLflow", "Docker", "FastAPI", "Weights & Biases"],
        "recommendedProjects": [
            "Multi-Modal RAG Knowledge Assistant for enterprise docs",
            "Autonomous Code Review AI Agent with AST parsing",
            "Real-time Edge Sentiment Analyzer using Quantized ONNX"
        ]
    },
    {
        "id": "software-developer",
        "title": "Software Developer",
        "category": "Core Engineering",
        "tagline": "Build scalable distributed backend systems, clean APIs, and robust architectures.",
        "avgSalary": "$110,000 - $160,000",
        "demandGrowth": "+22% YoY",
        "iconName": "Code",
        "description": "Develop resilient software systems, microservices, database models, and high-concurrency cloud architecture.",
        "coreSkills": ["System Design & OOP", "Go / Java / Python", "REST & gRPC APIs", "PostgreSQL / Redis", "CI/CD & Docker", "Data Structures & Algorithms"],
        "keyTools": ["Git / GitHub", "Postman / Bruno", "Kubernetes", "AWS Lambda", "Kafka", "Grafana"],
        "recommendedProjects": [
            "Distributed Rate Limiter & Load Balancer in Go",
            "Real-time Messaging Engine with WebSockets & Redis Pub/Sub",
            "Microservice Payment Gateway with Saga Pattern"
        ]
    },
    {
        "id": "data-analyst",
        "title": "Data Analyst",
        "category": "Data & Intelligence",
        "tagline": "Transform raw enterprise telemetry into actionable business intelligence and metrics.",
        "avgSalary": "$85,000 - $125,000",
        "demandGrowth": "+18% YoY",
        "iconName": "BarChart3",
        "description": "Extract operational insights, design executive dashboards, write analytical SQL queries, and perform statistical modeling.",
        "coreSkills": ["Advanced SQL & CTEs", "Power BI / Tableau", "Python (Pandas/NumPy)", "A/B Testing & Stats", "Data Storytelling", "Excel / Financial Modeling"],
        "keyTools": ["Snowflake / BigQuery", "dbt (data build tool)", "Power BI", "Metabase", "Jupyter Notebooks", "Git"],
        "recommendedProjects": [
            "SaaS Churn Prediction & Customer Lifetime Value Dashboard",
            "E-commerce Funnel Conversion A/B Test Statistical Analysis",
            "Automated Executive KPI Reporting Engine with SQL & dbt"
        ]
    },
    {
        "id": "data-scientist",
        "title": "Data Scientist",
        "category": "Data & Intelligence",
        "tagline": "Uncover statistical patterns, build predictive ML models, and optimize decisions.",
        "avgSalary": "$120,000 - $175,000",
        "demandGrowth": "+26% YoY",
        "iconName": "BrainCircuit",
        "description": "Combine advanced statistics, machine learning algorithms, and deep domain expertise to solve complex predictive problems.",
        "coreSkills": ["Scikit-Learn / XGBoost", "Statistical Inference", "Feature Engineering", "Hypothesis Testing", "Python / R", "Exploratory Data Analysis"],
        "keyTools": ["JupyterLab", "MLflow", "Spark / PySpark", "PostgreSQL", "Airflow", "Streamlit"],
        "recommendedProjects": [
            "Credit Risk Scoring Model with Explainable AI (SHAP)",
            "Customer Demand Forecasting Pipeline using Prophet & XGBoost",
            "Healthcare Recommendation Engine with Collaborative Filtering"
        ]
    },
    {
        "id": "web-developer",
        "title": "Web Developer",
        "category": "Product Engineering",
        "tagline": "Create modern, hyper-fast responsive web applications with rich user interfaces.",
        "avgSalary": "$95,000 - $145,000",
        "demandGrowth": "+25% YoY",
        "iconName": "Layout",
        "description": "Build full-stack web applications using React, TypeScript, Next.js, Node.js, and modern CSS frameworks with flawless UX.",
        "coreSkills": ["React / Next.js", "TypeScript & Modern JS", "Tailwind CSS & Glassmorphism", "Node.js / Express / Next Auth", "GraphQL / REST APIs", "Web Performance & SEO"],
        "keyTools": ["Vite", "Vercel / Netlify", "Supabase / Prisma", "Figma", "Playwright / Vitest", "Git"],
        "recommendedProjects": [
            "SaaS Kanban Workspace with Drag-and-Drop & Realtime Sync",
            "AI Powered Content CMS with Edge Rendering & MDX",
            "E-commerce Platform with Stripe Checkout & Micro-frontend UI"
        ]
    },
    {
        "id": "cybersecurity-engineer",
        "title": "Cybersecurity Engineer",
        "category": "Security & Infrastructure",
        "tagline": "Protect cloud infrastructure, audit application vulnerabilities, and automate defense.",
        "avgSalary": "$125,000 - $180,000",
        "demandGrowth": "+32% YoY",
        "iconName": "ShieldCheck",
        "description": "Identify security risks, implement zero-trust network protocols, perform penetration testing, and maintain SOC compliance.",
        "coreSkills": ["Network Security & Wireshark", "Penetration Testing", "SIEM & Threat Detection", "IAM & Zero Trust", "Cryptography & SSL/TLS", "Cloud Security (AWS/Azure)"],
        "keyTools": ["Burp Suite", "Metasploit", "Splunk / ELK", "Nmap", "Terraform", "Kali Linux"],
        "recommendedProjects": [
            "Automated Vulnerability Scanner & Container Security Auditing Script",
            "Zero-Trust Auth Gateway with Hardware Security Key Support",
            "SIEM Log Analysis Pipeline for Anomaly & Intrusion Detection"
        ]
    }
]
