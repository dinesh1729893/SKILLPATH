import React from 'react';
import { ActiveTab, RoleId } from '../types';
import { CAREER_ROLES } from '../data/rolesData';

import { 
  Sparkles, 
  FileText, 
  Target, 
  Compass, 
  Bot, 
  LayoutDashboard, 
  Key,
  ChevronDown,
  MessageSquare,
  Presentation
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedRoleId: RoleId;
  setSelectedRoleId: (roleId: RoleId) => void;
  openApiKeyModal: () => void;
  onToggleChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedRoleId,
  setSelectedRoleId,
  openApiKeyModal,
  onToggleChat
}) => {

  const currentRole = CAREER_ROLES.find(r => r.id === selectedRoleId) || CAREER_ROLES[0];

  const navItems = [
    { id: 'landing' as ActiveTab, label: 'Overview', icon: Sparkles },
    { id: 'analyzer' as ActiveTab, label: 'Resume ATS Parser', icon: FileText },
    { id: 'skill-gap' as ActiveTab, label: 'Skill-Gap Matrix', icon: Target },
    { id: 'roadmap' as ActiveTab, label: 'Career Roadmap', icon: Compass },
    { id: 'mentor' as ActiveTab, label: 'AI Mentor', icon: Bot },
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'presentation' as ActiveTab, label: 'Career Pitch Deck', icon: Presentation },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                SkillPath<span className="text-cyan-400">.AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                MVP V1
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">AI Career Intelligence Engine</p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Role Switcher & API Key */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Target Role Selector Dropdown */}
          <div className="relative group">
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value as RoleId)}
              className="appearance-none bg-slate-900 text-slate-200 text-xs font-semibold pl-3 pr-8 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer hover:bg-slate-800/80 transition-colors"
            >
              {CAREER_ROLES.map((role) => (
                <option key={role.id} value={role.id} className="bg-slate-900 text-slate-200">
                  {role.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* AI Chat Drawer Button */}
          <button
            onClick={onToggleChat}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            title="Open Chat Sandbox"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Mobile Tab Navigation bar */}
      <div className="flex md:hidden items-center justify-between overflow-x-auto gap-1 mt-2 pt-2 border-t border-slate-800/60 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
