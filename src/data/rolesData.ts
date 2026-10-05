import { CareerRole, RoleId, RoadmapNode, SkillItem } from '../types';

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'ai-ml-engineer',
    title: 'AI / ML Engineer',
    category: 'Artificial Intelligence',
    tagline: 'Architect LLMs, RAG systems, PyTorch models, and high-throughput AI pipelines.',
    avgSalary: '$135,000 - $190,000',
    demandGrowth: '+38% YoY',
    iconName: 'Cpu',
    description: 'Design, train, fine-tune, and deploy machine learning models and LLM agents to production systems using modern AI frameworks.',
    coreSkills: ['PyTorch / TensorFlow', 'LLMs & Fine-Tuning', 'RAG & Vector DBs', 'Python / CUDA', 'MLOps & Triton', 'LangChain / LlamaIndex'],
    keyTools: ['Hugging Face', 'Pinecone / Qdrant', 'MLflow', 'Docker', 'FastAPI', 'Weights & Biases'],
    recommendedProjects: [
      'Multi-Modal RAG Knowledge Assistant for enterprise docs',
      'Autonomous Code Review AI Agent with AST parsing',
      'Real-time Edge Sentiment Analyzer using Quantized ONNX'
    ],
    salaryTiers: {
      entry: '$105,000',
      mid: '$148,000',
      senior: '$195,000',
      staff: '$260,000+'
    },
    hiringHotspots: [
      { location: 'San Francisco Bay Area', avgPay: '$198,000', hiringVelocity: '16 Days', remoteRatio: '45%' },
      { location: 'New York Metro', avgPay: '$182,000', hiringVelocity: '19 Days', remoteRatio: '52%' },
      { location: 'Seattle Tech Corridor', avgPay: '$178,000', hiringVelocity: '21 Days', remoteRatio: '48%' },
      { location: 'Global Remote', avgPay: '$155,000', hiringVelocity: '14 Days', remoteRatio: '100%' }
    ],
    industrySectors: [
      { sector: 'GenAI & Foundation Labs', share: 42, growth: '+58% YoY' },
      { sector: 'FinTech & Quant Trading', share: 24, growth: '+31% YoY' },
      { sector: 'Autonomous Systems & Robotics', share: 18, growth: '+25% YoY' },
      { sector: 'Enterprise SaaS & Cloud', share: 16, growth: '+20% YoY' }
    ],
    toolAdoption: [
      { name: 'PyTorch', category: 'Framework', adoptionRate: 92, momentum: '+34% YoY', relevance: 'De facto standard for deep learning & LLM research' },
      { name: 'Hugging Face / PEFT', category: 'Framework', adoptionRate: 88, momentum: '+46% YoY', relevance: 'Pre-trained foundation model Hub & LoRA fine-tuning' },
      { name: 'Qdrant / Pinecone', category: 'Database / Vector', adoptionRate: 81, momentum: '+65% YoY', relevance: 'Sub-millisecond vector similarity search for RAG' },
      { name: 'Docker & Triton Server', category: 'CI/CD & MLOps', adoptionRate: 76, momentum: '+28% YoY', relevance: 'Multi-model concurrent GPU inference acceleration' },
      { name: 'LangChain / LlamaIndex', category: 'Framework', adoptionRate: 72, momentum: '+52% YoY', relevance: 'Orchestrating autonomous agents & knowledge graphs' },
      { name: 'Weights & Biases (W&B)', category: 'CI/CD & MLOps', adoptionRate: 65, momentum: '+22% YoY', relevance: 'Experiment tracking, artifact lineage & eval telemetry' }
    ],
    interviewQuestions: [
      {
        type: 'System Design',
        difficulty: 'Advanced',
        question: 'Architect an enterprise RAG system serving 5,000 concurrent queries with sub-250ms p95 latency and zero hallucination risk.',
        recruiterFocus: 'Evaluates chunking heuristics, hybrid dense + BM25 search, cross-encoder reranking, and semantic caching.',
        modelTalkingPoints: [
          'Hierarchical chunking (parent-child documents with 20% token overlap)',
          'Redis semantic cache with embedding cosine thresholds to bypass LLM generation',
          'FlashAttention-2 and vLLM continuous batching for maximum GPU utilization',
          'Automated Ragas evaluation framework to track faithfulness and answer relevance'
        ]
      },
      {
        type: 'Technical Deep Dive',
        difficulty: 'Expert',
        question: 'Explain low-rank adaptation (LoRA) mathematics. Why does QLoRA achieve comparable accuracy to 16-bit fine-tuning while reducing VRAM by 75%?',
        recruiterFocus: 'Assesses understanding of low-rank matrix decomposition W + BA, NF4 data format, and double quantization.',
        modelTalkingPoints: [
          'Freezes original W (d x k); trains low-rank matrices A (r x k) and B (d x r) where r << min(d, k)',
          'NormalFloat 4-bit (NF4) is information-theoretically optimal for zero-mean normal weights',
          'Double quantization compresses quantization constants, saving 0.37 bits per parameter',
          'Paged optimizers manage memory spikes during gradient checkpointing'
        ]
      },
      {
        type: 'Behavioral & Leadership',
        difficulty: 'Intermediate',
        question: 'How do you convince stakeholders to deploy an ML solution when training data is noisy and ground-truth validation is ambiguous?',
        recruiterFocus: 'Tests business alignment, iterative POC delivery, active learning strategies, and risk mitigation.',
        modelTalkingPoints: [
          'Framed business ROI around cost-per-successful-resolution rather than raw academic accuracy',
          'Implemented weak supervision (Snorkel) and synthetic dataset generation with humans-in-the-loop',
          'Staged a dark-traffic launch to benchmark production drift before full user exposure'
        ]
      }
    ],
    capstoneBlueprint: {
      title: 'Enterprise Multi-Modal Knowledge Agent with Hybrid RAG',
      tagline: 'Production-ready RAG pipeline with semantic caching, hybrid BM25/Vector search, and automated evaluation telemetry.',
      difficulty: 'Production Grade',
      estimatedHours: '35 - 45 Hours',
      recruiterImpactScore: 9.8,
      architecture: [
        { layer: 'Document Ingestion', tech: 'Unstructured.io + PyPDF', details: 'Extracts tables, hierarchy, equations & metadata into clean JSON schemas.' },
        { layer: 'Vector Storage', tech: 'Qdrant Cloud + FastEmbed', details: 'Hybrid dense (BGE-large) and sparse (BM25) with HNSW cosine indexing.' },
        { layer: 'Agentic Core', tech: 'LangGraph + Llama-3.1', details: 'Self-corrective cyclical retrieval with fallback web search execution.' },
        { layer: 'Serving & CI/CD', tech: 'FastAPI + Docker + vLLM', details: 'Asynchronous streaming SSE endpoint containerized with automated CI/CD.' }
      ],
      keyDeliverables: [
        'Production FastAPI service supporting streaming SSE token generation',
        'Automated Ragas evaluation suite proving >94% context precision and zero hallucination',
        'Docker Compose stack integrating Qdrant, Redis semantic cache, and Prometheus metrics',
        'Interactive Streamlit / React developer playground for live queries'
      ],
      githubReadmeHighlights: [
        'Interactive Architecture Diagram & Sequence Flowchart',
        'Live deployed demo URL with benchmark metrics table',
        'PyTest suite covering edge cases and rate-limiting triggers'
      ]
    },
    hiringStats: {
      avgDaysToOffer: 16,
      activeJobOpenings: '48,500+',
      offerAcceptanceRate: '87%'
    }
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Core Engineering',
    tagline: 'Build scalable distributed backend systems, clean APIs, and robust architectures.',
    avgSalary: '$110,000 - $160,000',
    demandGrowth: '+22% YoY',
    iconName: 'Code',
    description: 'Develop resilient software systems, microservices, database models, and high-concurrency cloud architecture.',
    coreSkills: ['System Design & OOP', 'Go / Java / Python', 'REST & gRPC APIs', 'PostgreSQL / Redis', 'CI/CD & Docker', 'Data Structures & Algorithms'],
    keyTools: ['Git / GitHub', 'Postman / Bruno', 'Kubernetes', 'AWS Lambda', 'Kafka', 'Grafana'],
    recommendedProjects: [
      'Distributed Rate Limiter & Load Balancer in Go',
      'Real-time Messaging Engine with WebSockets & Redis Pub/Sub',
      'Microservice Payment Gateway with Saga Pattern'
    ],
    salaryTiers: {
      entry: '$88,000',
      mid: '$125,000',
      senior: '$168,000',
      staff: '$225,000+'
    },
    hiringHotspots: [
      { location: 'Seattle / Redmond', avgPay: '$165,000', hiringVelocity: '18 Days', remoteRatio: '54%' },
      { location: 'Austin Tech Corridor', avgPay: '$142,000', hiringVelocity: '20 Days', remoteRatio: '60%' },
      { location: 'San Francisco Bay Area', avgPay: '$175,000', hiringVelocity: '17 Days', remoteRatio: '48%' },
      { location: 'Global Remote', avgPay: '$135,000', hiringVelocity: '15 Days', remoteRatio: '100%' }
    ],
    industrySectors: [
      { sector: 'Cloud Infrastructure & DevOps', share: 36, growth: '+28% YoY' },
      { sector: 'FinTech & Digital Banking', share: 28, growth: '+24% YoY' },
      { sector: 'E-Commerce & Logistics', share: 20, growth: '+18% YoY' },
      { sector: 'HealthTech & Bio-Informatics', share: 16, growth: '+15% YoY' }
    ],
    toolAdoption: [
      { name: 'Docker & Containers', category: 'CI/CD & MLOps', adoptionRate: 94, momentum: '+18% YoY', relevance: 'Universal containerization standard across all modern teams' },
      { name: 'PostgreSQL / Redis', category: 'Database / Vector', adoptionRate: 91, momentum: '+25% YoY', relevance: 'Primary transactional storage and sub-millisecond memory caching' },
      { name: 'Kubernetes (K8s)', category: 'Cloud / Infra', adoptionRate: 78, momentum: '+30% YoY', relevance: 'Automated container orchestration, scaling, and rolling updates' },
      { name: 'Kafka & Event Streams', category: 'Cloud / Infra', adoptionRate: 72, momentum: '+26% YoY', relevance: 'Decoupled asynchronous event-driven distributed architectures' },
      { name: 'gRPC & Protocol Buffers', category: 'Framework', adoptionRate: 68, momentum: '+32% YoY', relevance: 'High-performance microservice RPC communication' },
      { name: 'Prometheus & Grafana', category: 'Security / Tooling', adoptionRate: 65, momentum: '+20% YoY', relevance: 'Full-stack observability, telemetry, and threshold alerting' }
    ],
    interviewQuestions: [
      {
        type: 'System Design',
        difficulty: 'Advanced',
        question: 'Design a distributed rate limiter that handles 1,000,000 requests per second across multiple data centers.',
        recruiterFocus: 'Tests knowledge of token bucket algorithms, Redis sorted sets/Lua scripts, clock drift, and local vs distributed state.',
        modelTalkingPoints: [
          'Sliding window counter algorithm implemented via atomic Redis Lua scripts',
          'Two-tier caching: in-memory local token cache (syncing in batches) + centralized Redis cluster',
          'Graceful degradation: fallback to local IP hash if global Redis latency spikes > 15ms',
          'HTTP 429 Too Many Requests with Retry-After headers for client backoff compliance'
        ]
      },
      {
        type: 'Technical Deep Dive',
        difficulty: 'Advanced',
        question: 'How do database transactions maintain ACID properties under high write concurrency? Explain MVCC and WAL.',
        recruiterFocus: 'Evaluates concurrency control, write-ahead logging (WAL), deadlock resolution, and isolation levels (Read Committed vs Serializable).',
        modelTalkingPoints: [
          'Write-Ahead Log (WAL) ensures Atomicity & Durability before writing pages to disk',
          'Multi-Version Concurrency Control (MVCC) lets readers read without locking writers',
          'Transaction snapshot isolation prevents dirty reads and non-repeatable reads',
          'Deadlock detection uses wait-for graphs with automatic transaction abort rollbacks'
        ]
      },
      {
        type: 'Behavioral & Leadership',
        difficulty: 'Intermediate',
        question: 'Tell me about a high-severity production outage you debugged. How did you isolate root cause under time pressure?',
        recruiterFocus: 'Looks for calm analytical troubleshooting, blameless post-mortem culture, and preventive telemetry.',
        modelTalkingPoints: [
          'Triaged Grafana error rates and correlated spike to a database connection pool exhaustion',
          'Mitigated immediate impact by spinning up read-replicas and throttling non-critical cron jobs',
          'Conducted blameless RCA and merged automated circuit breakers to prevent cascade failures'
        ]
      }
    ],
    capstoneBlueprint: {
      title: 'High-Throughput Distributed Rate Limiter & Message Broker',
      tagline: 'Scalable Go microservice engine with Redis cluster coordination, WebSockets, and zero packet loss.',
      difficulty: 'Production Grade',
      estimatedHours: '30 - 40 Hours',
      recruiterImpactScore: 9.7,
      architecture: [
        { layer: 'API Gateway', tech: 'Go + Chi / Gin Router', details: 'Reverse proxy handling TLS termination, JWT validation, and route dispatching.' },
        { layer: 'Rate Limiting Core', tech: 'Redis + Lua Scripts', details: 'Sliding window log algorithm enforcing tier-based limits at 250k req/sec.' },
        { layer: 'Event Streaming', tech: 'Apache Kafka / Redpanda', details: 'Partitioned event pub/sub with idempotent consumer guarantees.' },
        { layer: 'Telemetry', tech: 'Prometheus + OpenTelemetry', details: 'Distributed trace spans tracked through Jaeger with p99 latency alerts.' }
      ],
      keyDeliverables: [
        'Go microservice codebase with 85%+ unit test code coverage',
        'K6 load-testing script proving p99 latency < 8ms under 50,000 concurrent virtual users',
        'Docker Compose & Kubernetes Helm charts for one-click local cluster spinup',
        'Grafana dashboard JSON export monitoring request throughput and reject rate'
      ],
      githubReadmeHighlights: [
        'Benchmark comparison: Token Bucket vs Sliding Window under burst traffic',
        'Interactive Architecture Diagram illustrating Redis Lua atomicity',
        'CI/CD workflow running golangci-lint, race detector, and unit tests'
      ]
    },
    hiringStats: {
      avgDaysToOffer: 19,
      activeJobOpenings: '82,000+',
      offerAcceptanceRate: '84%'
    }
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Intelligence',
    tagline: 'Transform raw enterprise telemetry into actionable business intelligence and metrics.',
    avgSalary: '$85,000 - $125,000',
    demandGrowth: '+18% YoY',
    iconName: 'BarChart3',
    description: 'Extract operational insights, design executive dashboards, write analytical SQL queries, and perform statistical modeling.',
    coreSkills: ['Advanced SQL & CTEs', 'Power BI / Tableau', 'Python (Pandas/NumPy)', 'A/B Testing & Stats', 'Data Storytelling', 'Excel / Financial Modeling'],
    keyTools: ['Snowflake / BigQuery', 'dbt (data build tool)', 'Power BI', 'Metabase', 'Jupyter Notebooks', 'Git'],
    recommendedProjects: [
      'SaaS Churn Prediction & Customer Lifetime Value Dashboard',
      'E-commerce Funnel Conversion A/B Test Statistical Analysis',
      'Automated Executive KPI Reporting Engine with SQL & dbt'
    ],
    salaryTiers: {
      entry: '$70,000',
      mid: '$96,000',
      senior: '$130,000',
      staff: '$165,000+'
    },
    hiringHotspots: [
      { location: 'New York Metro', avgPay: '$118,000', hiringVelocity: '21 Days', remoteRatio: '62%' },
      { location: 'Chicago / Midwest', avgPay: '$98,000', hiringVelocity: '24 Days', remoteRatio: '58%' },
      { location: 'San Francisco Bay Area', avgPay: '$132,000', hiringVelocity: '19 Days', remoteRatio: '55%' },
      { location: 'Global Remote', avgPay: '$95,000', hiringVelocity: '16 Days', remoteRatio: '100%' }
    ],
    industrySectors: [
      { sector: 'Financial Services & Insurance', share: 34, growth: '+22% YoY' },
      { sector: 'E-Commerce & Digital Retail', share: 30, growth: '+20% YoY' },
      { sector: 'Healthcare & Life Sciences', share: 20, growth: '+16% YoY' },
      { sector: 'Media & Streaming Analytics', share: 16, growth: '+12% YoY' }
    ],
    toolAdoption: [
      { name: 'Advanced SQL & CTEs', category: 'Framework', adoptionRate: 98, momentum: '+15% YoY', relevance: 'Absolute baseline requirement across all analytical data roles' },
      { name: 'Power BI & Tableau', category: 'Security / Tooling', adoptionRate: 92, momentum: '+20% YoY', relevance: 'Executive dashboarding and interactive self-serve reporting' },
      { name: 'Snowflake / BigQuery', category: 'Cloud / Infra', adoptionRate: 85, momentum: '+35% YoY', relevance: 'Modern cloud data warehousing for petabyte-scale queries' },
      { name: 'dbt (data build tool)', category: 'Framework', adoptionRate: 74, momentum: '+48% YoY', relevance: 'Version-controlled transformation and automated data testing' },
      { name: 'Python (Pandas & Seaborn)', category: 'Framework', adoptionRate: 70, momentum: '+24% YoY', relevance: 'Exploratory data analysis, stats testing, and visualization' },
      { name: 'Excel / Power Query', category: 'Security / Tooling', adoptionRate: 82, momentum: '+8% YoY', relevance: 'Rapid financial modeling and stakeholder ad-hoc analysis' }
    ],
    interviewQuestions: [
      {
        type: 'Technical Deep Dive',
        difficulty: 'Advanced',
        question: 'Write a query calculating 7-day rolling average user retention and finding customers whose purchase interval decreased by >30%.',
        recruiterFocus: 'Tests window functions (AVG() OVER ROWS BETWEEN), LAG()/LEAD(), self-joins, and query optimization.',
        modelTalkingPoints: [
          'Calculates rolling metrics using ROWS BETWEEN 6 PRECEDING AND CURRENT ROW',
          'Computes delta intervals via LAG(purchase_date) OVER (PARTITION BY user_id ORDER BY purchase_date)',
          'Avoids subquery Cartesian explosions by filtering through CTE partitioned window ranks',
          'Ensures partition keys match warehouse clustering keys to prevent full-table scans'
        ]
      },
      {
        type: 'System Design',
        difficulty: 'Intermediate',
        question: 'How would you structure a multi-tier dbt modeling architecture (staging, intermediate, marts) for a fast-scaling SaaS product?',
        recruiterFocus: 'Evaluates dimensional modeling (Kimball Star Schema), raw data hygiene, surrogate keys, and automated testing.',
        modelTalkingPoints: [
          'Staging: 1-to-1 view mapping with raw sources, cleaning types, and renaming columns',
          'Intermediate: business logic joins, ephemeral CTE aggregations, and entity deduplication',
          'Marts: dimensional star schema (dim_users, fct_subscriptions) optimized for BI queries',
          'Tests: schema assertions (not_null, unique, relationships) running automatically on PR merge'
        ]
      },
      {
        type: 'Behavioral & Leadership',
        difficulty: 'Intermediate',
        question: 'When product managers and marketing leads disagree on the success of an A/B test due to conflicting metrics, how do you guide the decision?',
        recruiterFocus: 'Assesses statistical rigor (sample size, p-value, statistical power, Type I/II errors) and business diplomacy.',
        modelTalkingPoints: [
          'Checked sample ratio mismatch (SRM) and confirmed minimum detectable effect (MDE) power > 80%',
          'Deconstructed metric conflicts: short-term conversion boost vs long-term cohort churn',
          'Presented unified expected value calculation showing projected 12-month net revenue impact'
        ]
      }
    ],
    capstoneBlueprint: {
      title: 'Enterprise SaaS Customer Churn & Cohort Lifetime Value Dashboard',
      tagline: 'End-to-end dbt + Snowflake data model powering interactive Power BI / Tableau executive intelligence.',
      difficulty: 'Advanced',
      estimatedHours: '25 - 35 Hours',
      recruiterImpactScore: 9.5,
      architecture: [
        { layer: 'Data Warehouse', tech: 'Snowflake / BigQuery', details: 'Partitioned tables storing 500k synthetic user events and subscription transactions.' },
        { layer: 'Transformation Layer', tech: 'dbt Core + Jinja', details: 'Modular Kimball star schema modeling dim_customers, fct_monthly_recurring_revenue.' },
        { layer: 'Statistical Engine', tech: 'Python (SciPy & Statsmodels)', details: 'Cohort survival analysis, Kaplan-Meier curves, and churn probability coefficients.' },
        { layer: 'Presentation Layer', tech: 'Power BI / Tableau / Metabase', details: 'Interactive drill-down dashboards with DAX measures and executive summary views.' }
      ],
      keyDeliverables: [
        'Production dbt project with 25+ models, schema tests, and documentation graph',
        'Interactive BI dashboard with real-time churn predictors and cohort retention heatmaps',
        'Executive PDF slide deck translating complex statistical findings into 3 business actions',
        'SQL query repository documenting window functions, cohort retention matrix, and LTV calculation'
      ],
      githubReadmeHighlights: [
        'Live Tableau Public / Metabase dashboard embeds',
        'Lineage DAG screenshot illustrating data flow from raw to marts',
        'Comprehensive business case study with ROI impact metrics'
      ]
    },
    hiringStats: {
      avgDaysToOffer: 22,
      activeJobOpenings: '56,000+',
      offerAcceptanceRate: '82%'
    }
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Intelligence',
    tagline: 'Uncover statistical patterns, build predictive ML models, and optimize decisions.',
    avgSalary: '$120,000 - $175,000',
    demandGrowth: '+26% YoY',
    iconName: 'BrainCircuit',
    description: 'Combine advanced statistics, machine learning algorithms, and deep domain expertise to solve complex predictive problems.',
    coreSkills: ['Scikit-Learn / XGBoost', 'Statistical Inference', 'Feature Engineering', 'Hypothesis Testing', 'Python / R', 'Exploratory Data Analysis'],
    keyTools: ['JupyterLab', 'MLflow', 'Spark / PySpark', 'PostgreSQL', 'Airflow', 'Streamlit'],
    recommendedProjects: [
      'Credit Risk Scoring Model with Explainable AI (SHAP)',
      'Customer Demand Forecasting Pipeline using Prophet & XGBoost',
      'Healthcare Recommendation Engine with Collaborative Filtering'
    ],
    salaryTiers: {
      entry: '$95,000',
      mid: '$138,000',
      senior: '$185,000',
      staff: '$240,000+'
    },
    hiringHotspots: [
      { location: 'Boston Biotech Hub', avgPay: '$168,000', hiringVelocity: '19 Days', remoteRatio: '50%' },
      { location: 'San Francisco Bay Area', avgPay: '$185,000', hiringVelocity: '17 Days', remoteRatio: '46%' },
      { location: 'New York FinTech', avgPay: '$172,000', hiringVelocity: '20 Days', remoteRatio: '52%' },
      { location: 'Global Remote', avgPay: '$140,000', hiringVelocity: '15 Days', remoteRatio: '100%' }
    ],
    industrySectors: [
      { sector: 'FinTech Risk & Fraud Analytics', share: 35, growth: '+30% YoY' },
      { sector: 'BioTech & Precision Medicine', share: 25, growth: '+28% YoY' },
      { sector: 'E-Commerce Recommendations', share: 22, growth: '+22% YoY' },
      { sector: 'Supply Chain & Demand Forecasting', share: 18, growth: '+19% YoY' }
    ],
    toolAdoption: [
      { name: 'Scikit-Learn & XGBoost', category: 'Framework', adoptionRate: 95, momentum: '+20% YoY', relevance: 'Standard gradient boosted trees for tabular enterprise data' },
      { name: 'Python (NumPy / SciPy)', category: 'Framework', adoptionRate: 96, momentum: '+16% YoY', relevance: 'Mathematical modeling, linear algebra, and statistical hypothesis testing' },
      { name: 'MLflow & Experiment Tracking', category: 'CI/CD & MLOps', adoptionRate: 75, momentum: '+38% YoY', relevance: 'Model registry, parameter logging, and artifact reproducibility' },
      { name: 'Spark / PySpark', category: 'Cloud / Infra', adoptionRate: 68, momentum: '+22% YoY', relevance: 'Distributed big-data feature transformation across clusters' },
      { name: 'SHAP & Explainable AI', category: 'Framework', adoptionRate: 72, momentum: '+42% YoY', relevance: 'Game-theory Shapley values for regulatory model compliance' },
      { name: 'Apache Airflow', category: 'Cloud / Infra', adoptionRate: 62, momentum: '+25% YoY', relevance: 'Orchestrating daily retraining DAGs and data pipelines' }
    ],
    interviewQuestions: [
      {
        type: 'Technical Deep Dive',
        difficulty: 'Advanced',
        question: 'Explain how XGBoost handles missing values, prevents overfitting through regularization, and calculates split gain.',
        recruiterFocus: 'Evaluates understanding of gradient & hessian second-order Taylor expansion, gamma split pruning, and lambda L2 weights.',
        modelTalkingPoints: [
          'Uses objective function with first (gi) and second (hi) order gradients',
          'Missing values are assigned to the default split direction that maximizes gain during training',
          'Gamma acts as minimum loss reduction required to make a further partition',
          'Subsampling rows and columns prevents trees from greedily memorizing noise'
        ]
      },
      {
        type: 'System Design',
        difficulty: 'Advanced',
        question: 'Design an automated credit risk scoring pipeline that serves real-time loan approval decisions with regulatory explainability.',
        recruiterFocus: 'Assesses class imbalance handling, feature drift detection (Evidently AI), latency constraints, and SHAP value generation.',
        modelTalkingPoints: [
          'Handles extreme class imbalance via PR-AUC optimization and focal loss rather than naive SMOTE',
          'TreeSHAP algorithm generates real-time feature contribution scores within 25ms',
          'Model registry via MLflow with automated shadow model canary deployment',
          'Drift monitoring pipeline using Population Stability Index (PSI) to trigger retraining DAG'
        ]
      },
      {
        type: 'Behavioral & Leadership',
        difficulty: 'Intermediate',
        question: 'How do you handle a scenario where business stakeholders want to deploy a complex deep learning model when a simple logistic regression achieves 95% of the performance?',
        recruiterFocus: 'Tests pragmatism, maintenance cost awareness, interpretability, and latency tradeoffs.',
        modelTalkingPoints: [
          'Advocated for Occam razor: quantified maintenance debt and inference latency of the complex model',
          'Demonstrated that linear model provided transparent auditability for compliance regulators',
          'Proposed hybrid compromise: simple baseline for production while experimenting with deep model in shadow mode'
        ]
      }
    ],
    capstoneBlueprint: {
      title: 'Explainable Credit Risk & Default Prediction System with SHAP',
      tagline: 'End-to-end ML pipeline with class imbalance mitigation, MLflow tracking, and regulatory audit dashboard.',
      difficulty: 'Production Grade',
      estimatedHours: '30 - 40 Hours',
      recruiterImpactScore: 9.7,
      architecture: [
        { layer: 'Feature Engineering', tech: 'Polars / Pandas + Scikit-Learn', details: 'Automated categorical encoding, target encoding, and outlier Winsorization.' },
        { layer: 'Model Training', tech: 'XGBoost + LightGBM + Optuna', details: 'Hyperparameter tuning optimizing PR-AUC on 250,000 loan applicant records.' },
        { layer: 'Explainability Engine', tech: 'TreeSHAP + Partial Dependence', details: 'Generates localized waterfall plots for individual applicant rejection reasons.' },
        { layer: 'Model Serving', tech: 'FastAPI + Streamlit + MLflow', details: 'Interactive UI where loan officers simulate applicant features and view risk confidence.' }
      ],
      keyDeliverables: [
        'Production Scikit-Learn pipeline exportable via ONNX for sub-10ms scoring',
        'MLflow model registry tracking 50+ Optuna trial runs with ROC/PR curves',
        'Comprehensive Jupyter notebook walking through statistical inference and feature correlation',
        'Interactive Streamlit application featuring live SHAP explanation force plots'
      ],
      githubReadmeHighlights: [
        'ROC-AUC vs PR-AUC comparison matrix explaining why accuracy is misleading',
        'Live Streamlit Cloud demo link with pre-loaded sample profiles',
        'Compliance documentation template aligned with Fair Lending AI guidelines'
      ]
    },
    hiringStats: {
      avgDaysToOffer: 18,
      activeJobOpenings: '42,000+',
      offerAcceptanceRate: '85%'
    }
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    category: 'Product Engineering',
    tagline: 'Create modern, hyper-fast responsive web applications with rich user interfaces.',
    avgSalary: '$95,000 - $145,000',
    demandGrowth: '+25% YoY',
    iconName: 'Layout',
    description: 'Build full-stack web applications using React, TypeScript, Next.js, Node.js, and modern CSS frameworks with flawless UX.',
    coreSkills: ['React / Next.js', 'TypeScript & Modern JS', 'Tailwind CSS & Glassmorphism', 'Node.js / Express / Next Auth', 'GraphQL / REST APIs', 'Web Performance & SEO'],
    keyTools: ['Vite', 'Vercel / Netlify', 'Supabase / Prisma', 'Figma', 'Playwright / Vitest', 'Git'],
    recommendedProjects: [
      'SaaS Kanban Workspace with Drag-and-Drop & Realtime Sync',
      'AI Powered Content CMS with Edge Rendering & MDX',
      'E-commerce Platform with Stripe Checkout & Micro-frontend UI'
    ],
    salaryTiers: {
      entry: '$78,000',
      mid: '$112,000',
      senior: '$152,000',
      staff: '$198,000+'
    },
    hiringHotspots: [
      { location: 'San Francisco / Bay Area', avgPay: '$162,000', hiringVelocity: '15 Days', remoteRatio: '58%' },
      { location: 'New York Metro', avgPay: '$148,000', hiringVelocity: '17 Days', remoteRatio: '65%' },
      { location: 'Los Angeles / SoCal', avgPay: '$135,000', hiringVelocity: '20 Days', remoteRatio: '60%' },
      { location: 'Global Remote', avgPay: '$120,000', hiringVelocity: '13 Days', remoteRatio: '100%' }
    ],
    industrySectors: [
      { sector: 'B2B SaaS & Productivity Tools', share: 40, growth: '+32% YoY' },
      { sector: 'E-Commerce & DTC Platforms', share: 26, growth: '+22% YoY' },
      { sector: 'Creator Economy & Media', share: 18, growth: '+20% YoY' },
      { sector: 'FinTech & Web3 Interfaces', share: 16, growth: '+18% YoY' }
    ],
    toolAdoption: [
      { name: 'React 18 & TypeScript', category: 'Framework', adoptionRate: 96, momentum: '+25% YoY', relevance: 'Universal front-end standard with strict type guarantees' },
      { name: 'Next.js (App Router)', category: 'Framework', adoptionRate: 88, momentum: '+42% YoY', relevance: 'React Server Components, edge rendering, and SEO superiority' },
      { name: 'Tailwind CSS', category: 'Framework', adoptionRate: 85, momentum: '+35% YoY', relevance: 'Rapid design systems, dark modes, and zero runtime overhead' },
      { name: 'Supabase / Prisma', category: 'Database / Vector', adoptionRate: 76, momentum: '+50% YoY', relevance: 'PostgreSQL with Row Level Security, instant Auth, and realtime websockets' },
      { name: 'Playwright & Vitest', category: 'Security / Tooling', adoptionRate: 68, momentum: '+38% YoY', relevance: 'Reliable cross-browser E2E testing without flaky tests' },
      { name: 'Vercel / Cloudflare Edge', category: 'Cloud / Infra', adoptionRate: 82, momentum: '+30% YoY', relevance: 'Global edge deployment with serverless functions and instant preview CI' }
    ],
    interviewQuestions: [
      {
        type: 'System Design',
        difficulty: 'Advanced',
        question: 'Design a collaborative real-time Kanban board (like Trello/Linear) handling concurrent drag-and-drop updates with offline support.',
        recruiterFocus: 'Evaluates optimistic UI updates, CRDTs / Operational Transformation, WebSocket reconnections, and IndexedDB local caching.',
        modelTalkingPoints: [
          'Optimistic UI state updates in React with rollback triggers on API failure',
          'Conflict-Free Replicated Data Types (Yjs / CRDT) for peer-to-peer real-time state sync',
          'IndexedDB local persistence via Dexie.js for full offline capability',
          'Debounced batch updates to PostgreSQL with Row-Level Security via Supabase'
        ]
      },
      {
        type: 'Technical Deep Dive',
        difficulty: 'Advanced',
        question: 'How do React Server Components (RSC) fundamentally differ from traditional SSR? How does Next.js 14 stream partial content to the browser?',
        recruiterFocus: 'Tests understanding of bundle size zero-cost, React flight protocol, Suspense boundaries, and HTTP chunked transfer streaming.',
        modelTalkingPoints: [
          'RSCs execute exclusively on the server and never ship their dependencies to the client bundle',
          'Streams HTML shells immediately while async server components resolve data independently',
          'React Flight JSON protocol allows client components to receive serialized tree updates without full re-render',
          'Cache tiers: Request Memoization, Data Cache, Full Route Cache, and Router Cache'
        ]
      },
      {
        type: 'Behavioral & Leadership',
        difficulty: 'Intermediate',
        question: 'How do you convince a product team to invest sprint time into web performance and accessibility (a11y) when they only prioritize new features?',
        recruiterFocus: 'Assesses business conversion ties (Core Web Vitals impact on SEO & checkout revenue) and empathy.',
        modelTalkingPoints: [
          'Tied Lighthouse LCP to conversion drop-offs: demonstrated that a 400ms delay lost 7% in checkout conversions',
          'Audited accessibility using axe-core and presented the legal compliance and user reach risks',
          'Set up automated GitHub Lighthouse CI budget gates so regressions are stopped before merging'
        ]
      }
    ],
    capstoneBlueprint: {
      title: 'Modern SaaS Kanban Workspace with Real-Time Collaboration',
      tagline: 'Production Next.js 14 App Router workspace with Supabase realtime sync, optimistic updates, and Stripe billing.',
      difficulty: 'Production Grade',
      estimatedHours: '30 - 40 Hours',
      recruiterImpactScore: 9.8,
      architecture: [
        { layer: 'Frontend Client', tech: 'Next.js 14 + Tailwind CSS + Framer Motion', details: 'Frictionless drag-and-drop board with fluid micro-interactions and dark mode.' },
        { layer: 'State & Realtime', tech: 'Zustand + Supabase Realtime Channels', details: 'Optimistic state mutations with instant multi-cursor broadcasting.' },
        { layer: 'Backend & Auth', tech: 'NextAuth.js / Supabase Auth + Prisma', details: 'OAuth Google/GitHub login, role-based access, and Row Level Security policies.' },
        { layer: 'Payments & Cloud', tech: 'Stripe Webhooks + Vercel Edge', details: 'Subscription checkout, customer portal, and automatic tier tier entitlement provisioning.' }
      ],
      keyDeliverables: [
        'Full-stack Next.js 14 repository with strict TypeScript and 100/100 Lighthouse performance',
        'Supabase PostgreSQL schema with RLS policies protecting multi-tenant user workspaces',
        'Playwright E2E test suite verifying board drag-drop, login flow, and Stripe checkout simulation',
        'Live production deployment on Vercel with custom domain and preview branches'
      ],
      githubReadmeHighlights: [
        'Lighthouse 100/100 performance audit badge screenshot',
        'Live demo app login credentials for recruiters to test in 1 click',
        'Video GIF demonstrating real-time two-window synchronization'
      ]
    },
    hiringStats: {
      avgDaysToOffer: 15,
      activeJobOpenings: '76,000+',
      offerAcceptanceRate: '88%'
    }
  },
  {
    id: 'cybersecurity-engineer',
    title: 'Cybersecurity Engineer',
    category: 'Security & Infrastructure',
    tagline: 'Protect cloud infrastructure, audit application vulnerabilities, and automate defense.',
    avgSalary: '$125,000 - $180,000',
    demandGrowth: '+32% YoY',
    iconName: 'ShieldCheck',
    description: 'Identify security risks, implement zero-trust network protocols, perform penetration testing, and maintain SOC compliance.',
    coreSkills: ['Network Security & Wireshark', 'Penetration Testing', 'SIEM & Threat Detection', 'IAM & Zero Trust', 'Cryptography & SSL/TLS', 'Cloud Security (AWS/Azure)'],
    keyTools: ['Burp Suite', 'Metasploit', 'Splunk / ELK', 'Nmap', 'Terraform', 'Kali Linux'],
    recommendedProjects: [
      'Automated Vulnerability Scanner & Container Security Auditing Script',
      'Zero-Trust Auth Gateway with Hardware Security Key Support',
      'SIEM Log Analysis Pipeline for Anomaly & Intrusion Detection'
    ],
    salaryTiers: {
      entry: '$92,000',
      mid: '$135,000',
      senior: '$182,000',
      staff: '$235,000+'
    },
    hiringHotspots: [
      { location: 'Washington D.C. / GovTech', avgPay: '$175,000', hiringVelocity: '16 Days', remoteRatio: '42%' },
      { location: 'San Francisco Bay Area', avgPay: '$188,000', hiringVelocity: '18 Days', remoteRatio: '50%' },
      { location: 'Dallas / Texas Corridor', avgPay: '$150,000', hiringVelocity: '21 Days', remoteRatio: '55%' },
      { location: 'Global Remote', avgPay: '$145,000', hiringVelocity: '14 Days', remoteRatio: '100%' }
    ],
    industrySectors: [
      { sector: 'Defense & Aerospace / GovCloud', share: 38, growth: '+35% YoY' },
      { sector: 'Banking & Financial Technology', share: 32, growth: '+32% YoY' },
      { sector: 'Healthcare & Critical Infrastructure', share: 18, growth: '+28% YoY' },
      { sector: 'Enterprise SaaS Compliance', share: 12, growth: '+24% YoY' }
    ],
    toolAdoption: [
      { name: 'Burp Suite & OWASP ZAP', category: 'Security / Tooling', adoptionRate: 94, momentum: '+22% YoY', relevance: 'Web application vulnerability discovery and manual penetration testing' },
      { name: 'Splunk & ELK SIEM', category: 'Security / Tooling', adoptionRate: 88, momentum: '+28% YoY', relevance: 'Enterprise log correlation, threat hunting, and automated alerts' },
      { name: 'Wireshark & Packet Capture', category: 'Framework', adoptionRate: 85, momentum: '+15% YoY', relevance: 'Deep network packet analysis, TLS handshake verification, and forensics' },
      { name: 'Terraform & IaC Security', category: 'Cloud / Infra', adoptionRate: 78, momentum: '+36% YoY', relevance: 'Automating secure cloud infrastructure and drift compliance' },
      { name: 'Nmap & Network Recon', category: 'Security / Tooling', adoptionRate: 90, momentum: '+12% YoY', relevance: 'Port scanning, service enumeration, and vulnerability auditing' },
      { name: 'Docker / Trivy Scanner', category: 'CI/CD & MLOps', adoptionRate: 76, momentum: '+40% YoY', relevance: 'Container vulnerability scanning and supply chain security' }
    ],
    interviewQuestions: [
      {
        type: 'System Design',
        difficulty: 'Advanced',
        question: 'Design a Zero-Trust network architecture for an enterprise with 5,000 hybrid employees accessing multi-cloud resources.',
        recruiterFocus: 'Evaluates perimeter-less security, WebAuthn/FIDO2 MFA, micro-segmentation, continuous posture checks, and mutual TLS.',
        modelTalkingPoints: [
          'Identity as the new perimeter: device posture validation and contextual conditional access',
          'Software-Defined Perimeter (SDP) replaces traditional flat VPN tunnels',
          'Micro-segmentation between microservices using mTLS via Istio / Envoy service mesh',
          'Least-privilege JIT (Just-In-Time) ephemeral access tokens expiring in 15 minutes'
        ]
      },
      {
        type: 'Technical Deep Dive',
        difficulty: 'Advanced',
        question: 'Explain how Server-Side Request Forgery (SSRF) works in cloud environments (e.g. AWS IMDSv1 vs IMDSv2). How do you mitigate it?',
        recruiterFocus: 'Assesses cloud metadata exploitation, token-based session enforcement, and application defense-in-depth.',
        modelTalkingPoints: [
          'SSRF tricks backend server into sending forged requests to internal services (169.254.169.254 metadata service)',
          'IMDSv1 allows direct GET requests, allowing attackers to steal EC2 IAM role credentials',
          'IMDSv2 enforces session-oriented requests requiring a PUT request with X-aws-ec2-metadata-token',
          'Mitigation: input allowlisting, disabling IMDSv1, and network egress firewall rules'
        ]
      },
      {
        type: 'Behavioral & Leadership',
        difficulty: 'Intermediate',
        question: 'How do you handle pushback from software engineering teams when strict security controls slow down their deployment velocity?',
        recruiterFocus: 'Tests empathy, security enablement culture, automation (DevSecOps), and risk negotiation.',
        modelTalkingPoints: [
          'Shift security left: integrated automated SAST (Semgrep) and container scanning (Trivy) directly into PR checks',
          'Created self-serve secure defaults and libraries so engineers do not have to write crypto code from scratch',
          'Gamified security bug bounties and rewarded engineering teams that resolved CVEs proactively'
        ]
      }
    ],
    capstoneBlueprint: {
      title: 'Automated Cloud Vulnerability Scanner & Zero-Trust Auth Gateway',
      tagline: 'Production DevSecOps toolchain scanning containers for CVEs and enforcing hardware-key zero trust access.',
      difficulty: 'Production Grade',
      estimatedHours: '35 - 45 Hours',
      recruiterImpactScore: 9.9,
      architecture: [
        { layer: 'Scanning Engine', tech: 'Python + Trivy + Semgrep', details: 'Automated static code & container image scanning triggered via GitHub Webhooks.' },
        { layer: 'Zero Trust Proxy', tech: 'Go + Envoy Reverse Proxy', details: 'Validates WebAuthn/FIDO2 hardware keys and enforces ephemeral mTLS certificates.' },
        { layer: 'SIEM Correlation', tech: 'ELK Stack / OpenSearch', details: 'Ingests audit logs and flags anomaly attempts via Sigma detection rules.' },
        { layer: 'Security Dashboard', tech: 'FastAPI + Tailwind CSS', details: 'Executive risk matrix displaying active CVE severity distributions and remediation SLA.' }
      ],
      keyDeliverables: [
        'Automated CI/CD security scanner script integrated with GitHub Actions and Slack alerts',
        'Envoy proxy configuration enforcing mTLS with automated Let\'s Encrypt / Vault PKI renewal',
        'Suite of 15+ custom Sigma detection rules identifying brute-force and privilege escalation',
        'Comprehensive Penetration Testing Report formatted to industry standard (CREST / OSCP)'
      ],
      githubReadmeHighlights: [
        'Professional Penetration Testing PDF template sample',
        'Sigma rule validation command scripts',
        'Architecture topology demonstrating Zero-Trust micro-segmentation'
      ]
    },
    hiringStats: {
      avgDaysToOffer: 17,
      activeJobOpenings: '52,000+',
      offerAcceptanceRate: '86%'
    }
  }
];

