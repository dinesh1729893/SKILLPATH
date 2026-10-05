import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, Heart, Github, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070a11] text-slate-400 py-12 px-4 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white">
                SkillPath<span className="text-cyan-400">.AI</span>
              </span>
              <p className="text-xs text-slate-400">AI Career Intelligence Engine</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold">
            <button onClick={() => setActiveTab('landing')} className="hover:text-white transition-colors">Overview</button>
            <button onClick={() => setActiveTab('analyzer')} className="hover:text-white transition-colors">ATS Resume Parser</button>
            <button onClick={() => setActiveTab('skill-gap')} className="hover:text-white transition-colors">Skill Gap Matrix</button>
            <button onClick={() => setActiveTab('roadmap')} className="hover:text-white transition-colors">Career Roadmaps</button>
            <button onClick={() => setActiveTab('mentor')} className="hover:text-white transition-colors">AI Mentor</button>
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">Dashboard</button>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Launch Ready • V1.0</span>
          </div>

        </div>

        {/* Stack Tech Badges */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-slate-500 font-medium">Built with Stack:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">React 18</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">TypeScript</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">Tailwind CSS</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">Ollama AI</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">Vercel Ready</span>
          </div>

          <p className="text-slate-500 text-center">
            SkillPath AI © {new Date().getFullYear()} • Premium AI Career Platform
          </p>
        </div>

      </div>
    </footer>
  );
};
