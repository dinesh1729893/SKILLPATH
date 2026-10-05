import React from 'react';
import { ActiveTab, RoleId } from '../types';
import { CAREER_ROLES } from '../data/rolesData';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Target, 
  Compass, 
  Bot, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Zap,
  Users,
  Award,
  Cpu,
  Code,
  BarChart3,
  BrainCircuit,
  Layout,
  Star,
  Presentation
} from 'lucide-react';

interface LandingSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedRoleId: (roleId: RoleId) => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({
  setActiveTab,
  setSelectedRoleId
}) => {

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Code': return Code;
      case 'BarChart3': return BarChart3;
      case 'BrainCircuit': return BrainCircuit;
      case 'Layout': return Layout;
      case 'ShieldCheck': return ShieldCheck;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 lg:pt-16 lg:pb-20 text-center space-y-8 overflow-hidden">
        
        {/* Subtle Background Glow Spheres */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Product Launch Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Launch Ready V1 • Powered by Ollama AI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>

        {/* Headline */}
        <div className="max-w-4xl mx-auto space-y-4 px-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Stop Guessing Your Career Path. <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">Navigate It With Precision AI.</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Diagnose resume ATS gaps, generate personalized interactive roadmaps, and level up with 24/7 Ollama career mentoring tailored for top tech roles.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveTab('analyzer')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transition-all"
          >
            <FileText className="w-4 h-4 text-cyan-300" />
            Analyze Resume Free
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setActiveTab('roadmap')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 glass-card hover:bg-slate-800/80 hover:text-white border border-slate-700/80 transition-all"
          >
            <Compass className="w-4 h-4 text-indigo-400" />
            Explore Career Roadmaps
          </button>

          <button
            onClick={() => setActiveTab('presentation')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 glass-card hover:bg-slate-800/80 hover:text-white border border-slate-700/80 transition-all"
          >
            <Presentation className="w-4 h-4 text-cyan-300 animate-pulse" />
            Interactive Pitch Deck
          </button>
        </div>

        {/* Live Feature Highlights Bar */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-4">
          {[
            { label: 'ATS Target Precision', val: '98.4%', icon: Target },
            { label: 'Avg Callback Boost', val: '4.2x', icon: TrendingUp },
            { label: 'V1 Core Roles', val: '6 Paths', icon: Award },
            { label: 'AI Mentor Readiness', val: '24/7 Live', icon: Bot },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="glass-panel p-4 rounded-2xl text-center space-y-1">
                <Icon className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <div className="text-2xl font-extrabold text-white">{stat.val}</div>
                <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6 Core V1 Career Paths Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Choose Your V1 Target Role
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Select a high-demand tech track to inspect skills, salary potential, and step-by-step career progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_ROLES.map((role) => {
            const Icon = getRoleIcon(role.iconName);
            return (
              <div
                key={role.id}
                onClick={() => {
                  setSelectedRoleId(role.id);
                  setActiveTab('skill-gap');
                }}
                className="glass-card p-6 rounded-2xl cursor-pointer group flex flex-col justify-between space-y-6 transition-all hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {role.demandGrowth}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                      {role.category}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-2">
                      {role.tagline}
                    </p>
                  </div>

                  {/* Core Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {role.coreSkills.slice(0, 4).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {role.coreSkills.length > 4 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        +{role.coreSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Avg Compensation</span>
                    <span className="font-bold text-slate-200">{role.avgSalary}</span>
                  </div>
                  <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Inspect Gaps <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Value Matrix */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Product Capability</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Built Like a Next-Gen Career OS
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Everything you need to benchmark your skills, optimize your ATS resume, and master technical interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: '1. Intelligent ATS Resume Parser',
              desc: 'Upload or paste your resume to receive multi-factor scoring across experience, keywords, and structural clarity with instant bullet point enhancements.',
              tab: 'analyzer' as ActiveTab,
              icon: FileText,
              color: 'text-indigo-400',
              accentBg: 'bg-indigo-500/10'
            },
            {
              title: '2. Market Skill-Gap Diagnostic',
              desc: 'Compare your verified proficiency level against baseline requirements for 6 top tech tracks to spot missing tools before recruiters do.',
              tab: 'skill-gap' as ActiveTab,
              icon: Target,
              color: 'text-cyan-400',
              accentBg: 'bg-cyan-500/10'
            },
            {
              title: '3. Interactive Node-Based Roadmaps',
              desc: 'Follow clear step-by-step learning milestones from foundational code to production projects with free curated learning resources.',
              tab: 'roadmap' as ActiveTab,
              icon: Compass,
              color: 'text-purple-400',
              accentBg: 'bg-purple-500/10'
            },
            {
              title: '4. 24/7 Ollama AI Mentor',
              desc: 'Get instant mock interview prep, salary negotiation guidance, and custom project feedback trained on Ollama models.',
              tab: 'mentor' as ActiveTab,
              icon: Bot,
              color: 'text-emerald-400',
              accentBg: 'bg-emerald-500/10'
            }
          ].map((feature, fIdx) => {
            const Icon = feature.icon;
            return (
              <div
                key={fIdx}
                onClick={() => setActiveTab(feature.tab)}
                className="glass-panel p-8 rounded-3xl cursor-pointer group hover:border-indigo-500/50 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-4 rounded-2xl ${feature.accentBg} ${feature.color} border border-white/5`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-white flex items-center gap-1">
                    Launch Feature <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Social Proof / Student Mentorship Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-panel p-8 rounded-3xl border border-indigo-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left z-10">
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <h3 className="text-xl font-bold text-white">Ready for your DoraHacks Demo & College Showcase</h3>
            <p className="text-xs text-slate-300 max-w-lg">
              Designed for real college students, bootcamps, and software engineering candidates targeting top tech offers.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('analyzer')}
            className="z-10 shrink-0 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/25 transition-all"
          >
            Start Free Diagnostic
          </button>
        </div>
      </section>

    </div>
  );
};
