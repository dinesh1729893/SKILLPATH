import React, { useState, useRef, useEffect } from 'react';
import { RoleId, ChatMessage, ActiveTab } from '../types';
import { CAREER_ROLES } from '../data/rolesData';
import { askAIMentor, getOllamaApiKey } from '../services/aiService';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RefreshCw, 
  MessageSquare, 
  Zap,
  CheckCircle2,
  Key
} from 'lucide-react';

interface MentorChatProps {
  selectedRoleId: RoleId;
  setSelectedRoleId: (roleId: RoleId) => void;
  openApiKeyModal: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MentorChat: React.FC<MentorChatProps> = ({
  selectedRoleId,
  setSelectedRoleId,
  openApiKeyModal,
  setActiveTab
}) => {
  const targetRoleObj = CAREER_ROLES.find(r => r.id === selectedRoleId) || CAREER_ROLES[0];
  const apiKey = getOllamaApiKey();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am your **SkillPath AI Career Mentor**.\n\nI am configured specifically for **${targetRoleObj.title}** candidates. You can ask me to:\n- Conduct a mock technical interview question\n- Audit your target keywords & ATS resume bullets\n- Provide expected compensation ranges & negotiation tactics\n- Suggest architecture for standout portfolio projects\n\nHow can I help accelerate your path today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    try {
      const responseText = await askAIMentor(query, selectedRoleId);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const QUICK_PROMPTS = [
    `Mock technical interview question for ${targetRoleObj.title}`,
    `How can I improve my resume for ${targetRoleObj.title}?`,
    `What are current salary expectations for ${targetRoleObj.title}?`,
    `What portfolio projects stand out to engineering leads?`
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 border border-emerald-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              AI Career Mentor
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {apiKey ? 'Live Ollama' : 'Smart Offline AI'}
              </span>
            </h1>
            <p className="text-xs text-slate-300">
              Active Context: <span className="text-cyan-300 font-semibold">{targetRoleObj.title} Track</span>
            </p>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <select
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value as RoleId)}
            className="bg-slate-900 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
          >
            {CAREER_ROLES.map((r) => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
          {!apiKey && (
            <button
              onClick={openApiKeyModal}
              className="text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1"
            >
              <Key className="w-3.5 h-3.5" />
              Add Key
            </button>
          )}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="glass-panel rounded-3xl overflow-hidden border-slate-800 flex flex-col h-[580px]">
        
        {/* Messages History Window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md ${
                    isUser ? 'bg-indigo-600' : 'bg-slate-900 border border-slate-700 text-emerald-400'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20'
                      : 'glass-card border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {/* Process basic markdown linebreaks and bold text */}
                  <div className="whitespace-pre-wrap">
                    {msg.text.split('\n').map((line, lIdx) => (
                      <p key={lIdx} className={line.startsWith('#') ? 'font-bold text-white text-sm my-1' : 'my-0.5'}>
                        {line}
                      </p>
                    ))}
                  </div>

                  <span className={`text-[10px] block text-right font-mono ${isUser ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Loader */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="glass-card p-4 rounded-2xl text-xs text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                AI Mentor is formulating answer...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-900 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 pl-2">
            Suggested Prompts:
          </span>
          {QUICK_PROMPTS.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/40 shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Text Box */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask AI Mentor anything about ${targetRoleObj.title}...`}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isTyping}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white shadow-lg shadow-indigo-600/30 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
