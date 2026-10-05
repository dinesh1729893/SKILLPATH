import React, { useState } from 'react';
import {
  getOllamaApiKey,
  setOllamaApiKey,
  getOllamaUrl,
  setOllamaUrl,
  getOllamaModel,
  setOllamaModel
} from '../services/aiService';
import { Key, X, Check, ShieldCheck, Sparkles, Server } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [ollamaKey, setOllamaKey] = useState(getOllamaApiKey());
  const [ollamaUrlVal, setOllamaUrlVal] = useState(getOllamaUrl());
  const [ollamaModelVal, setOllamaModelVal] = useState(getOllamaModel());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setOllamaApiKey(ollamaKey);
    setOllamaUrl(ollamaUrlVal);
    setOllamaModel(ollamaModelVal);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setOllamaKey('');
    setOllamaUrlVal('https://ollama.com/api');
    setOllamaModelVal('gemma4:31b');
    setOllamaApiKey('');
    setOllamaUrl('');
    setOllamaModel('');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const hasAnyKey = !!ollamaKey;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0f172a] rounded-2xl border border-slate-800 p-6 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Ollama AI Configuration
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Active
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">Configure credentials and endpoints for your Ollama engine.</p>
          </div>
        </div>

        {/* Info Alert */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 mb-5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <p className="font-semibold text-slate-200 mb-1">
              Ollama Cloud & Custom Endpoints:
            </p>
            Integrate cloud hosted Ollama APIs or connect to local instances. Standard security uses bearer token headers.
          </div>
        </div>

        {/* OLLAMA FORM FIELDS */}
        <div className="space-y-4 mb-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Ollama API Key (Bearer Token):
            </label>
            <input
              type="password"
              value={ollamaKey}
              onChange={(e) => setOllamaKey(e.target.value)}
              placeholder="Leave blank if local without auth"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ollama API URL:
              </label>
              <input
                type="text"
                value={ollamaUrlVal}
                onChange={(e) => setOllamaUrlVal(e.target.value)}
                placeholder="http://localhost:11434"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ollama Model:
              </label>
              <input
                type="text"
                value={ollamaModelVal}
                onChange={(e) => setOllamaModelVal(e.target.value)}
                placeholder="gemma4:31b"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-mono"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] text-slate-500 font-medium leading-relaxed">
              Cloud Endpoint: <code className="text-indigo-400">https://ollama.com/api</code><br />
              Local Endpoint: <code className="text-indigo-400">http://localhost:11434</code>
            </span>
            {hasAnyKey && (
              <button
                onClick={handleClear}
                className="text-xs text-rose-400 hover:text-rose-300 hover:underline font-semibold"
              >
                Clear settings
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300 animate-pulse" />
                Settings Saved!
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" />
                Save & Connect
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
