
export enum DogSize {
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
  GIANT = 'Giant'
}

export enum Generation {
  PUREBRED = 'Purebred',
  F1 = 'F1 (First Generation)',
  F1B = 'F1B (Backcross)',
  F2 = 'F2 (Second Generation)',
  NOT_APPLICABLE = 'N/A'
}

export interface DogProfile {
  breed: string;
  size: DogSize;
  generation: Generation;
}

export interface KVPair {
  k: string;
  v: string;
}

export interface ReportEntry {
  label: string;
  value?: string;
  items?: string[];
  pairs?: KVPair[];
}

export interface ReportSection {
  title: string;
  entries: ReportEntry[];
}

export interface SubGuide {
  title: string;
  description: string;
  sections: ReportSection[];
  conclusion?: string;
}

export interface FinalIntelligenceReport {
  title: string;
  introduction: string;
  basicInfo: SubGuide;
  behaviorInfo: SubGuide;
  healthInfo: SubGuide;
  nutritionInfo: SubGuide;
  preventativeCare: SubGuide;
  conclusion: string;
}
