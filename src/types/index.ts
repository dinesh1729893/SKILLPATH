export type RoleId = 
  | 'ai-ml-engineer'
  | 'software-developer'
  | 'data-analyst'
  | 'data-scientist'
  | 'web-developer'
  | 'cybersecurity-engineer';

export interface SalaryTiers {
  entry: string;
  mid: string;
  senior: string;
  staff: string;
}

export interface HiringHotspot {
  location: string;
  avgPay: string;
  hiringVelocity: string;
  remoteRatio: string;
}

export interface IndustrySectorDemand {
  sector: string;
  share: number;
  growth: string;
}

export interface ToolAdoptionItem {
  name: string;
  category: 'Framework' | 'Cloud / Infra' | 'Database / Vector' | 'CI/CD & MLOps' | 'Security / Tooling';
  adoptionRate: number;
  momentum: string;
  relevance: string;
}

export interface InterviewQuestionItem {
  type: 'System Design' | 'Technical Deep Dive' | 'Behavioral & Leadership';
  difficulty: 'Intermediate' | 'Advanced' | 'Expert';
  question: string;
  recruiterFocus: string;
  modelTalkingPoints: string[];
}

export interface CapstoneBlueprint {
  title: string;
  tagline: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Production Grade';
  estimatedHours: string;
  recruiterImpactScore: number;
  architecture: {
    layer: string;
    tech: string;
    details: string;
  }[];
  keyDeliverables: string[];
  githubReadmeHighlights: string[];
}

export interface CareerRole {
  id: RoleId;
  title: string;
  category: string;
  tagline: string;
  avgSalary: string;
  demandGrowth: string;
  iconName: string;
  description: string;
  coreSkills: string[];
  keyTools: string[];
  recommendedProjects: string[];
  salaryTiers?: SalaryTiers;
  hiringHotspots?: HiringHotspot[];
  industrySectors?: IndustrySectorDemand[];
  toolAdoption?: ToolAdoptionItem[];
  interviewQuestions?: InterviewQuestionItem[];
  capstoneBlueprint?: CapstoneBlueprint;
  hiringStats?: {
    avgDaysToOffer: number;
    activeJobOpenings: string;
    offerAcceptanceRate: string;
  };
}

export interface SkillItem {
  name: string;
  category: 'Core' | 'Tool' | 'Architecture' | 'Soft Skill';
  importance: 'Essential' | 'High' | 'Medium';
  candidateLevel: number; // 0 to 100
  marketRequirement: number; // 0 to 100
  recommendation: string;
}

export interface ResumeAnalysisResult {
  atsScore: number;
  candidateName: string;
  targetRole: string;
  summary: string;
  detectedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: {
    section: string;
    issue: string;
    suggestion: string;
    original?: string;
    improved?: string;
  }[];
  experienceScore: number; // 0-100
  relevanceScore: number; // 0-100
}

export interface RoadmapNode {
  id: string;
  phase: number;
  phaseTitle: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  skillsLearned: string[];
  curatedResources: {
    title: string;
    type: 'Video' | 'Documentation' | 'Course' | 'Project Prompt';
    url: string;
    isFree: boolean;
  }[];
  handsOnProject: {
    title: string;
    deliverables: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  };
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionableLinks?: { text: string; tab: string }[];
}

export type ActiveTab = 'landing' | 'analyzer' | 'skill-gap' | 'roadmap' | 'mentor' | 'dashboard' | 'ollama-chat' | 'presentation';
