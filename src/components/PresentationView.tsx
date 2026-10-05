import React, { useState, useEffect } from 'react';
import { RoleId, ResumeAnalysisResult, ActiveTab } from '../types';
import { CAREER_ROLES, MOCK_SKILL_GAP_DATA, MOCK_ROADMAPS } from '../data/rolesData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Target, 
  Sparkles, 
  Compass, 
  Award, 
  Bot, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  TrendingUp,
  DollarSign,
  MapPin,
  Layers,
  Cpu,
  Code,
  Terminal,
  Database,
  ShieldCheck,
  FileText,
  ListChecks,
  Star,
  Copy,
  Check,
  BookOpen,
  Briefcase,
  HelpCircle,
  Info,
  ExternalLink,
  Flame,
  Building2,
  Activity,
  Workflow
} from 'lucide-react';

interface PresentationViewProps {
  selectedRoleId: RoleId;
  setSelectedRoleId: (roleId: RoleId) => void;
  latestResumeAnalysis: ResumeAnalysisResult | null;
  setActiveTab: (tab: ActiveTab) => void;
}

type SlideTheme = 'indigo' | 'cyberpunk' | 'emerald' | 'amber';

export const PresentationView: React.FC<PresentationViewProps> = ({
  selectedRoleId,
  setSelectedRoleId,
  latestResumeAnalysis,
  setActiveTab
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState<SlideTheme>('indigo');
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Slide-specific interactive state
  const [activeSalaryTier, setActiveSalaryTier] = useState<'entry' | 'mid' | 'senior' | 'staff'>('mid');
  const [atsViewMode, setAtsViewMode] = useState<'strengths' | 'keywords' | 'rewrite'>('strengths');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<string>('all');
  const [toolCategoryFilter, setToolCategoryFilter] = useState<string>('all');
  const [activeRoadmapPhase, setActiveRoadmapPhase] = useState(0);
  const [activeQuestionCategory, setActiveQuestionCategory] = useState<'System Design' | 'Technical Deep Dive' | 'Behavioral & Leadership'>('System Design');
  const [activePlanTab, setActivePlanTab] = useState<'30' | '60' | '90'>('30');
  const [completedDeliverables, setCompletedDeliverables] = useState<Record<string, boolean>>({});

  const targetRoleObj = CAREER_ROLES.find(r => r.id === selectedRoleId) || CAREER_ROLES[0];
  const skills = MOCK_SKILL_GAP_DATA[selectedRoleId] || [];
  const roadmapNodes = MOCK_ROADMAPS[selectedRoleId] || [];

  const totalSlides = 8;

  const slideDeckInfo = [
    { title: 'Executive Strategy', icon: TrendingUp, tag: 'Market Intelligence' },
    { title: 'ATS Scorecard', icon: FileText, tag: 'Resume Diagnostics' },
    { title: 'Skill Gap Telemetry', icon: Target, tag: 'Competency Matrix' },
    { title: 'Modern Tech Stack', icon: Cpu, tag: 'Tooling Adoption' },
    { title: 'Milestone Roadmap', icon: Compass, tag: 'Learning Timeline' },
    { title: 'Capstone Blueprint', icon: Code, tag: 'Portfolio Proof' },
    { title: 'Interview Intel', icon: HelpCircle, tag: 'Question Bank' },
    { title: 'Placement Blueprint', icon: Zap, tag: '30-60-90 Action' }
  ];

  // Auto-play interval effect
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setAutoPlayProgress(prev => {
          if (prev >= 100) {
            setCurrentSlide(curr => (curr + 1) % totalSlides);
            return 0;
          }
          return prev + 1.25; // advances ~100% in 5.6s
        });
      }, 70);
    } else {
      setAutoPlayProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setAutoPlayProgress(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/select
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleSlideChange((currentSlide + 1) % totalSlides);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleSlideChange((currentSlide - 1 + totalSlides) % totalSlides);
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(prev => !prev);
      } else if (e.key === 'p' || e.key === 'P') {
        setIsPlaying(prev => !prev);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isFullscreen]);

  // Mock analysis fallback with richer STAR rewrite sample
  const analysis = latestResumeAnalysis || {
    atsScore: 78,
    candidateName: 'Candidate Profile',
    targetRole: targetRoleObj.title,
    summary: `Your profile exhibits strong technical fundamentals for ${targetRoleObj.title}. To crack top-tier tech screening bars, replace passive duty descriptions with quantified STAR impact metrics, address high-priority tool deficits, and surface verifiable production artifacts.`,
    detectedSkills: targetRoleObj.coreSkills.slice(0, 4),
    missingSkills: targetRoleObj.coreSkills.slice(4, 6).concat(['Distributed Tracing', 'Cross-Encoder Reranking']),
    strengths: [
      'Strong presentation of engineering architectures & clean code practices.',
      'Explicit mention of core programming languages and frameworks.',
      'Clear project impact descriptions and demonstrated initiative.',
      'Well-formatted timeline adhering to standard ATS parsing parsers.'
    ],
    improvements: [
      {
        section: 'Experience / Projects',
        issue: 'Passive duty phrasing lacking business scale and quantifiable metrics.',
        suggestion: 'Quantify query latency reduction and user volume using the Google XYZ formula.',
        original: 'Responsible for building backend services and optimizing database queries for the team.',
        improved: 'Engineered high-throughput Go microservices with Redis caching, reducing p99 API query latency by 48% across 1.4M daily active users.'
      }
    ],
    experienceScore: 75,
    relevanceScore: 82
  };

  // Statistics
  const completedRoadmapCount = roadmapNodes.filter(n => n.completed).length;
  const roadmapProgressPercent = Math.round((completedRoadmapCount / Math.max(1, roadmapNodes.length)) * 100);
  const averageSkillReadiness = Math.round(
    skills.reduce((acc, curr) => acc + Math.min(100, (curr.candidateLevel / curr.marketRequirement) * 100), 0) /
    Math.max(1, skills.length)
  );

  // Copy presentation summary to clipboard
  const handleCopySummary = () => {
    const summaryText = `
🎯 EXECUTIVE CAREER BRIEF: ${targetRoleObj.title}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Category: ${targetRoleObj.category}
• Average Market Compensation: ${targetRoleObj.avgSalary}
• Demand Momentum: ${targetRoleObj.demandGrowth} (${targetRoleObj.hiringStats?.activeJobOpenings || '50,000+'} Active Openings)
• Skill Readiness Index: ${averageSkillReadiness}%
• Candidate ATS Match: ${analysis.atsScore}%

📊 SALARY TIERS:
  - Entry-Level: ${targetRoleObj.salaryTiers?.entry || '$90,000'}
  - Mid-Level: ${targetRoleObj.salaryTiers?.mid || '$135,000'}
  - Senior / Lead: ${targetRoleObj.salaryTiers?.senior || '$180,000'}
  - Staff / Principal: ${targetRoleObj.salaryTiers?.staff || '$240,000+'}

🛠️ CRITICAL TECH STACK & TOOLS:
  ${targetRoleObj.toolAdoption?.map(t => `- ${t.name} (${t.category}): ${t.adoptionRate}% Market Adoption [${t.momentum}]`).join('\n  ') || targetRoleObj.keyTools.join(', ')}

🚀 PRIORITY CAPSTONE ARCHITECTURE:
  ${targetRoleObj.capstoneBlueprint?.title || targetRoleObj.recommendedProjects[0]}
  Impact Rating: ${targetRoleObj.capstoneBlueprint?.recruiterImpactScore || 9.7}/10 | Est. Hours: ${targetRoleObj.capstoneBlueprint?.estimatedHours || '35 Hours'}

Generated by SkillPath.AI Executive Pitch Deck
    `.trim();

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2400);
  };

  // Toggle deliverable checkbox
  const toggleDeliverable = (key: string) => {
    setCompletedDeliverables(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Theme styling configurations
  const getThemeClasses = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          bg: 'bg-[#070611]',
          border: 'border-fuchsia-500/30',
          textGlow: 'text-fuchsia-400 drop-shadow-[0_0_12px_rgba(240,70,250,0.5)]',
          buttonActive: 'bg-fuchsia-600 text-white shadow-fuchsia-600/30',
          progressBar: 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500',
          card: 'bg-[#100c22]/80 border-purple-500/20 hover:border-fuchsia-500/40',
          badge: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30',
          accentText: 'text-fuchsia-400',
          accentFill: 'bg-fuchsia-500',
          chipActive: 'bg-fuchsia-600 text-white border-fuchsia-400',
          ring: 'ring-fuchsia-500/30'
        };
      case 'emerald':
        return {
          bg: 'bg-[#03110d]',
          border: 'border-emerald-500/30',
          textGlow: 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]',
          buttonActive: 'bg-emerald-600 text-white shadow-emerald-600/30',
          progressBar: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500',
          card: 'bg-[#081e18]/80 border-emerald-500/20 hover:border-emerald-400/40',
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          accentText: 'text-emerald-400',
          accentFill: 'bg-emerald-500',
          chipActive: 'bg-emerald-600 text-white border-emerald-400',
          ring: 'ring-emerald-500/30'
        };
      case 'amber':
        return {
          bg: 'bg-[#0f0a04]',
          border: 'border-amber-500/30',
          textGlow: 'text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]',
          buttonActive: 'bg-amber-600 text-white shadow-amber-600/30',
          progressBar: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400',
          card: 'bg-[#1c1308]/80 border-amber-500/20 hover:border-amber-500/40',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          accentText: 'text-amber-400',
          accentFill: 'bg-amber-500',
          chipActive: 'bg-amber-600 text-white border-amber-400',
          ring: 'ring-amber-500/30'
        };
      case 'indigo':
      default:
        return {
          bg: 'bg-[#080d1a]',
          border: 'border-indigo-500/25',
          textGlow: 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]',
          buttonActive: 'bg-indigo-600 text-white shadow-indigo-600/30',
          progressBar: 'bg-gradient-to-r from-indigo-500 via-indigo-400 to-cyan-400',
          card: 'bg-slate-900/60 border-slate-800 hover:border-indigo-500/40',
          badge: 'bg-indigo-500/10 text-cyan-300 border-indigo-500/20',
          accentText: 'text-cyan-400',
          accentFill: 'bg-indigo-500',
          chipActive: 'bg-indigo-600 text-white border-indigo-400',
          ring: 'ring-indigo-500/30'
        };
    }
  };

  const style = getThemeClasses();

  // Speaker notes content for each slide
  const speakerNotes = [
    {
      heading: 'Executive Market Overview',
      points: [
        'Highlight the massive YoY growth rate and high recruiter search velocity.',
        'Emphasize how moving from Mid to Senior tier yields an average +40% compensation lift.',
        'Note the strong remote availability (over 50%) across global hubs.'
      ]
    },
    {
      heading: 'ATS Parsing & Optimization Rules',
      points: [
        'Recruiters spend <6 seconds on initial screen; 75%+ of resumes are discarded by ATS regex filters.',
        'Replacing passive duty statements with STAR (Situation, Task, Action, Result) bullets immediately improves keyword match.',
        'Address all flagged red keywords before submitting cold applications.'
      ]
    },
    {
      heading: 'Strategic Skill Gap Remediation',
      points: [
        'Prioritize skills labeled Essential over Medium tooling preferences.',
        'Focus specifically on closing architecture and system design gaps first.',
        'A single production capstone project can close up to 3 major skill deltas simultaneously.'
      ]
    },
    {
      heading: 'Modern Tooling Ecosystem Dominance',
      points: [
        'Hiring managers evaluate tool versatility rather than rote syntax memorization.',
        'Highlight tools with >30% YoY adoption momentum on resumes and LinkedIn profiles.',
        'Emphasize automated containerization and CI/CD pipelines as non-negotiable fundamentals.'
      ]
    },
    {
      heading: 'Chronological Roadmap Velocity',
      points: [
        'Break learning into 3-4 week focused sprints rather than endless tutorial watching.',
        'Every phase must conclude with a verifiable, deployed deliverable in a public GitHub repo.',
        'Leverage curated documentation and official guides over outdated paid video courses.'
      ]
    },
    {
      heading: 'Portfolio & Capstone Proof of Work',
      points: [
        'Senior recruiters look for architectural depth: caching, rate limits, schema design, and load testing.',
        'Ensure the GitHub repository has an interactive architecture diagram and a live clickable demo.',
        'Include benchmark statistics (e.g. p99 response times) in the README.'
      ]
    },
    {
      heading: 'Interview Strategy & Technical Fluency',
      points: [
        'System design rounds test boundary condition management and trade-off justification.',
        'Always clarify non-functional requirements (QPS, storage, consistency) before proposing architecture.',
        'Use the AI Mentor Chat to run realistic mock interviews with instant rubric scoring.'
      ]
    },
    {
      heading: '30-60-90 Placement Action Strategy',
      points: [
        'Days 1-30: Polish ATS resume, close high-delta gaps, and optimize LinkedIn profile.',
        'Days 31-60: Build and deploy the high-appeal capstone project with comprehensive documentation.',
        'Days 61-90: Initiate referral outreach, conduct 3+ mock interviews per week, and negotiate offers.'
      ]
    }
  ];

  // Filtered skills list
  const filteredSkills = skills.filter(s => {
    if (skillCategoryFilter === 'all') return true;
    return s.category.toLowerCase().includes(skillCategoryFilter.toLowerCase());
  });

  // Filtered tools list
  const toolList = targetRoleObj.toolAdoption || [];
  const filteredTools = toolList.filter(t => {
    if (toolCategoryFilter === 'all') return true;
    return t.category.toLowerCase().includes(toolCategoryFilter.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 transition-all duration-300">
      
      {/* Top Deck Options Bar */}
      <div className="glass-panel p-5 rounded-3xl border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl bg-indigo-500/10 ${style.accentText}`}>
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Executive Career Pitch Deck
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Telemetry
                </span>
              </h1>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Interactive executive presentation for <span className={`${style.accentText} font-bold`}>{targetRoleObj.title}</span>. Navigate with arrow keys or dock below.
          </p>
        </div>

        {/* Deck Configurations & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          
          {/* Active Role Selector */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-2.5 py-1.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 font-bold hidden sm:inline">Role:</span>
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value as RoleId)}
              className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {CAREER_ROLES.map((r) => (
                <option key={r.id} value={r.id} className="bg-slate-900 text-white">{r.title}</option>
              ))}
            </select>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTheme('indigo')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${theme === 'indigo' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Midnight Indigo Theme"
            >
              Indigo
            </button>
            <button
              onClick={() => setTheme('cyberpunk')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${theme === 'cyberpunk' ? 'bg-fuchsia-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Cyberpunk Neon Theme"
            >
              Neon
            </button>
            <button
              onClick={() => setTheme('emerald')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${theme === 'emerald' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Emerald Matrix Theme"
            >
              Emerald
            </button>
            <button
              onClick={() => setTheme('amber')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${theme === 'amber' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              title="Sunset Amber Theme"
            >
              Amber
            </button>
          </div>

          {/* Speaker Notes Toggle */}
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              showSpeakerNotes 
                ? 'bg-indigo-600/20 text-cyan-300 border-indigo-500/40' 
                : 'text-slate-300 bg-slate-900 border-slate-800 hover:border-slate-700'
            }`}
            title="Toggle Speaker Insights Drawer"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Insights</span>
          </button>

          {/* Copy Summary */}
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            title="Copy Deck Summary to Clipboard"
          >
            {copiedSummary ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            title="Press 'F' for Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Full'}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Deck Container */}
      <div 
        className={`relative rounded-3xl overflow-hidden border ${style.border} ${style.bg} transition-all duration-500 shadow-2xl flex flex-col justify-between ${
          isFullscreen 
            ? 'fixed inset-0 z-50 p-6 sm:p-10 flex flex-col justify-between bg-[#04060c] overflow-y-auto' 
            : 'min-h-[580px] p-6 sm:p-8'
        }`}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-32 bg-gradient-to-b from-indigo-500/10 via-cyan-500/5 to-transparent pointer-events-none blur-3xl" />

        {/* AutoPlay Timer Progress Indicator */}
        {isPlaying && (
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-950/80 z-20">
            <div 
              className={`h-full ${style.progressBar} transition-all duration-75`}
              style={{ width: `${autoPlayProgress}%` }}
            />
          </div>
        )}

        {/* Slide Header Telemetry */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/60 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black ${style.accentText}`}>
              0{currentSlide + 1}
            </div>
            <div>
              <span className="text-[11px] uppercase font-black tracking-widest text-slate-400 block">
                {slideDeckInfo[currentSlide]?.tag}
              </span>
              <h2 className="text-sm sm:text-base font-black text-white">
                {slideDeckInfo[currentSlide]?.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full ${style.badge}`}>
              {targetRoleObj.category}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{targetRoleObj.demandGrowth} Growth</span>
            </div>
          </div>
        </div>

        {/* SLIDE CONTENT AREA */}
        <div className="relative z-10 flex-1 flex flex-col justify-center my-auto py-2">
          
          {/* SLIDE 1: Executive Career Strategy & Market Telemetry */}
          {currentSlide === 0 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2 max-w-3xl">
                <span className={`text-xs font-extrabold uppercase tracking-widest ${style.accentText}`}>
                  Executive Career Strategy & Compensation Intelligence
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  Target Track: <span className={style.textGlow}>{targetRoleObj.title}</span>
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {targetRoleObj.tagline} {targetRoleObj.description}
                </p>
              </div>

              {/* 4-Tier Salary Ladder with interactive selector */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Market Compensation Progression Ladder
                  </span>
                  <span className="text-[11px] text-slate-400">Select tier to inspect</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'entry', label: 'Entry-Level', exp: '0 - 2 Yrs Exp', val: targetRoleObj.salaryTiers?.entry || '$90,000' },
                    { id: 'mid', label: 'Mid-Level', exp: '3 - 5 Yrs Exp', val: targetRoleObj.salaryTiers?.mid || '$135,000' },
                    { id: 'senior', label: 'Senior / Lead', exp: '6 - 9 Yrs Exp', val: targetRoleObj.salaryTiers?.senior || '$180,000' },
                    { id: 'staff', label: 'Staff / Principal', exp: '10+ Yrs Exp', val: targetRoleObj.salaryTiers?.staff || '$240,000+' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setActiveSalaryTier(tier.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        activeSalaryTier === tier.id 
                          ? `${style.card} border-indigo-500/60 shadow-lg ${style.ring} ring-2` 
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold text-slate-400">{tier.label}</div>
                      <div className="text-lg sm:text-xl font-black text-white mt-1">{tier.val}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{tier.exp}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Metro Hubs & Industry Sectors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                {/* Hiring Hotspots */}
                <div className="md:col-span-7 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      Top Geographic Hiring Metros & Remote
                    </span>
                    <span className="text-[10px] text-slate-500">Median Tech Standard</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {targetRoleObj.hiringHotspots?.map((hub, hIdx) => (
                      <div key={hIdx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{hub.location}</div>
                          <div className="text-[10px] text-emerald-400 font-semibold">{hub.avgPay}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                            {hub.remoteRatio} Remote
                          </span>
                          <div className="text-[9px] text-slate-500 mt-0.5">Velocity: {hub.hiringVelocity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Hiring Metrics */}
                <div className="md:col-span-5 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-3">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-purple-400" />
                    Recruiter Telemetry & Hiring Velocity
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Openings</div>
                      <div className="text-sm sm:text-base font-black text-cyan-300">{targetRoleObj.hiringStats?.activeJobOpenings || '45k+'}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Time to Offer</div>
                      <div className="text-sm sm:text-base font-black text-emerald-400">{targetRoleObj.hiringStats?.avgDaysToOffer || 18} Days</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Acceptance</div>
                      <div className="text-sm sm:text-base font-black text-amber-400">{targetRoleObj.hiringStats?.offerAcceptanceRate || '85%'}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/50">
                    <span className="text-white font-bold">Key Demand Sectors: </span>
                    {targetRoleObj.industrySectors?.map(s => `${s.sector} (${s.share}%)`).join(' • ')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: ATS Diagnostics, Telemetry & Live STAR Rewrite */}
          {currentSlide === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${style.accentText}`}>
                    ATS Audit Diagnostics & Telemetry
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    ATS Audit Scorecard & Keyword Breakdown
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {analysis.summary}
                  </p>
                </div>

                {/* Score Dial */}
                <div className="flex items-center gap-4 shrink-0 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <div className="relative flex items-center justify-center w-20 h-20">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" className="text-slate-800" fill="transparent" />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeDasharray={201}
                        strokeDashoffset={201 - (201 * analysis.atsScore) / 100}
                        className={`${style.accentText} transition-all duration-1000 ease-out`}
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute text-xl font-black text-white">{analysis.atsScore}%</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Overall ATS Alignment</div>
                    <div className="text-[10px] text-slate-400">Target Benchmark: 80%+</div>
                    <div className="flex gap-2 mt-1.5 text-[10px]">
                      <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20">Exp: {analysis.experienceScore}%</span>
                      <span className="px-1.5 py-0.5 bg-cyan-500/10 text-cyan-300 rounded border border-cyan-500/20">Rel: {analysis.relevanceScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setAtsViewMode('strengths')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    atsViewMode === 'strengths' ? style.chipActive : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  Detected Highlights ({analysis.strengths.length})
                </button>
                <button
                  onClick={() => setAtsViewMode('keywords')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    atsViewMode === 'keywords' ? style.chipActive : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  Keyword Audit & Missing Filters
                </button>
                <button
                  onClick={() => setAtsViewMode('rewrite')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    atsViewMode === 'rewrite' ? style.chipActive : 'text-slate-400 hover:text-white bg-slate-900'
                  }`}
                >
                  Live STAR Resume Rewrite
                </button>
              </div>

              {/* Tab 1: Strengths */}
              {atsViewMode === 'strengths' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
                  {analysis.strengths.map((str, sIdx) => (
                    <div key={sIdx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-200 leading-relaxed">{str}</span>
                    </div>
                  ))}
                  <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/30 flex items-start gap-3 sm:col-span-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300">
                      <strong className="text-white">Pro Tip:</strong> Recruiters configure ATS filters with Boolean logic (e.g. <code>"{targetRoleObj.coreSkills[0]}" AND ("Docker" OR "Kubernetes")</code>). Embedding keywords naturally in quantified achievements passes automated screenings.
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 2: Missing Keywords */}
              {atsViewMode === 'keywords' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block">Detected Matching Keywords:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.detectedSkills.map((sk, idx) => (
                          <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-medium">
                            ✓ {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-950/10 border border-rose-500/20 space-y-2">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wide block">High-Priority Missing Keywords:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.missingSkills.map((sk, idx) => (
                          <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 font-medium">
                            + {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: STAR Rewrite */}
              {atsViewMode === 'rewrite' && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Before */}
                    <div className="p-4 rounded-xl bg-rose-950/10 border border-rose-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-rose-400 uppercase">Original (Weak Phrasing)</span>
                        <span className="text-[10px] text-slate-500">Low Recruiter Search Score</span>
                      </div>
                      <p className="text-xs text-slate-300 italic bg-slate-950/60 p-3 rounded-lg border border-slate-900 leading-relaxed">
                        "{analysis.improvements[0]?.original || 'Responsible for building backend services and optimizing database queries for the team.'}"
                      </p>
                      <div className="text-[11px] text-rose-300/80">
                        ⚠️ Lacks quantifiable business metrics, technologies used, and scale.
                      </div>
                    </div>

                    {/* After */}
                    <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-400 uppercase">Optimized STAR Bullet</span>
                        <span className="text-[10px] text-emerald-400 font-bold">Top 5% Screening Rank</span>
                      </div>
                      <p className="text-xs text-slate-100 font-medium bg-slate-950/80 p-3 rounded-lg border border-emerald-500/30 leading-relaxed">
                        "{analysis.improvements[0]?.improved || 'Engineered high-throughput microservices with Redis caching, reducing p99 API query latency by 48% across 1.4M daily active users.'}"
                      </p>
                      <div className="text-[11px] text-emerald-300/90 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        Quantified metric (-48% latency), volume (1.4M users), and core technologies.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SLIDE 3: Skill Gap Matrix & Competency Telemetry */}
          {currentSlide === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${style.accentText}`}>
                    Capability Gap Analytics & Benchmarks
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    Skill Proficiency Matrix Telemetry
                  </h2>
                  <p className="text-slate-400 text-xs">
                    Candidate proficiency (colored fill) vs Recruiter hiring target threshold (dashed cyan marker).
                  </p>
                </div>

                {/* Filter pills */}
                <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                  {['all', 'Core', 'Architecture', 'Tool'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSkillCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        skillCategoryFilter === cat ? style.chipActive : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {filteredSkills.slice(0, 6).map((skill, sIdx) => {
                  const hasGap = skill.candidateLevel < skill.marketRequirement;
                  const delta = skill.marketRequirement - skill.candidateLevel;
                  return (
                    <div key={sIdx} className={`${style.card} p-3.5 rounded-xl border space-y-2`}>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{skill.name}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                            {skill.importance}
                          </span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {skill.candidateLevel}% <span className="text-slate-600">/</span> {skill.marketRequirement}% req
                        </span>
                      </div>

                      {/* Bar Container */}
                      <div className="relative w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                        <div 
                          className={`h-full ${style.accentFill} rounded-full transition-all duration-700`}
                          style={{ width: `${skill.candidateLevel}%` }}
                        />
                        <div 
                          className="absolute top-0 h-full border-r-2 border-dashed border-cyan-300"
                          style={{ left: `${skill.marketRequirement}%` }}
                          title={`Recruiter Target: ${skill.marketRequirement}%`}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400 truncate max-w-[280px]">
                          💡 <span className="text-slate-300">{skill.recommendation}</span>
                        </span>
                        {hasGap ? (
                          <span className="text-amber-400 font-bold shrink-0">-{delta}% Gap</span>
                        ) : (
                          <span className="text-emerald-400 font-bold shrink-0">✓ Verified</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Readiness Bar */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Target Role Readiness: <strong className="text-white">{averageSkillReadiness}%</strong> across {skills.length} core competencies.
                </span>
                <span className="text-[11px] text-cyan-300 font-semibold">
                  {skills.filter(s => s.candidateLevel >= s.marketRequirement).length} / {skills.length} Benchmarks Met
                </span>
              </div>
            </div>
          )}

          {/* SLIDE 4: Modern Production Tech Stack & Tooling Adoption */}
          {currentSlide === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${style.accentText}`}>
                    Production Tooling Intelligence
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    Modern Production Tech Stack & Tool Adoption
                  </h2>
                  <p className="text-slate-400 text-xs">
                    Evaluated against global tech company hiring requirements and production cloud environments.
                  </p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                  {['all', 'Framework', 'Cloud', 'Database', 'CI/CD'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setToolCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        toolCategoryFilter === cat ? style.chipActive : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Adoption Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredTools.map((tool, tIdx) => (
                  <div key={tIdx} className={`${style.card} p-4 rounded-xl border space-y-2.5 flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{tool.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {tool.momentum}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                        {tool.category}
                      </span>
                      <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                        {tool.relevance}
                      </p>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-800/80">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Industry Adoption:</span>
                        <span className="text-cyan-300 font-bold">{tool.adoptionRate}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${style.accentFill} rounded-full`}
                          style={{ width: `${tool.adoptionRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 5: Milestone Roadmap Timeline */}
          {currentSlide === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <span className={`text-xs font-extrabold uppercase tracking-widest ${style.accentText}`}>
                  Chronological Execution Path
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Milestone Roadmap & Curated Resources
                </h2>
                <p className="text-slate-400 text-xs">
                  A 4-phase structured timeline mapped to industry hiring expectations. Currently <strong className="text-white">{roadmapProgressPercent}% completed</strong>.
                </p>
              </div>

              {/* Phase Switcher Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {roadmapNodes.map((node, nIdx) => (
                  <button
                    key={nIdx}
                    onClick={() => setActiveRoadmapPhase(nIdx)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      activeRoadmapPhase === nIdx 
                        ? `${style.card} border-indigo-500/50 shadow-md ${style.ring} ring-1` 
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-slate-400">Phase {node.phase}</span>
                      {node.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="text-xs font-bold text-white truncate mt-0.5">{node.title}</div>
                    <div className="text-[10px] text-slate-500">{node.duration}</div>
                  </button>
                ))}
              </div>

              {/* Active Phase Deep Dive */}
              {roadmapNodes[activeRoadmapPhase] && (
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                        Phase {roadmapNodes[activeRoadmapPhase].phase}: {roadmapNodes[activeRoadmapPhase].phaseTitle}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {roadmapNodes[activeRoadmapPhase].title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      Estimated Duration: {roadmapNodes[activeRoadmapPhase].duration}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {roadmapNodes[activeRoadmapPhase].description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Curated Resources */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        Curated Learning Resources:
                      </span>
                      <div className="space-y-2">
                        {roadmapNodes[activeRoadmapPhase].curatedResources.map((res, rIdx) => (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 flex items-center justify-between group transition-colors"
                          >
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                                {res.title}
                                <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                              </div>
                              <span className="text-[10px] text-slate-400">{res.type}</span>
                            </div>
                            {res.isFree && (
                              <span className="text-[9px] px-2 py-0.5 rounded font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                FREE
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Hands-on Project */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5 text-emerald-400" />
                        Phase Capstone Deliverables:
                      </span>
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                        <div className="text-xs font-extrabold text-white">
                          {roadmapNodes[activeRoadmapPhase].handsOnProject.title}
                        </div>
                        <div className="space-y-1.5">
                          {roadmapNodes[activeRoadmapPhase].handsOnProject.deliverables.map((del, dIdx) => {
                            const dKey = `${activeRoadmapPhase}-${dIdx}`;
                            const isDone = completedDeliverables[dKey];
                            return (
                              <button
                                key={dIdx}
                                onClick={() => toggleDeliverable(dKey)}
                                className="w-full flex items-center gap-2 text-left text-xs text-slate-300 hover:text-white transition-colors"
                              >
                                <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] transition-colors ${
                                  isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black' : 'border-slate-700 bg-slate-950'
                                }`}>
                                  {isDone && '✓'}
                                </div>
                                <span className={isDone ? 'line-through text-slate-500' : ''}>{del}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SLIDE 6: Real-World Capstone Architecture & Portfolio Proof */}
          {currentSlide === 5 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${style.accentText}`}>
                    Portfolio Architecture Blueprint
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    Real-World Capstone System Architecture
                  </h2>
                  <p className="text-slate-400 text-xs">
                    Build and showcase this production-grade architecture on GitHub to immediately validate your qualifications.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 font-bold block">Recruiter Appeal</span>
                    <span className="text-base sm:text-lg font-black text-amber-400 flex items-center gap-1 justify-center">
                      <Star className="w-4 h-4 fill-amber-400" />
                      {targetRoleObj.capstoneBlueprint?.recruiterImpactScore || 9.8} / 10
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-800" />
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 font-bold block">Est. Build Time</span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {targetRoleObj.capstoneBlueprint?.estimatedHours || '35 - 45 Hours'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Title Banner */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider">
                    Recommended Flagship Capstone
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {targetRoleObj.capstoneBlueprint?.title || targetRoleObj.recommendedProjects[0]}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {targetRoleObj.capstoneBlueprint?.tagline || 'Deploy to GitHub with CI/CD and benchmark documentation.'}
                  </p>
                </div>
                <span className="text-xs font-black uppercase px-3 py-1 rounded-xl bg-indigo-600 text-white shrink-0">
                  {targetRoleObj.capstoneBlueprint?.difficulty || 'Production Grade'}
                </span>
              </div>

              {/* 4-Tier Architecture Diagram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {targetRoleObj.capstoneBlueprint?.architecture?.map((arch, aIdx) => (
                  <div key={aIdx} className={`${style.card} p-3.5 rounded-xl border space-y-2 flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          Layer 0{aIdx + 1}
                        </span>
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">{arch.layer}</h4>
                      <div className="text-[11px] font-mono text-cyan-300 font-semibold mt-0.5">
                        {arch.tech}
                      </div>
                      <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                        {arch.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deliverables & README highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                    Core Technical Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {targetRoleObj.capstoneBlueprint?.keyDeliverables?.map((del, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                    GitHub README Presentation Checklist:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {targetRoleObj.capstoneBlueprint?.githubReadmeHighlights?.map((gh, gIdx) => (
                      <li key={gIdx} className="flex items-start gap-2">
                        <Star className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{gh}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 7: Technical Interview Intelligence & Recruiter Question Bank */}
          {currentSlide === 6 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${style.accentText}`}>
                    Interview Strategy & Question Bank
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    High-Frequency Technical Interview Intelligence
                  </h2>
                  <p className="text-slate-400 text-xs">
                    Evaluated against actual technical questions asked by Tier-1 engineering interview loops.
                  </p>
                </div>

                {/* Category Switcher */}
                <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                  {['System Design', 'Technical Deep Dive', 'Behavioral & Leadership'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveQuestionCategory(cat as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        activeQuestionCategory === cat ? style.chipActive : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Category Questions */}
              {(() => {
                const question = targetRoleObj.interviewQuestions?.find(q => q.type === activeQuestionCategory) || targetRoleObj.interviewQuestions?.[0];
                if (!question) return null;
                return (
                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/10 text-cyan-300 border border-indigo-500/20">
                          {question.type}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          Difficulty: <strong className="text-amber-400">{question.difficulty}</strong>
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">Recruiter Evaluation Rubric</span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm sm:text-base font-black text-white leading-snug">
                        "{question.question}"
                      </div>
                      <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
                        <strong className="text-cyan-300">Recruiter Focus: </strong>
                        {question.recruiterFocus}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">
                        Architectural Talking Points & Keywords to Mention:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {question.modelTalkingPoints.map((point, pIdx) => (
                          <div key={pIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          if (isFullscreen) setIsFullscreen(false);
                          setActiveTab('mentor');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold text-white ${style.buttonActive} flex items-center gap-1.5 hover:opacity-90 shadow-lg`}
                      >
                        <Bot className="w-4 h-4" />
                        Practice with AI Mentor Simulation <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* SLIDE 8: 30-60-90 Day Placement Action Blueprint */}
          {currentSlide === 7 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${style.accentText}`}>
                    Executive Placement Roadmap
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    30-60-90 Day Career Action Blueprint
                  </h2>
                  <p className="text-slate-400 text-xs">
                    A tactical timeline designed to secure top-tier offers and fast-track recruiter callbacks.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActivePlanTab('30')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activePlanTab === '30' ? style.chipActive : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Days 1-30
                  </button>
                  <button
                    onClick={() => setActivePlanTab('60')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activePlanTab === '60' ? style.chipActive : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Days 31-60
                  </button>
                  <button
                    onClick={() => setActivePlanTab('90')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activePlanTab === '90' ? style.chipActive : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Days 61-90
                  </button>
                </div>
              </div>

              {/* 30-60-90 Tabs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 30 Days */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  activePlanTab === '30' ? 'bg-slate-950 border-indigo-500/50 ring-1 ring-indigo-500/30 shadow-lg' : 'bg-slate-950/60 border-slate-800 opacity-70'
                } space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      Phase 01
                    </span>
                    <span className="text-xs font-bold text-white">Days 1 - 30</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white">ATS & Skill Remediation</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>Run ATS audit and optimize resume with STAR metrics.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>Close highest-delta skill gaps ({skills.slice(0, 2).map(s => s.name).join(', ')}).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>Complete Phase 1 roadmap foundations and push initial code to GitHub.</span>
                    </li>
                  </ul>
                </div>

                {/* 60 Days */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  activePlanTab === '60' ? 'bg-slate-950 border-indigo-500/50 ring-1 ring-indigo-500/30 shadow-lg' : 'bg-slate-950/60 border-slate-800 opacity-70'
                } space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      Phase 02
                    </span>
                    <span className="text-xs font-bold text-white">Days 31 - 60</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white">Flagship Capstone & Proof</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Build and containerize flagship capstone project with Docker & CI/CD.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Deploy live demo with benchmark performance metrics and architectural diagram.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Publish a technical engineering breakdown article on Dev.to / Medium.</span>
                    </li>
                  </ul>
                </div>

                {/* 90 Days */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  activePlanTab === '90' ? 'bg-slate-950 border-indigo-500/50 ring-1 ring-indigo-500/30 shadow-lg' : 'bg-slate-950/60 border-slate-800 opacity-70'
                } space-y-3`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Phase 03
                    </span>
                    <span className="text-xs font-bold text-white">Days 61 - 90</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white">Interviews & Offer Sprints</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Conduct 3+ mock interviews weekly using AI Mentor Chat.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Initiate warm recruiter outreach targeting high-growth companies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Benchmark initial offers against senior compensation bands and negotiate.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Direct Quick Launchpads */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-300 font-medium">
                  Fast-track your timeline with built-in SkillPath.AI intelligence engines:
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      if (isFullscreen) setIsFullscreen(false);
                      setActiveTab('analyzer');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 transition-colors"
                  >
                    Resume Analyzer
                  </button>
                  <button
                    onClick={() => {
                      if (isFullscreen) setIsFullscreen(false);
                      setActiveTab('skill-gap');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 transition-colors"
                  >
                    Skill Gap Matrix
                  </button>
                  <button
                    onClick={() => {
                      if (isFullscreen) setIsFullscreen(false);
                      setActiveTab('roadmap');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 transition-colors"
                  >
                    Interactive Roadmap
                  </button>
                  <button
                    onClick={() => {
                      if (isFullscreen) setIsFullscreen(false);
                      setActiveTab('mentor');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white ${style.buttonActive} transition-all shadow-md`}
                  >
                    Start AI Mentor Chat
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Presenter Speaker Notes Drawer */}
        {showSpeakerNotes && (
          <div className="relative z-10 mt-4 p-4 rounded-2xl bg-slate-950/95 border border-indigo-500/30 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Presenter Deep Insights: {speakerNotes[currentSlide]?.heading}
              </span>
              <button 
                onClick={() => setShowSpeakerNotes(false)}
                className="text-[10px] text-slate-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
              {speakerNotes[currentSlide]?.points.map((pt, pIdx) => (
                <li key={pIdx} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 leading-relaxed">
                  • {pt}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BOTTOM SLIDE CONTROL & NAVIGATION DOCK */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-800/80 space-y-4">
          
          {/* Slide Quick Jump Thumbnails Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {slideDeckInfo.map((s, idx) => {
              const IconComponent = s.icon;
              const isActive = currentSlide === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    isActive 
                      ? `${style.chipActive} shadow-md` 
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                  }`}
                  title={`Jump to ${s.title}`}
                >
                  <IconComponent className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* AutoPlay & Reset */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  isPlaying 
                    ? 'bg-amber-600/10 text-amber-400 border-amber-500/30' 
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-slate-300" />
                    <span>Auto-Play</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleSlideChange(0)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title="Reset to Slide 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <span className="text-[11px] text-slate-500 font-medium hidden md:inline">
                Shortcuts: [← / → / Space] [F = Fullscreen]
              </span>
            </div>

            {/* Slide Indicator Progress */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === idx 
                      ? `w-8 ${style.accentFill}` 
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Jump to Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSlideChange((currentSlide - 1 + totalSlides) % totalSlides)}
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <button
                onClick={() => handleSlideChange((currentSlide + 1) % totalSlides)}
                className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white ${style.buttonActive} transition-all shadow-lg`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
