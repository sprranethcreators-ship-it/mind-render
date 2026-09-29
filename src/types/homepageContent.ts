export interface HeroContent {
  kicker: string;
  masthead: string;
  philosophyQuote: string;
  supportingParagraph: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  scrollIndicatorText: string;
}

export interface TriadCardContent {
  step: string;
  quote: string;
  explanation: string;
}

export interface PhilosophyContent {
  sectionTag: string;
  headline: string;
  rhythmWords: string[];
  narrativeParagraph: string;
  triadCards: TriadCardContent[];
}

export interface TopicCardContent {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  gradientBackground: string;
}

export interface TopicsSectionContent {
  sectionTag: string;
  headline: string;
  description: string;
  topics: TopicCardContent[];
  viewAllButtonText: string;
}

export interface MindInMotionStepContent {
  step: number;
  label: string;
  tagline: string;
  simpleExplanation: string;
  lifeLesson: string;
  dailyPractice: string;
  accent: string;
}

export interface MindInMotionContent {
  sectionTag: string;
  headline: string;
  description: string;
  loopNotice: string;
  steps: MindInMotionStepContent[];
}

export interface BooksSectionContent {
  sectionTag: string;
  headline: string;
  italicQuote: string;
  description: string;
  sampleButtonText: string;
  buyButtonText: string;
  viewStoreButtonText: string;
}

export interface PillarCardContent {
  title: string;
  subtitle: string;
  desc: string;
}

export interface WhySectionContent {
  sectionTag: string;
  headline: string;
  description: string;
  pillars: PillarCardContent[];
}

export interface EssaysSectionContent {
  sectionTag: string;
  headline: string;
  description: string;
  viewAllButtonText: string;
}

export interface FinalCtaContent {
  sectionTag: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  italicParagraph: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export interface HomepageContent {
  hero: HeroContent;
  philosophy: PhilosophyContent;
  topicsSection: TopicsSectionContent;
  mindInMotion: MindInMotionContent;
  booksSection: BooksSectionContent;
  whySection: WhySectionContent;
  essaysSection: EssaysSectionContent;
  finalCta: FinalCtaContent;
  lastUpdated: string;
}