export const MOCK_SKILL_GAP_DATA: Record<RoleId, SkillItem[]> = {
  'ai-ml-engineer': [
    { name: 'PyTorch / Neural Networks', category: 'Core', importance: 'Essential', candidateLevel: 45, marketRequirement: 90, recommendation: 'Complete deep learning course & build custom PyTorch CNN/Transformer from scratch.' },
    { name: 'RAG Architecture & Vector DBs', category: 'Architecture', importance: 'Essential', candidateLevel: 30, marketRequirement: 85, recommendation: 'Build a Pinecone/Qdrant retriever with chunking strategies.' },
    { name: 'Python & Data Processing', category: 'Core', importance: 'Essential', candidateLevel: 75, marketRequirement: 95, recommendation: 'Practice NumPy vectorization and Pandas memory optimization.' },
    { name: 'FastAPI & Model Deployment', category: 'Tool', importance: 'High', candidateLevel: 60, marketRequirement: 80, recommendation: 'Containerize an ML endpoint using Docker & FastAPI.' },
    { name: 'LLM Fine-Tuning (LoRA/QLoRA)', category: 'Core', importance: 'High', candidateLevel: 20, marketRequirement: 75, recommendation: 'Fine-tune Llama-3 model using Unsloth or PEFT on HuggingFace.' },
    { name: 'MLOps & Tracking (MLflow/W&B)', category: 'Tool', importance: 'Medium', candidateLevel: 15, marketRequirement: 70, recommendation: 'Track hyperparameter experiments using Weights & Biases.' }
  ],
  'software-developer': [
    { name: 'Data Structures & Algorithms', category: 'Core', importance: 'Essential', candidateLevel: 70, marketRequirement: 90, recommendation: 'Master Graphs, Dynamic Programming, and Trees.' },
    { name: 'System Design & Scalability', category: 'Architecture', importance: 'Essential', candidateLevel: 35, marketRequirement: 85, recommendation: 'Study caching strategies (Redis), database sharding, and load balancing.' },
    { name: 'Backend Language (Go / Java / Python)', category: 'Core', importance: 'Essential', candidateLevel: 80, marketRequirement: 95, recommendation: 'Deepen knowledge of concurrency, channels/threads, and memory management.' },
    { name: 'Relational & NoSQL Databases', category: 'Core', importance: 'High', candidateLevel: 65, marketRequirement: 85, recommendation: 'Learn SQL query indexing, transactions (ACID), and query explain plans.' },
    { name: 'Docker & Kubernetes Fundamentals', category: 'Tool', importance: 'High', candidateLevel: 40, marketRequirement: 75, recommendation: 'Create multi-stage Dockerfiles and deployment manifests.' },
    { name: 'CI/CD Pipelines (GitHub Actions)', category: 'Tool', importance: 'Medium', candidateLevel: 50, marketRequirement: 70, recommendation: 'Automate build, test, and release workflows on GitHub.' }
  ],
  'data-analyst': [
    { name: 'Advanced SQL (CTEs, Window Functions)', category: 'Core', importance: 'Essential', candidateLevel: 65, marketRequirement: 95, recommendation: 'Practice complex aggregation queries and window functions on LeetCode SQL.' },
    { name: 'Tableau / Power BI Dashboards', category: 'Tool', importance: 'Essential', candidateLevel: 50, marketRequirement: 90, recommendation: 'Design an interactive executive KPI dashboard with calculated fields.' },
    { name: 'Python for Data Analysis', category: 'Core', importance: 'High', candidateLevel: 60, marketRequirement: 80, recommendation: 'Master Pandas grouping, merging, and Seaborn data visualizations.' },
    { name: 'A/B Testing & Statistics', category: 'Core', importance: 'High', candidateLevel: 40, marketRequirement: 80, recommendation: 'Understand p-values, confidence intervals, and hypothesis testing methods.' },
    { name: 'dbt & Data Transformation', category: 'Tool', importance: 'Medium', candidateLevel: 20, marketRequirement: 70, recommendation: 'Learn how to modularize SQL data transformations using dbt.' },
    { name: 'Executive Presentation Skills', category: 'Soft Skill', importance: 'High', candidateLevel: 70, marketRequirement: 85, recommendation: 'Structure analytical reports focusing on business ROI.' }
  ],
  'data-scientist': [
    { name: 'Machine Learning (Scikit-Learn/XGBoost)', category: 'Core', importance: 'Essential', candidateLevel: 55, marketRequirement: 90, recommendation: 'Implement classification, regression, and cross-validation pipelines.' },
    { name: 'Statistical Modeling & Probability', category: 'Core', importance: 'Essential', candidateLevel: 60, marketRequirement: 88, recommendation: 'Review Bayesian inference, distributions, and variance reduction.' },
    { name: 'Feature Engineering', category: 'Core', importance: 'High', candidateLevel: 50, marketRequirement: 85, recommendation: 'Learn techniques for handling missing data, encoding, and scaling.' },
    { name: 'Spark / Big Data Processing', category: 'Tool', importance: 'High', candidateLevel: 25, marketRequirement: 75, recommendation: 'Practice PySpark DataFrame operations on large datasets.' },
    { name: 'Model Interpretability (SHAP/LIME)', category: 'Architecture', importance: 'Medium', candidateLevel: 30, marketRequirement: 70, recommendation: 'Use SHAP values to explain black-box model predictions.' },
    { name: 'Streamlit / Model Prototyping', category: 'Tool', importance: 'Medium', candidateLevel: 65, marketRequirement: 75, recommendation: 'Build quick interactive web UIs to demonstrate ML models.' }
  ],
  'web-developer': [
    { name: 'React 18 & State Management', category: 'Core', importance: 'Essential', candidateLevel: 80, marketRequirement: 95, recommendation: 'Master custom hooks, Context API, and state optimization.' },
    { name: 'TypeScript Mastery', category: 'Core', importance: 'Essential', candidateLevel: 65, marketRequirement: 90, recommendation: 'Learn generics, utility types, and strict type checking.' },
    { name: 'Next.js & Server Components', category: 'Architecture', importance: 'Essential', candidateLevel: 50, marketRequirement: 85, recommendation: 'Build full-stack app with App Router, SSR, and API routes.' },
    { name: 'Tailwind CSS & Responsive UX', category: 'Tool', importance: 'High', candidateLevel: 85, marketRequirement: 90, recommendation: 'Practice building dark mode, micro-animations, and glassmorphic UIs.' },
    { name: 'Web Security (CORS, JWT, XSS)', category: 'Architecture', importance: 'High', candidateLevel: 45, marketRequirement: 80, recommendation: 'Implement secure auth flow with HttpOnly cookies & CSRF tokens.' },
    { name: 'Testing (Jest / Playwright)', category: 'Tool', importance: 'Medium', candidateLevel: 30, marketRequirement: 75, recommendation: 'Write end-to-end integration tests for critical user flows.' }
  ],
  'cybersecurity-engineer': [
    { name: 'Network Protocol & Packet Analysis', category: 'Core', importance: 'Essential', candidateLevel: 55, marketRequirement: 90, recommendation: 'Analyze PCAP files in Wireshark; understand TCP/IP 3-way handshake.' },
    { name: 'Application Security & OWASP Top 10', category: 'Core', importance: 'Essential', candidateLevel: 45, marketRequirement: 90, recommendation: 'Practice exploiting and fixing SQLi, XSS, and CSRF vulnerabilities.' },
    { name: 'Penetration Testing Tools (Nmap/Burp)', category: 'Tool', importance: 'High', candidateLevel: 40, marketRequirement: 85, recommendation: 'Complete TryHackMe / HackTheBox security lab pathways.' },
    { name: 'IAM & Zero Trust Architecture', category: 'Architecture', importance: 'High', candidateLevel: 35, marketRequirement: 80, recommendation: 'Configure OAuth2, SAML, and least-privilege cloud security policies.' },
    { name: 'SIEM & Log Monitoring (Splunk)', category: 'Tool', importance: 'High', candidateLevel: 30, marketRequirement: 75, recommendation: 'Write detection rules for brute-force and privilege escalation events.' },
    { name: 'Python for Security Automation', category: 'Core', importance: 'Medium', candidateLevel: 65, marketRequirement: 80, recommendation: 'Automate port scanning and API vulnerability checks using Python.' }
  ]
};

