import React, { useState, useRef } from 'react';
import { RoleId, ResumeAnalysisResult, ActiveTab } from '../types';
import { CAREER_ROLES } from '../data/rolesData';
import { analyzeResumeWithAI } from '../services/aiService';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  Copy, 
  Check, 
  TrendingUp,
  FileCheck,
  Zap,
  Target
} from 'lucide-react';

interface ResumeAnalyzerProps {
  selectedRoleId: RoleId;
  setSelectedRoleId: (roleId: RoleId) => void;
  onAnalysisComplete?: (result: ResumeAnalysisResult) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

const SAMPLE_RESUMES = {
  sample1: `ALEX DEV
alex.dev@email.com | github.com/alexdev | linkedin.com/in/alexdev

OBJECTIVE
Passionate Computer Science student seeking Software Engineering / AI Engineer roles.

SKILLS
Programming: Python, JavaScript, C++, SQL, HTML/CSS
Frameworks: React, Node.js, Express, NumPy, Pandas
Tools: Git, VS Code, Postman

EXPERIENCE
Software Engineering Intern | TechCorp (Jun 2024 - Sep 2024)
- Worked on backend REST APIs using Node.js and SQL database.
- Fixed frontend bugs in React web application.
- Collaborated with team members during daily agile standups.

PROJECTS
Smart Knowledge Assistant
- Built a Python app using OpenCV and basic machine learning script to classify document images.
- Stored data in SQLite database and displayed results on React dashboard.`,
  
  sample2: `JORDAN SMITH
jordan.smith@email.com | github.com/jordansmith

EDUCATION
B.S. Data Science & Computer Science - Expected May 2025

SKILLS
Python, R, SQL (Postgres), Scikit-Learn, TensorFlow, Power BI, Git, Docker

EXPERIENCE
Data Analyst Intern | Analytics Hub (May 2024 - Aug 2024)
- Analyzed customer churn datasets using SQL queries and Pandas.
- Built interactive Power BI dashboards for executive team.
- Reduced manual reporting time by writing automated Python scripts.

PROJECTS
E-Commerce Demand Forecasting Model
- Developed an XGBoost regression model to forecast seasonal sales demand.
- Handled data pre-processing, feature engineering, and cross-validation.`
};

export const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({
  selectedRoleId,
  setSelectedRoleId,
  onAnalysisComplete,
  setActiveTab
}) => {
  const [resumeInput, setResumeInput] = useState(SAMPLE_RESUMES.sample1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Only PDF files are supported.');
      return;
    }

    setIsExtracting(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BACKEND_URL}/api/resume/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to extract text from PDF.');
      }

