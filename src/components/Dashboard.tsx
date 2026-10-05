import React from 'react';
import { RoleId, ResumeAnalysisResult, ActiveTab } from '../types';
import { CAREER_ROLES, MOCK_SKILL_GAP_DATA, MOCK_ROADMAPS } from '../data/rolesData';
import { 
  LayoutDashboard, 
  Target, 
  FileText, 
  Compass, 
  Bot, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight,
  Zap,
  Sparkles,
  Presentation
} from 'lucide-react';

interface DashboardProps {
  selectedRoleId: RoleId;
  setSelectedRoleId: (roleId: RoleId) => void;
  setActiveTab: (tab: ActiveTab) => void;
  latestResumeAnalysis: ResumeAnalysisResult | null;
}

export const Dashboard: React.FC<DashboardProps> = ({
  selectedRoleId,
  setSelectedRoleId,
  setActiveTab,
  latestResumeAnalysis
}) => {
  const targetRoleObj = CAREER_ROLES.find(r => r.id === selectedRoleId) || CAREER_ROLES[0];
  const skills = MOCK_SKILL_GAP_DATA[selectedRoleId] || [];
  const roadmapNodes = MOCK_ROADMAPS[selectedRoleId] || [];

  const completedRoadmapCount = roadmapNodes.filter(n => n.completed).length;
  const roadmapProgressPercent = Math.round((completedRoadmapCount / Math.max(1, roadmapNodes.length)) * 100);

  const averageSkillReadiness = Math.round(
    skills.reduce((acc, curr) => acc + Math.min(100, (curr.candidateLevel / curr.marketRequirement) * 100), 0) /
    Math.max(1, skills.length)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Career Intelligence Dashboard</h1>
          </div>
          <p className="text-xs text-slate-300">
            Real-time telemetry on your target path: <span className="text-cyan-300 font-semibold">{targetRoleObj.title}</span>
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Target Role Track:</span>
          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value as RoleId)}
            className="bg-slate-900 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
          >
            {CAREER_ROLES.map((r) => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
          
          <button
            onClick={() => setActiveTab('presentation')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.01]"
          >
            <Presentation className="w-4 h-4 text-cyan-300" />
            <span>Launch Pitch Deck</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Readiness Meter */}
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Skill Readiness</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{averageSkillReadiness}%</div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${averageSkillReadiness}%` }} />
          </div>
        </div>

        {/* ATS Score */}
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Latest ATS Score</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {latestResumeAnalysis ? `${latestResumeAnalysis.atsScore}%` : '78%'}
          </div>
          <p className="text-[11px] text-slate-400">
            {latestResumeAnalysis ? `Role: ${latestResumeAnalysis.targetRole}` : 'Standard Sample Resume'}
          </p>
        </div>

        {/* Roadmap Milestones */}
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Roadmap Progress</span>
            <Compass className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {completedRoadmapCount} / {roadmapNodes.length}
          </div>
          <p className="text-[11px] text-slate-400">
            {roadmapProgressPercent}% Milestones Achieved
          </p>
        </div>

        {/* AI Mentor sessions */}
        <div className="glass-panel p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">AI Mentor Status</span>
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">Active</div>
          <p className="text-[11px] text-slate-400">Ready for Mock Interviews</p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Skill Matrix Quick Overview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                Target Skill Gap Breakdown
              </h2>
              <button
                onClick={() => setActiveTab('skill-gap')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                Detailed View <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="glass-card p-3.5 rounded-xl space-y-2 border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-200">{skill.name}</span>
                    <span className="text-slate-400 font-mono">
                      {skill.candidateLevel}% / {skill.marketRequirement}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${skill.candidateLevel}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Next Steps & Recommended Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl space-y-4 border-indigo-500/30">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Recommended Priority Next Actions
            </h2>

            <div className="space-y-3">
              <div
                onClick={() => setActiveTab('analyzer')}
                className="glass-card p-4 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                  <span>1. Run ATS Resume Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-slate-300">
                  Audit bullet points for {targetRoleObj.title} keywords.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('roadmap')}
                className="glass-card p-4 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-purple-400">
                  <span>2. Complete Phase 3 Capstone</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-slate-300">
                  Build: "{targetRoleObj.recommendedProjects[0]}".
                </p>
              </div>

              <div
                onClick={() => setActiveTab('mentor')}
                className="glass-card p-4 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>3. Practice Ollama Mock Interview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-slate-300">
                  Ask Ollama AI mentor for technical interview scenario.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('presentation')}
                className="glass-card p-4 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                  <span>4. Present Strategy Slide Deck</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-slate-300">
                  Review or export your career strategy in interactive Pitch Deck mode.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