export const MOCK_ROADMAPS: Record<RoleId, RoadmapNode[]> = {
  'ai-ml-engineer': [
    {
      id: 'aiml-1',
      phase: 1,
      phaseTitle: 'Foundations & Math',
      title: 'Python for AI & Linear Algebra',
      subtitle: 'Master NumPy, Pandas, Vectors, Matrices, and Derivatives',
      duration: '3 - 4 Weeks',
      description: 'Establish deep mathematical and computational fluency required for modern deep learning models.',
      skillsLearned: ['Python 3.11+', 'NumPy Vectorization', 'Linear Algebra', 'Calculus & Gradient Descent'],
      curatedResources: [
        { title: '3Blue1Brown - Essence of Linear Algebra', type: 'Video', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', isFree: true },
        { title: 'Fast.ai - Practical Deep Learning for Coders', type: 'Course', url: 'https://course.fast.ai/', isFree: true },
        { title: 'Official PyTorch Documentation & Tutorials', type: 'Documentation', url: 'https://pytorch.org/tutorials/', isFree: true }
      ],
      handsOnProject: {
        title: 'Custom Neural Network from scratch in pure NumPy',
        deliverables: ['Forward pass implementation', 'Backpropagation gradient calculation', 'Loss curve visualization'],
        difficulty: 'Beginner'
      },
      completed: true
    },
    {
      id: 'aiml-2',
      phase: 2,
      phaseTitle: 'Core Deep Learning',
      title: 'PyTorch, CNNs & Transformers',
      subtitle: 'Build and train Attention architectures and Computer Vision models',
      duration: '4 - 5 Weeks',
      description: 'Gain hands-on proficiency with PyTorch tensors, autograd, Transformer mechanisms, and model training loops.',
      skillsLearned: ['PyTorch Tensors', 'Self-Attention Mechanism', 'Vision Transformers (ViT)', 'Hyperparameter Tuning'],
      curatedResources: [
        { title: 'Andrej Karpathy - Let\'s build GPT from scratch', type: 'Video', url: 'https://youtube.com/watch?v=kCc8FmEb1nY', isFree: true },
        { title: 'HuggingFace NLP & Transformer Course', type: 'Course', url: 'https://huggingface.co/learn/nlp-course', isFree: true }
      ],
      handsOnProject: {
        title: 'MiniGPT - Character-level Language Model in PyTorch',
        deliverables: ['Custom multi-head attention module', 'Text generation inference script', 'Training on Shakespeare text'],
        difficulty: 'Intermediate'
      },
      completed: true
    },
    {
      id: 'aiml-3',
      phase: 3,
      phaseTitle: 'Applied AI & RAG',
      title: 'LLMs, Vector Databases & RAG Pipelines',
      subtitle: 'Build Enterprise AI search with LangChain, Pinecone, and LlamaIndex',
      duration: '3 - 4 Weeks',
      description: 'Connect pre-trained LLMs to external vector databases for accurate context-aware domain responses.',
      skillsLearned: ['Retrieval Augmented Generation (RAG)', 'Vector Embeddings', 'Qdrant / Pinecone', 'LangChain Agent Tooling'],
      curatedResources: [
        { title: 'Pinecone Vector Database Architecture Guide', type: 'Documentation', url: 'https://www.pinecone.io/learn/', isFree: true },
        { title: 'DeepLearning.AI - Building Systems with ChatGPT API', type: 'Course', url: 'https://www.deeplearning.ai/short-courses/', isFree: true }
      ],
      handsOnProject: {
        title: 'Enterprise PDF Knowledge Agent with Hybrid Search RAG',
        deliverables: ['Chunking & embedding pipeline', 'Hybrid vector/keyword retriever', 'FastAPI REST interface'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'aiml-4',
      phase: 4,
      phaseTitle: 'MLOps & Production',
      title: 'Quantization, vLLM & Production Deployment',
      subtitle: 'Optimize model latency, deploy with Docker/Triton, and track telemetry',
      duration: '4 Weeks',
      description: 'Transform experimental models into production-ready microservices with sub-50ms latency.',
      skillsLearned: ['vLLM & TensorRT-LLM', 'Model Quantization (GGUF/AWQ)', 'Docker & Kubernetes', 'Prometheus & W&B Monitoring'],
      curatedResources: [
        { title: 'vLLM Fast LLM Serving Documentation', type: 'Documentation', url: 'https://docs.vllm.ai/', isFree: true },
        { title: 'MLOps Zoomcamp - DataTalksClub', type: 'Course', url: 'https://github.com/DataTalksClub/mlops-zoomcamp', isFree: true }
      ],
      handsOnProject: {
        title: 'High-Throughput Quantized LLM Inference Gateway',
        deliverables: ['Dockerized vLLM engine', 'Load testing benchmark report', 'Grafana telemetry dashboard'],
        difficulty: 'Advanced'
      },
      completed: false
    }
  ],
  'software-developer': [
    {
      id: 'swe-1',
      phase: 1,
      phaseTitle: 'Language Mastery',
      title: 'Advanced Data Structures & OOP',
      subtitle: 'Master Memory Management, Concurrency, and Core Algorithms',
      duration: '3 - 4 Weeks',
      description: 'Build airtight fundamental skills in software construction, memory handling, and algorithmic efficiency.',
      skillsLearned: ['Data Structures (Trees/Graphs)', 'Big-O Analysis', 'Object-Oriented Design', 'Memory Allocation'],
      curatedResources: [
        { title: 'NeetCode 150 Algorithms Roadmap', type: 'Video', url: 'https://neetcode.io/', isFree: true },
        { title: 'Refactoring.Guru - Design Patterns', type: 'Documentation', url: 'https://refactoring.guru/design-patterns', isFree: true }
      ],
      handsOnProject: {
        title: 'Thread-safe In-Memory Key-Value Store',
        deliverables: ['Mutex locking implementation', 'LRU cache eviction algorithm', 'Benchmark performance suite'],
        difficulty: 'Beginner'
      },
      completed: true
    },
    {
      id: 'swe-2',
      phase: 2,
      phaseTitle: 'Backend Architecture',
      title: 'REST/gRPC APIs & Relational DBs',
      subtitle: 'Design SQL schemas, write performant APIs, and manage indexing',
      duration: '4 Weeks',
      description: 'Learn how modern backend systems serve millions of requests with low latency.',
      skillsLearned: ['REST & gRPC Protocols', 'PostgreSQL Query Tuning', 'Redis Caching', 'Database Migrations'],
      curatedResources: [
        { title: 'Use The Index, Luke! - SQL Performance Guide', type: 'Documentation', url: 'https://use-the-index-luke.com/', isFree: true }
      ],
      handsOnProject: {
        title: 'E-commerce Orders & Inventory API Microservice',
        deliverables: ['ACID compliant SQL schema', 'Redis cache layer', 'OpenAPI/Swagger specification'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'swe-3',
      phase: 3,
      phaseTitle: 'Distributed Systems',
      title: 'Microservices, Messaging & Scalability',
      subtitle: 'Implement Kafka event streams, circuit breakers, and rate limiters',
      duration: '4 - 5 Weeks',
      description: 'Understand how complex software systems operate reliably across distributed server clusters.',
      skillsLearned: ['System Design Patterns', 'Kafka / RabbitMQ', 'Rate Limiting Algorithms', 'Circuit Breakers'],
      curatedResources: [
        { title: 'ByteByteGo - System Design Primer', type: 'Video', url: 'https://youtube.com/@ByteByteGo', isFree: true }
      ],
      handsOnProject: {
        title: 'Distributed Event-Driven Notification System',
        deliverables: ['Kafka event producer/consumer', 'Sliding-window token bucket rate limiter', 'System failure recovery test'],
        difficulty: 'Advanced'
      },
      completed: false
    },
    {
      id: 'swe-4',
      phase: 4,
      phaseTitle: 'Cloud & DevOps',
      title: 'Docker, Kubernetes & CI/CD Pipelines',
      subtitle: 'Automate build pipelines and deploy containerized services to cloud',
      duration: '3 Weeks',
      description: 'Package, deploy, and maintain software applications using cloud-native infrastructure.',
      skillsLearned: ['Docker Multi-stage Builds', 'Kubernetes Manifests', 'GitHub Actions CI/CD', 'Terraform IaC'],
      curatedResources: [
        { title: 'Docker Official Getting Started Guide', type: 'Documentation', url: 'https://docs.docker.com/get-started/', isFree: true }
      ],
      handsOnProject: {
        title: 'Zero-Downtime Deployment Pipeline on Cloud',
        deliverables: ['GitHub Actions workflow script', 'Helm Kubernetes chart', 'Automated rollbacks'],
        difficulty: 'Intermediate'
      },
      completed: false
    }
  ],
  'data-analyst': [
    {
      id: 'da-1',
      phase: 1,
      phaseTitle: 'SQL & Data Wrangling',
      title: 'Advanced SQL Queries & Analytics',
      subtitle: 'Master Window Functions, Subqueries, CTEs, and Data Cleaning',
      duration: '3 Weeks',
      description: 'Extract and transform enterprise data stored in relational data warehouses.',
      skillsLearned: ['SQL CTEs & Windowing', 'Data Aggregations', 'Join Optimizations', 'Data Cleansing'],
      curatedResources: [
        { title: 'Mode Analytics SQL Tutorial', type: 'Course', url: 'https://mode.com/sql-tutorial/', isFree: true }
      ],
      handsOnProject: {
        title: 'Customer Cohort Analysis & Retention Query Suite',
        deliverables: ['Monthly active cohort calculation', 'SQL script repository', 'Raw data anomaly cleaner'],
        difficulty: 'Beginner'
      },
      completed: true
    },
    {
      id: 'da-2',
      phase: 2,
      phaseTitle: 'BI & Visualization',
      title: 'Power BI & Tableau Dashboard Design',
      subtitle: 'Create executive dashboards with interactive DAX and calculated fields',
      duration: '3 - 4 Weeks',
      description: 'Translate complex datasets into visual executive stories that drive business decisions.',
      skillsLearned: ['Power BI / Tableau', 'DAX Formulas', 'UI/UX for Dashboards', 'Data Modeling (Star Schema)'],
      curatedResources: [
        { title: 'Guy in a Cube - Power BI Mastery', type: 'Video', url: 'https://youtube.com/@GuyInACube', isFree: true }
      ],
      handsOnProject: {
        title: 'Enterprise Executive SaaS Revenue Dashboard',
        deliverables: ['Interactive Power BI report', 'DAX measure table', 'Drill-through funnel views'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'da-3',
      phase: 3,
      phaseTitle: 'Statistics & Python',
      title: 'Python for Business Intelligence & A/B Testing',
      subtitle: 'Utilize Pandas, Seaborn, and Hypothesis Testing for business optimization',
      duration: '3 - 4 Weeks',
      description: 'Apply statistical methods to validate marketing experiments and product features.',
      skillsLearned: ['Pandas / NumPy', 'Hypothesis Testing (t-tests, chi-square)', 'Statistical Significance', 'Seaborn Plotting'],
      curatedResources: [
        { title: 'Kaggle - Data Analysis in Python', type: 'Course', url: 'https://www.kaggle.com/learn/pandas', isFree: true }
      ],
      handsOnProject: {
        title: 'E-commerce Checkout Funnel A/B Test Statistical Report',
        deliverables: ['Jupyter notebook analysis', 'Confidence interval calculation', 'Executive slide deck deck summary'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'da-4',
      phase: 4,
      phaseTitle: 'Modern Data Stack',
      title: 'dbt, Snowflake & Analytics Engineering',
      subtitle: 'Build automated data modeling pipelines using dbt and cloud warehouses',
      duration: '3 Weeks',
      description: 'Manage analytical data like software code using dbt transformation models.',
      skillsLearned: ['dbt Core', 'Snowflake / BigQuery', 'Git for Data', 'Data Testing & Documentation'],
      curatedResources: [
        { title: 'dbt Fundamentals Course', type: 'Course', url: 'https://courses.getdbt.com/', isFree: true }
      ],
      handsOnProject: {
        title: 'dbt Analytical Transformation Model Pipeline',
        deliverables: ['Staging & Marts SQL models', 'dbt test assertion suite', 'Automated dbt docs generation'],
        difficulty: 'Advanced'
      },
      completed: false
    }
  ],
  'data-scientist': [
    {
      id: 'ds-1',
      phase: 1,
      phaseTitle: 'Probability & Python',
      title: 'Mathematical Modeling & Exploratory Analysis',
      subtitle: 'Master Distributions, Matrix Algebra, and Exploratory Data Analysis',
      duration: '3 - 4 Weeks',
      description: 'Formulate real-world problems into rigorous mathematical statistical models.',
      skillsLearned: ['Exploratory Data Analysis', 'Probability Theory', 'Distribution Analysis', 'Python (SciPy/Statsmodels)'],
      curatedResources: [
        { title: 'Khan Academy - Statistics & Probability', type: 'Course', url: 'https://www.khanacademy.org/math/statistics-probability', isFree: true }
      ],
      handsOnProject: {
        title: 'Housing Market Exploratory Analysis & Anomaly Detection',
        deliverables: ['Statistical correlation heatmaps', 'Outlier detection pipeline', 'Interactive Seaborn plots'],
        difficulty: 'Beginner'
      },
      completed: true
    },
    {
      id: 'ds-2',
      phase: 2,
      phaseTitle: 'Supervised ML',
      title: 'Regression, Classification & Ensemble Methods',
      subtitle: 'Build XGBoost, Random Forests, and SVMs with Scikit-Learn',
      duration: '4 Weeks',
      description: 'Train high-accuracy predictive machine learning models for classification and numerical forecasting.',
      skillsLearned: ['Scikit-Learn', 'XGBoost / LightGBM', 'Hyperparameter Search (Grid/Random)', 'Model Evaluation Metrics'],
      curatedResources: [
        { title: 'StatQuest with Josh Starmer - ML Fundamentals', type: 'Video', url: 'https://youtube.com/@statquest', isFree: true }
      ],
      handsOnProject: {
        title: 'Customer Churn Prediction Engine with XGBoost',
        deliverables: ['Feature importance plot', 'ROC-AUC & Precision-Recall curve', 'Scikit-Learn Pipeline code'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'ds-3',
      phase: 3,
      phaseTitle: 'Explainability & NLP',
      title: 'SHAP Interpretability & Text Analytics',
      subtitle: 'Explain model predictions and extract signals from unstructured text',
      duration: '3 - 4 Weeks',
      description: 'Demystify black-box ML algorithms using SHAP and apply NLP embedding techniques.',
      skillsLearned: ['SHAP / LIME', 'NLTK / SpaCy', 'TF-IDF & Word Embeddings', 'Sentiment Classification'],
      curatedResources: [
        { title: 'SHAP Official Documentation & Examples', type: 'Documentation', url: 'https://shap.readthedocs.io/', isFree: true }
      ],
      handsOnProject: {
        title: 'Loan Approval Credit Scoring with SHAP Explainability',
        deliverables: ['SHAP summary waterfall plots', 'Fairness audit report', 'Streamlit prototype app'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'ds-4',
      phase: 4,
      phaseTitle: 'Big Data & ML Deployment',
      title: 'PySpark & MLflow Model Registry',
      subtitle: 'Process large scale datasets and manage model lifecycles',
      duration: '4 Weeks',
      description: 'Scale machine learning pipelines to terabyte-scale datasets using distributed computing.',
      skillsLearned: ['PySpark DataFrames', 'MLflow Tracking', 'Streamlit App Prototyping', 'Docker ML Serving'],
      curatedResources: [
        { title: 'Spark Programming Guide', type: 'Documentation', url: 'https://spark.apache.org/docs/latest/rdd-programming-guide.html', isFree: true }
      ],
      handsOnProject: {
        title: 'Distributed Demand Forecasting Engine on PySpark',
        deliverables: ['PySpark ML pipeline script', 'MLflow registered model artifact', 'REST API wrapper'],
        difficulty: 'Advanced'
      },
      completed: false
    }
  ],
  'web-developer': [
    {
      id: 'web-1',
      phase: 1,
      phaseTitle: 'Modern Frontend',
      title: 'React 18, TypeScript & Tailwind CSS',
      subtitle: 'Build modern glassmorphic responsive interfaces with clean component architectures',
      duration: '3 - 4 Weeks',
      description: 'Master component state, props, custom hooks, and utility-first styling with Tailwind.',
      skillsLearned: ['React 18 Hooks', 'TypeScript Generics & Types', 'Tailwind CSS', 'State Management'],
      curatedResources: [
        { title: 'React Official Documentation (react.dev)', type: 'Documentation', url: 'https://react.dev/', isFree: true },
        { title: 'Matt Pocock - Total TypeScript Beginner Guide', type: 'Course', url: 'https://www.totaltypescript.com/tutorials', isFree: true }
      ],
      handsOnProject: {
        title: 'SaaS Analytics Dashboard UI with Dark Theme',
        deliverables: ['Responsive sidebar & navbar', 'Interactive charts using Recharts/Lucide', 'Custom UI component library'],
        difficulty: 'Beginner'
      },
      completed: true
    },
    {
      id: 'web-2',
      phase: 2,
      phaseTitle: 'Full-Stack Frameworks',
      title: 'Next.js 14 App Router & Server Actions',
      subtitle: 'Master Server Components, Routing, Dynamic Data Fetching, and API Routes',
      duration: '4 Weeks',
      description: 'Utilize Next.js framework capabilities for high-performance server-rendered web applications.',
      skillsLearned: ['Next.js App Router', 'React Server Components', 'Server Actions', 'SEO & Performance Optimization'],
      curatedResources: [
        { title: 'Next.js Official Learn Course', type: 'Course', url: 'https://nextjs.org/learn', isFree: true }
      ],
      handsOnProject: {
        title: 'Full-Stack Developer Portfolio & Tech Blog with MDX',
        deliverables: ['Dynamic MDX blog parser', 'Metadata SEO optimization', 'Light/Dark theme switcher'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'web-3',
      phase: 3,
      phaseTitle: 'Backend & Database',
      title: 'Node.js, Supabase, Prisma & Auth',
      subtitle: 'Connect PostgreSQL databases, implement OAuth authentication, and manage state',
      duration: '3 - 4 Weeks',
      description: 'Integrate relational database persistence, authentication, and secure authorization.',
      skillsLearned: ['Supabase / PostgreSQL', 'Prisma ORM', 'NextAuth / Auth.js', 'Stripe Payments'],
      curatedResources: [
        { title: 'Supabase Official Crash Course', type: 'Video', url: 'https://youtube.com/@Supabase', isFree: true }
      ],
      handsOnProject: {
        title: 'AI Prompt Marketplace with Subscription Payments',
        deliverables: ['Supabase Row Level Security schema', 'Stripe webhook integration', 'User auth session handling'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'web-4',
      phase: 4,
      phaseTitle: 'Testing & Production',
      title: 'Web Security, Performance Tuning & Vercel Deployment',
      subtitle: 'Optimize Lighthouse scores, implement CORS/CSRF protections, and deploy',
      duration: '3 Weeks',
      description: 'Ensure web application speed, accessibility, security compliance, and continuous deployment.',
      skillsLearned: ['Playwright E2E Testing', 'Lighthouse Web Vitals', 'CORS & Security Headers', 'Vercel Deployment'],
      curatedResources: [
        { title: 'web.dev - Learn Performance', type: 'Documentation', url: 'https://web.dev/learn/performance/', isFree: true }
      ],
      handsOnProject: {
        title: 'Production Readiness Audit & E2E Test Suite',
        deliverables: ['100/100 Lighthouse performance audit', 'Playwright automated test script', 'Production Vercel deployment'],
        difficulty: 'Advanced'
      },
      completed: false
    }
  ],
  'cybersecurity-engineer': [
    {
      id: 'sec-1',
      phase: 1,
      phaseTitle: 'Networking & Linux',
      title: 'TCP/IP Fundamentals, Wireshark & Linux Admin',
      subtitle: 'Master Bash Scripting, Network Packets, Firewalls, and System Logs',
      duration: '3 - 4 Weeks',
      description: 'Understand low-level networking, packet structures, and Linux security foundations.',
      skillsLearned: ['TCP/IP Protocol Suite', 'Wireshark Packet Analysis', 'Linux CLI & Permissions', 'IPTables & UFW Firewalls'],
      curatedResources: [
        { title: 'NetworkChuck - Free CCNA / Networking Series', type: 'Video', url: 'https://youtube.com/@NetworkChuck', isFree: true },
        { title: 'OverTheWire - Bandit Linux Security Game', type: 'Course', url: 'https://overthewire.org/wargames/bandit/', isFree: true }
      ],
      handsOnProject: {
        title: 'Automated Network Traffic Analyzer in Python (Scapy)',
        deliverables: ['Packet capture parser script', 'Suspicious IP flagger', 'Terminal summary report'],
        difficulty: 'Beginner'
      },
      completed: true
    },
    {
      id: 'sec-2',
      phase: 2,
      phaseTitle: 'AppSec & Web Vulnerabilities',
      title: 'OWASP Top 10 & Burp Suite Testing',
      subtitle: 'Identify and mitigate SQL Injection, XSS, CSRF, and Broken Auth vulnerabilities',
      duration: '4 Weeks',
      description: 'Learn how attackers exploit web vulnerabilities and how engineers defend against them.',
      skillsLearned: ['OWASP Top 10', 'Burp Suite Community', 'Web App Pen Testing', 'Input Sanitization'],
      curatedResources: [
        { title: 'PortSwigger Web Security Academy', type: 'Course', url: 'https://portswigger.net/web-security', isFree: true }
      ],
      handsOnProject: {
        title: 'Web Application Security Audit & Exploitation Report',
        deliverables: ['Burp Suite scan output', 'Proof of Concept (PoC) exploit scripts', 'Remediation patch code'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'sec-3',
      phase: 3,
      phaseTitle: 'Defensive SIEM & Cloud',
      title: 'Splunk, Threat Detection & AWS Security',
      subtitle: 'Write SIEM detection rules, audit IAM policies, and monitor log streams',
      duration: '4 Weeks',
      description: 'Configure Security Information and Event Management (SIEM) systems for threat hunting.',
      skillsLearned: ['Splunk SPL', 'AWS Security Groups & IAM', 'Snort / Suricata IDS', 'Incident Response'],
      curatedResources: [
        { title: 'TryHackMe - SOC Analyst Level 1 Learning Path', type: 'Course', url: 'https://tryhackme.com/', isFree: false }
      ],
      handsOnProject: {
        title: 'SOC Detection Rule Suite for Brute-Force Attacks',
        deliverables: ['Splunk query detection rule', 'Mock intrusion log generator script', 'Alert notification trigger'],
        difficulty: 'Intermediate'
      },
      completed: false
    },
    {
      id: 'sec-4',
      phase: 4,
      phaseTitle: 'Zero Trust & Cryptography',
      title: 'PKI Infrastructure, IAM Policies & SecOps',
      subtitle: 'Implement SSL/TLS certificates, Hardware Keys, and Infrastructure as Code audit',
      duration: '3 Weeks',
      description: 'Design zero-trust enterprise security postures with strict cryptographic verification.',
      skillsLearned: ['PKI & Certificate Authorities', 'OAuth2 / SAML / OIDC', 'Hardware Security Keys (WebAuthn)', 'Terraform Security Scanners'],
      curatedResources: [
        { title: 'AWS Cloud Security Whitepapers', type: 'Documentation', url: 'https://aws.amazon.com/security/whitepapers/', isFree: true }
      ],
      handsOnProject: {
        title: 'Enterprise Zero-Trust Authentication Gateway',
        deliverables: ['OAuth2 + WebAuthn auth service', 'Terraform security compliance checker', 'Threat model matrix'],
        difficulty: 'Advanced'
      },
      completed: false
    }
  ]
};
