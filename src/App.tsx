import React, { useState } from 'react';
import { ActiveTab, RoleId, ResumeAnalysisResult } from './types';
import { Navbar } from './components/Navbar';
import { ApiKeyModal } from './components/ApiKeyModal';
import { LandingSection } from './components/LandingSection';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { SkillGapMatrix } from './components/SkillGapMatrix';
import { CareerRoadmap } from './components/CareerRoadmap';
import { MentorChat } from './components/MentorChat';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { OllamaChat } from './components/OllamaChat';
import { PresentationView } from './components/PresentationView';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>('ai-ml-engineer');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [latestAnalysis, setLatestAnalysis] = useState<ResumeAnalysisResult | null>(null);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      
      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedRoleId={selectedRoleId}
          setSelectedRoleId={setSelectedRoleId}
          openApiKeyModal={() => setIsApiKeyModalOpen(true)}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
        />

        {/* Main View Area */}
        <main className="px-4 lg:px-8 pt-8">
          {activeTab === 'landing' && (
            <LandingSection
              setActiveTab={setActiveTab}
              setSelectedRoleId={setSelectedRoleId}
            />
          )}

          {activeTab === 'analyzer' && (
            <ResumeAnalyzer
              selectedRoleId={selectedRoleId}
              setSelectedRoleId={setSelectedRoleId}
              onAnalysisComplete={(result) => setLatestAnalysis(result)}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'skill-gap' && (
            <SkillGapMatrix
              selectedRoleId={selectedRoleId}
              setSelectedRoleId={setSelectedRoleId}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'roadmap' && (
            <CareerRoadmap
              selectedRoleId={selectedRoleId}
              setSelectedRoleId={setSelectedRoleId}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'mentor' && (
            <MentorChat
              selectedRoleId={selectedRoleId}
              setSelectedRoleId={setSelectedRoleId}
              openApiKeyModal={() => setIsApiKeyModalOpen(true)}
              setActiveTab={setActiveTab}
            />
          )}



          {activeTab === 'dashboard' && (
            <Dashboard
              selectedRoleId={selectedRoleId}
              setSelectedRoleId={setSelectedRoleId}
              setActiveTab={setActiveTab}
              latestResumeAnalysis={latestAnalysis}
            />
          )}

          {activeTab === 'presentation' && (
            <PresentationView
              selectedRoleId={selectedRoleId}
              setSelectedRoleId={setSelectedRoleId}
              latestResumeAnalysis={latestAnalysis}
              setActiveTab={setActiveTab}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Ollama Config Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      {/* AI Chat Drawer Overlay */}
      <OllamaChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        openApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

    </div>
  );
}

export default App;
