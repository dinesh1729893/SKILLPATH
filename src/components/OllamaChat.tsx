import React, { useState, useRef, useEffect } from 'react';
import {
  chatWithOllamaDirect,
  getOllamaApiKey,
  getOllamaUrl,
  getOllamaModel
} from '../services/aiService';
import {
  Bot,
  User,
  Send,
  RefreshCw,
  Sliders,
  X,
  Trash2,
  Copy,
  Check,
  Cpu,
  Server,
  ShieldCheck,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface OllamaChatProps {
  isOpen: boolean;
  onClose: () => void;
  openApiKeyModal: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const OllamaChat: React.FC<OllamaChatProps> = ({ isOpen, onClose, openApiKeyModal }) => {
  const hasKey = !!getOllamaApiKey();
  const activeModel = getOllamaModel();
  const endpointUrl = getOllamaUrl();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `### 🤖 Welcome to the AI Chat Playground!
I am connected to the **Ollama** engine.

**Engine Details:**
- **Model:** \`${activeModel}\`
- **Endpoint:** \`${endpointUrl}\`

You can click the **Settings** icon at the top of this drawer to customize **System Prompts**, **Temperature**, or **Model** presets.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful, expert engineering AI assistant. Output precise, formatted markdown code blocks for implementation queries.');
  const [temperature, setTemperature] = useState(0.7);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const apiHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })).concat({ role: 'user', content: text });

      const reply = await chatWithOllamaDirect(apiHistory, systemPrompt, temperature);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat playground error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `❌ **Connection Error**: Unable to get response from the LLM provider. Please check if your api server is running and key details are correct.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `🧹 **Chat Cleared.** Chat session has been reset. What would you like to build or discuss now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const copyToClipboard = (text: string, indexKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(indexKey);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const SUGGESTIONS = [
    "Write a TypeScript sliding window rate-limiter class",
    "Explain sliding window vs token bucket",
    "Design a secure Postgres schema with auth",
    "Analyze Dockerfile security pitfalls"
  ];

  return (
    <>
      {/* Backdrop Backdrop Overlay */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fadeIn" 
      />

      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-md z-50 bg-[#0b0f19] border-l border-slate-800/80 flex flex-col shadow-2xl animate-slideIn">
        
        {/* Header Section */}
        <div className="p-4 bg-slate-950 border-b border-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                AI Chat Sandbox
                <span className={`w-1.5 h-1.5 rounded-full ${hasKey ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">
              Ollama Engine • {activeModel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg border transition-colors ${
                showSettings 
                  ? 'bg-indigo-600/10 border-indigo-500/30 text-indigo-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Toggle settings panel"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable Settings Drawer inside the drawer */}
        {showSettings && (
          <div className="p-4 bg-slate-950 border-b border-slate-900/80 space-y-4 animate-fadeIn">
            {/* Active Model & Provider Settings */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 pb-2 border-b border-slate-900">
              <span className="font-semibold uppercase tracking-wider">Engine Configuration</span>
              <button
                onClick={openApiKeyModal}
                className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline"
              >
                Change Provider
              </button>
            </div>

            {/* Model Presets */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Target Endpoint</span>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 font-mono text-[10px] truncate">
                <Server className="w-3 h-3 text-slate-400" />
                {endpointUrl}
              </div>
            </div>

            {/* System Prompt TextArea */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">System Instructions</label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="System instruction overrides..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 leading-relaxed resize-none font-sans"
              />
            </div>

            {/* Temperature input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Temperature</span>
                <span className="font-mono text-indigo-400">{temperature.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Chat History View Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            const indexKey = `drawer-msg-${idx}`;
            return (
              <div key={idx} className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Profile Icon */}
                <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  isUser ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-700 text-indigo-400'
                }`}>
                  {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2.5 relative group ${
                  isUser 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20' 
                    : 'glass-card border-slate-800 text-slate-200 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-wrap font-sans space-y-1.5">
                    {msg.content.split('\n').map((line, lIdx) => {
                      const isHeader = line.startsWith('#');
                      let lineStyle = "my-0.5";
                      if (isHeader) {
                        const level = line.match(/^#+/)?.[0].length || 1;
                        lineStyle = level === 1 
                          ? 'font-bold text-white text-xs mt-2 mb-1' 
                          : 'font-semibold text-slate-100 text-[11px] mt-1.5 mb-1';
                      }
                      
                      return (
                        <p key={lIdx} className={lineStyle}>
                          {line}
                        </p>
                      );
                    })}
                  </div>

                  {/* Copy Button */}
                  {!isUser && (
                    <button
                      onClick={() => copyToClipboard(msg.content, indexKey)}
                      className="absolute top-2 right-2 p-1 rounded-md bg-slate-950/80 border border-slate-800/80 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy content"
                    >
                      {copiedIndex === indexKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}

                  <span className={`text-[8px] block text-right font-mono mt-1 ${isUser ? 'text-indigo-200' : 'text-slate-500'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-slate-900 border border-slate-700 text-indigo-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="glass-card p-3 rounded-2xl text-[11px] text-slate-400 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                Thinking...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions preset chips */}
        <div className="p-2.5 bg-slate-950/40 border-t border-slate-900 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider shrink-0 pl-1">
            Presets:
          </span>
          {SUGGESTIONS.map((sPrompt, sIdx) => (
            <button
              key={sIdx}
              onClick={() => handleSend(sPrompt)}
              className="text-[9px] px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/40 shrink-0 transition-colors flex items-center gap-1 font-semibold"
            >
              {sPrompt.substring(0, 22)}...
              <ChevronRight className="w-2.5 h-2.5 text-slate-500" />
            </button>
          ))}
        </div>

        {/* Input Text Box Footer */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-850 flex items-center justify-between gap-2.5">
          <button
            onClick={clearChat}
            className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-rose-400 transition-all"
            title="Reset Chat Session"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Sandbox..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
          />
          
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white shadow-lg shadow-indigo-600/30 transition-all shrink-0 font-bold text-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </>
  );
};