      const data = await response.json();
      if (data.text) {
        setResumeInput(data.text);
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Error connecting to upload service.');
    } finally {
      setIsExtracting(false);
    }
  };

  const targetRoleObj = CAREER_ROLES.find(r => r.id === selectedRoleId) || CAREER_ROLES[0];

  const handleRunAnalysis = async () => {
    if (!resumeInput.trim()) return;
    setIsAnalyzing(true);
    try {
      const res = await analyzeResumeWithAI(resumeInput, selectedRoleId);
      setAnalysisResult(res);
      if (onAnalysisComplete) onAnalysisComplete(res);
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border-indigo-500/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">AI Resume ATS Diagnostic</h1>
          </div>
          <p className="text-xs text-slate-300">
            Audit your resume against ATS filters and target keywords for <span className="text-cyan-300 font-semibold">{targetRoleObj.title}</span>.
          </p>
        </div>

        {/* Target Role Dropdown Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Target Role:</span>
          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value as RoleId)}
            className="bg-slate-900 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-indigo-500/30 focus:outline-none focus:border-indigo-500"
          >
            {CAREER_ROLES.map((r) => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Input Form vs Output Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Resume Input Area */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-400" />
                Resume Text Content
              </label>
              
              {/* Sample Pre-fills */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setResumeInput(SAMPLE_RESUMES.sample1)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-medium"
                >
                  Load Sample 1
                </button>
                <span className="text-slate-600">•</span>
                <button
                  onClick={() => setResumeInput(SAMPLE_RESUMES.sample2)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-medium"
                >
                  Sample 2
                </button>
              </div>
            </div>

            <textarea
              value={resumeInput}
              onChange={(e) => setResumeInput(e.target.value)}
              rows={14}
              placeholder="Paste your plain text resume or experience bullet points here..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
            />

            {/* Real File Upload Drag Area */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              accept=".pdf"
              className="hidden"
            />
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              className={`p-4 border border-dashed rounded-2xl text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[90px] ${
                isExtracting 
                  ? 'border-indigo-500/40 bg-indigo-950/20 text-indigo-400' 
                  : 'border-slate-800 bg-slate-950/40 hover:bg-slate-900/50 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {isExtracting ? (
                <div className="space-y-2 flex flex-col items-center">
                  <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                  <p className="text-[10px] font-semibold text-slate-300">
                    Parsing PDF & extracting text...
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-slate-200">
                    Click to upload or Drag & Drop PDF Resume
                  </p>
                  <p className="text-[10px] text-slate-500">
                    PDF text extraction happens dynamically in-memory
                  </p>
                </div>
              )}
            </div>

            {uploadError && (
              <div className="text-[10px] text-rose-400 font-semibold mt-1 bg-rose-500/5 border border-rose-500/20 p-2.5 rounded-xl flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                {uploadError}
              </div>
            )}

            {/* Run Button */}
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !resumeInput.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 shadow-lg shadow-indigo-600/30 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                  Running Ollama ATS Scan...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  Run ATS & Skill Gap Audit
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: ATS Results Dashboard */}
        <div className="lg:col-span-7">
          {analysisResult ? (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Top Score Banner */}
              <div className="glass-panel p-6 rounded-3xl border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-[11px] font-semibold border border-indigo-500/20">
                      <Target className="w-3.5 h-3.5 text-cyan-400" />
                      Target: {analysisResult.targetRole}
                    </div>
                    <button
                      onClick={() => {
                        const report = `SKILLPATH AI - ATS DIAGNOSTIC REPORT\nCandidate: ${analysisResult.candidateName}\nTarget Role: ${analysisResult.targetRole}\nATS Score: ${analysisResult.atsScore}%\n\nSummary:\n${analysisResult.summary}\n\nDetected Keywords:\n${analysisResult.detectedSkills.join(', ')}\n\nMissing Keywords:\n${analysisResult.missingSkills.join(', ')}`;
                        const blob = new Blob([report], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `SkillPath_ATS_Report_${analysisResult.candidateName.replace(/\s+/g, '_')}.txt`;
                        a.click();
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors"
                    >
                      Export Report TXT
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-white">{analysisResult.candidateName}'s ATS Assessment</h3>
                  <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                    {analysisResult.summary}
                  </p>
                </div>

                {/* Score Gauge Circle */}
                <div className="flex flex-col items-center justify-center shrink-0 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
                  <div className="relative flex items-center justify-center w-20 h-20">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-slate-800"
                        fill="transparent"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={201}
                        strokeDashoffset={201 - (201 * analysisResult.atsScore) / 100}
                        className="text-indigo-400 transition-all duration-1000 ease-out"
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute text-xl font-extrabold text-white">
                      {analysisResult.atsScore}%
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-indigo-300 mt-1 uppercase tracking-wider">
                    ATS Pass Score
                  </span>
                </div>
              </div>

              {/* Sub Score Gauges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Experience Match</span>
                    <span className="text-lg font-bold text-white">{analysisResult.experienceScore}%</span>
                  </div>
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="glass-card p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Keyword Relevance</span>
                    <span className="text-lg font-bold text-white">{analysisResult.relevanceScore}%</span>
                  </div>
                  <Zap className="w-5 h-5 text-indigo-400" />
                </div>
              </div>

              {/* Detected vs Missing Skills Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Detected Skills */}
                <div className="glass-panel p-5 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Detected Keywords ({analysisResult.detectedSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.detectedSkills.map((skill, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="glass-panel p-5 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Missing High-Demand Keywords ({analysisResult.missingSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.missingSkills.map((skill, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actionable Bullet Enhancer Section */}
              <div className="glass-panel p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    AI Quantified Bullet Point Enhancer
                  </h4>
                  <span className="text-xs text-slate-400">One-Click Copy</span>
                </div>

                <div className="space-y-4">
                  {analysisResult.improvements.map((item, idx) => (
                    <div key={idx} className="glass-card p-4 rounded-2xl space-y-3 border-slate-800">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-indigo-400 uppercase tracking-wider">{item.section}</span>
                        <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {item.issue}
                        </span>
                      </div>

                      {item.original && (
                        <div className="text-xs text-slate-400 bg-slate-950 p-2.5 rounded-xl border border-slate-900">
                          <span className="font-semibold text-slate-500 block mb-0.5">Original Snippet:</span>
                          "{item.original}"
                        </div>
                      )}

                      {item.improved && (
                        <div className="text-xs text-slate-100 bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/30 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-cyan-300 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              AI Enhanced Bullet:
                            </span>
                            <button
                              onClick={() => copyToClipboard(item.improved!, idx)}
                              className="flex items-center gap-1 text-[11px] text-indigo-300 hover:text-white bg-indigo-600/30 hover:bg-indigo-600/50 px-2 py-1 rounded transition-colors"
                            >
                              {copiedIndex === idx ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  Copy
                                </>
                              )}
                            </button>
                          </div>
                          <p className="font-mono text-slate-200 leading-relaxed">
                            "{item.improved}"
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Step CTA */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-600/10 border border-indigo-500/30">
                <span className="text-xs text-slate-200">
                  Ready to bridge these missing skills with a step-by-step roadmap?
                </span>
                <button
                  onClick={() => setActiveTab('skill-gap')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
                >
                  View Skill Gap Matrix <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ) : (
            /* Empty State Prompt */
            <div className="glass-panel p-12 rounded-3xl text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <FileText className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-lg font-bold text-white">Ready for your ATS Assessment</h3>
                <p className="text-xs text-slate-400">
                  Paste your resume bullet points on the left and click <span className="text-indigo-300 font-semibold">"Run ATS & Skill Gap Audit"</span> to inspect your score.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
