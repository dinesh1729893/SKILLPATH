import React, { useState } from 'react';
import { RoleId, RoadmapNode, ActiveTab } from '../types';
import { CAREER_ROLES, MOCK_ROADMAPS } from '../data/rolesData';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  BookOpen, 
  Video, 
  Code2, 
  Clock, 
  Share2, 
  ChevronRight, 
  Award,
  Sparkles,
  Download
} from 'lucide-react';

interface CareerRoadmapProps {
  selectedRoleId: RoleId;
  setSelectedRoleId: (roleId: RoleId) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const CareerRoadmap: React.FC<CareerRoadmapProps> = ({
  selectedRoleId,
  setSelectedRoleId,
  setActiveTab
}) => {
  const targetRoleObj = CAREER_ROLES.find(r => r.id === selectedRoleId) || CAREER_ROLES[0];
  const [nodes, setNodes] = useState<RoadmapNode[]>(MOCK_ROADMAPS[selectedRoleId] || []);
  const [activeNode, setActiveNode] = useState<RoadmapNode | null>(nodes[0] || null);

  React.useEffect(() => {
    const newNodes = MOCK_ROADMAPS[selectedRoleId] || [];
    setNodes(newNodes);
    setActiveNode(newNodes[0] || null);
  }, [selectedRoleId]);

  const toggleNodeCompletion = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, completed: !n.completed } : n));
  };

  const completedCount = nodes.filter(n => n.completed).length;
  const progressPercent = Math.round((completedCount / Math.max(1, nodes.length)) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
              <Compass className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              {targetRoleObj.title} Career Roadmap
            </h1>
          </div>
          <p className="text-xs text-slate-300">
            Step-by-step interactive milestones from foundations to production-ready engineer.
          </p>
        </div>

        {/* Progress gauge */}
        <div className="flex items-center gap-4 glass-card p-4 rounded-2xl border-slate-800">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Roadmap Progress</span>
            <span className="text-lg font-bold text-white">{completedCount} of {nodes.length} Milestones ({progressPercent}%)</span>
          </div>
          <div className="w-20 bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Role Switcher */}
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

      {/* Main Roadmap Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Milestone Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Learning Stages (Phases 1 - 4)
          </h2>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-800">
            {nodes.map((node, index) => {
              const isSelected = activeNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`relative z-10 glass-card p-5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-indigo-500/80 bg-slate-900/90 shadow-xl shadow-indigo-600/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={(e) => toggleNodeCompletion(node.id, e)}
                        className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {node.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/10" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                        )}
                      </button>

                      <div>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                          Phase {node.phase}: {node.phaseTitle}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-0.5">{node.title}</h3>
                        <p className="text-xs text-slate-400 mt-1">{node.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{node.duration}</span>
                    </div>
                  </div>

                  {/* Skills tags preview */}
                  <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-slate-800/60">
                    {node.skillsLearned.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Node Detailed Content Drawer */}
        <div className="lg:col-span-7">
          {activeNode ? (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 sticky top-24 border-indigo-500/30">
              
              {/* Node Header */}
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                    Phase {activeNode.phase} Milestone Details
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">{activeNode.title}</h2>
                  <p className="text-xs text-slate-300 mt-1">{activeNode.description}</p>
                </div>

                <button
                  onClick={(e) => toggleNodeCompletion(activeNode.id, e)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all ${
                    activeNode.completed
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {activeNode.completed ? 'Milestone Achieved' : 'Mark as Complete'}
                </button>
              </div>

              {/* Free Curated Learning Resources */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Free Curated Learning Resources ({activeNode.curatedResources.length})
                </h3>

                <div className="space-y-2">
                  {activeNode.curatedResources.map((res, rIdx) => (
                    <a
                      key={rIdx}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-2xl glass-card hover:border-indigo-500/40 transition-all text-xs group"
                    >
                      <div className="flex items-center gap-3">
                        {res.type === 'Video' ? (
                          <Video className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : res.type === 'Course' ? (
                          <Award className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                            {res.title}
                          </span>
                          <span className="text-[10px] text-slate-400 block">{res.type} • Free Access</span>
                        </div>
                      </div>

                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Hands-On Capstone Project Prompt */}
              <div className="glass-card p-5 rounded-2xl space-y-3 border-indigo-500/20 bg-indigo-950/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                    Required Hands-On Capstone Project
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {activeNode.handsOnProject.difficulty} Level
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{activeNode.handsOnProject.title}</h4>

                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400 block">Expected Deliverables:</span>
                  <ul className="space-y-1 text-xs text-slate-300 pl-4 list-disc">
                    {activeNode.handsOnProject.deliverables.map((del, dIdx) => (
                      <li key={dIdx}>{del}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Step CTA */}
              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  onClick={() => setActiveTab('mentor')}
                  className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Ask AI Mentor about this Milestone <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
};
