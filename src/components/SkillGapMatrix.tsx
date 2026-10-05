import React, { useState } from 'react';
import { RoleId, SkillItem, ActiveTab } from '../types';
import { CAREER_ROLES, MOCK_SKILL_GAP_DATA } from '../data/rolesData';
import { 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Rocket, 
  ArrowRight,
  Sparkles,
  Sliders,
  Brain
} from 'lucide-react';

interface SkillGapMatrixProps {
  selectedRoleId: RoleId;
  setSelectedRoleId: (roleId: RoleId) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const SkillGapMatrix: React.FC<SkillGapMatrixProps> = ({
  selectedRoleId,
  setSelectedRoleId,
  setActiveTab
}) => {
  const targetRoleObj = CAREER_ROLES.find(r => r.id === selectedRoleId) || CAREER_ROLES[0];
  const [skills, setSkills] = useState<SkillItem[]>(MOCK_SKILL_GAP_DATA[selectedRoleId] || []);

  // Update skills state when selectedRoleId changes
  React.useEffect(() => {
    setSkills(MOCK_SKILL_GAP_DATA[selectedRoleId] || []);
  }, [selectedRoleId]);

  const handleSliderChange = (index: number, newLevel: number) => {
    const updated = [...skills];
    updated[index].candidateLevel = newLevel;
    setSkills(updated);
  };

  // Calculate overall target readiness score
  const overallReadiness = Math.round(
    skills.reduce((acc, curr) => acc + Math.min(100, (curr.candidateLevel / curr.marketRequirement) * 100), 0) /
    Math.max(1, skills.length)
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Skill-Gap Diagnostic Matrix</h1>
          </div>
          <p className="text-xs text-slate-300">
            Compare candidate proficiency against real market demands for <span className="text-indigo-300 font-semibold">{targetRoleObj.title}</span>.
          </p>
        </div>

        {/* Overall Market Readiness Meter */}
        <div className="flex items-center gap-6 glass-card p-4 rounded-2xl border-slate-800">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Readiness</span>
            <span className="text-2xl font-extrabold text-white">{overallReadiness}%</span>
          </div>
          <div className="w-28 bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, overallReadiness)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Target Role Selector Bar */}
      <div className="flex items-center justify-between overflow-x-auto gap-2 p-2 glass-panel rounded-2xl no-scrollbar">
        {CAREER_ROLES.map((role) => {
          const isActive = role.id === selectedRoleId;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {role.title}
            </button>
          );
        })}
      </div>

      {/* Skill Gap Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, idx) => {
          const gap = Math.max(0, skill.marketRequirement - skill.candidateLevel);
          const isMet = skill.candidateLevel >= skill.marketRequirement;

          return (
            <div
              key={idx}
              className="glass-card p-6 rounded-3xl space-y-5 border-slate-800 hover:border-indigo-500/40 transition-all"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {skill.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        skill.importance === 'Essential'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : skill.importance === 'High'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      }`}
                    >
                      {skill.importance} Priority
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{skill.name}</h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block">Gap Status</span>
                  {isMet ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Met
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-400">
                      -{gap}% Gap
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Proficiency Comparison Sliders */}
              <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-900">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                      Candidate Level:
                    </span>
                    <span className="font-bold text-indigo-300">{skill.candidateLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.candidateLevel}
                    onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Baseline Market Demand:</span>
                    <span className="font-bold text-cyan-400">{skill.marketRequirement}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-lg overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-lg"
                      style={{ width: `${skill.marketRequirement}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Targeted Recommendation Box */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                  Targeted Learning Action:
                </span>
                <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                  {skill.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Projects Banner */}
      <div className="glass-panel p-8 rounded-3xl space-y-6 border-indigo-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Rocket className="w-5 h-5 text-cyan-400" />
              Recommended Capstone Projects for {targetRoleObj.title}
            </h3>
            <p className="text-xs text-slate-400">
              Build these 3 projects to prove proficiency for missing skills on your resume.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Open Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {targetRoleObj.recommendedProjects.map((proj, pIdx) => (
            <div key={pIdx} className="glass-card p-4 rounded-2xl space-y-2 border-slate-800">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Project #{pIdx + 1}</span>
              <h4 className="text-xs font-bold text-white leading-snug">{proj}</h4>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
