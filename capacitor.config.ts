import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.skillpath.ai',
  appName: 'SkillPath AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
