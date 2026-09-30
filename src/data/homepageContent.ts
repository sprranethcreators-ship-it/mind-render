import { HomepageContent } from '../types/homepageContent';

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  hero: {
    kicker: "THE ARCHITECTURE OF CONSCIOUSNESS",
    masthead: "MIND RENDER",
    philosophyQuote: "Your mind is the interface through which you experience your reality.",
    supportingParagraph: "Explore how your thoughts work. Learn to guide your attention. Build quiet inner strength, shift old beliefs, and read original books that help you see your world with new clarity.",
    primaryCtaLabel: "Explore Your Mind",
    primaryCtaLink: "#editorial-transition",
    secondaryCtaLabel: "Explore The Books",
    secondaryCtaLink: "/books",
    scrollIndicatorText: "Scroll to Descend"
  },
  philosophy: {
    sectionTag: "THE NATURE OF AWARENESS",
    headline: "THE MIND IS NOT STATIC.",
    rhythmWords: [
      "It is constantly observing,",
      "interpreting,",
      "remembering,",
      "predicting,",
      "and choosing."
    ],
    narrativeParagraph: "Your life is not happening to you by chance. It is unfolding through the lens of your own attention. When you understand how this inner system works, you regain the power to guide it with calm intention.",
    triadCards: [
      {
        step: "Step 01 • What You Notice",
        quote: "Your thoughts shape what you notice.",
        explanation: "Your brain receives millions of signals every second, but you only see a tiny fraction. What you think about most teaches your mind what to look for and what to ignore."
      },
      {
        step: "Step 02 • What You Believe",
        quote: "What you notice shapes what you believe.",
        explanation: "A belief is simply an idea you have seen repeated until you stop questioning it. When you change what you pay attention to, new evidence appears, and old limits soften."
      },
      {
        step: "Step 03 • How You Live",
        quote: "What you believe shapes how you act.",
        explanation: "You do not take actions by pure willpower alone. Your actions flow naturally from how you see yourself. When your inner state is settled and clear, right action feels natural."
      }
    ]
  },
  topicsSection: {
    sectionTag: "FOUNDATIONS OF THOUGHT",
    headline: "Explore Your Mind",
    description: "Six foundational pillars to help you understand how your thoughts work, quiet inner doubts, and see your world clearly.",
    topics: [
      {
        id: "law-of-attraction",
        slug: "law-of-attraction",
        title: "Law of Attraction",
        tagline: "Resonance & What You Draw Closer",
        description: "You do not attract what you simply wish for. You experience what matches your calm, inner state of being.",
        accent: "#D4AF37",
        gradientBackground: "radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.22) 0%, rgba(20, 24, 38, 0.85) 60%, #0D0F18 100%)"
      },
      {
        id: "manifestation",
        slug: "manifestation",
        title: "Manifestation",
        tagline: "From Inner Vision to Daily Life",
        description: "The clear process of turning an inner dream into calm, steady, and purposeful physical action.",
        accent: "#818CF8",
        gradientBackground: "radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.25) 0%, rgba(18, 20, 36, 0.85) 60%, #0D0F18 100%)"
      },
      {
        id: "subconscious-mind",
        slug: "subconscious-mind",
        title: "Subconscious Mind",
        tagline: "The Hidden Engine of Daily Habits",
        description: "The quiet automatic habits and memories that guide 95% of your decisions without you even noticing.",
        accent: "#A78BFA",
        gradientBackground: "radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.22) 0%, rgba(22, 18, 38, 0.85) 60%, #0D0F18 100%)"
      },
      {
        id: "visualization",
        slug: "visualization",
        title: "Visualization",
        tagline: "The Theater of the Mind",
        description: "Practicing a moment in your imagination with real feeling, so your brain and nervous system are ready to live it.",
        accent: "#F472B6",
        gradientBackground: "radial-gradient(circle at 80% 20%, rgba(244, 114, 182, 0.2) 0%, rgba(28, 16, 28, 0.85) 60%, #0D0F18 100%)"
      },
      {
        id: "focus-and-attention",
        slug: "focus-and-attention",
        title: "Focus & Attention",
        tagline: "Your Most Precious Daily Energy",
        description: "Where you choose to rest your eyes and attention becomes your life. Learn to protect it from constant noise.",
        accent: "#34D399",
        gradientBackground: "radial-gradient(circle at 80% 20%, rgba(52, 211, 153, 0.2) 0%, rgba(14, 28, 24, 0.85) 60%, #0D0F18 100%)"
      },
      {
        id: "habits-and-discipline",
        slug: "habits-and-discipline",
        title: "Habits & Discipline",
        tagline: "Small Daily Steps That Build Destiny",
        description: "True discipline is not harsh punishment. It is quietly choosing what you want most over what you want right now.",
        accent: "#FBBF24",
        gradientBackground: "radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.2) 0%, rgba(26, 22, 14, 0.85) 60%, #0D0F18 100%)"
      }
    ],
    viewAllButtonText: "View All 11 Pillars of Consciousness"
  },
  mindInMotion: {
    sectionTag: "SIGNATURE VISUAL SYSTEM",
    headline: "The Mind in Motion",
    description: "See how a single thought turns into your daily reality. Click any step below to explore how the chain works in simple everyday terms.",
    loopNotice: "Your Results naturally loop back into new Thoughts, creating a continuous cycle of growth.",
    steps: [
      {
        step: 1,
        label: "Thoughts",
        tagline: "The raw seeds in your mind",
        simpleExplanation: "Thousands of random ideas drift through your head every day. Most are just old memories or habits. You do not have to believe every thought that appears.",
        lifeLesson: "You are the quiet listener behind your thoughts, not the thoughts themselves.",
        dailyPractice: "Notice your thoughts without judging them. Let them float past like clouds in the sky.",
        accent: "#818CF8"
      },
      {
        step: 2,
        label: "Attention",
        tagline: "Your mental flashlight",
        simpleExplanation: "Attention is your most powerful gift. You cannot stop every thought from showing up, but you choose what to shine your light on.",
        lifeLesson: "Whatever you give your attention to becomes bigger in your life.",
        dailyPractice: "Turn your attention away from things that drain you, and place it gently on what brings peace.",
        accent: "#D4AF37"
      },
      {
        step: 3,
        label: "Beliefs",
        tagline: "Thoughts practiced until they feel true",
        simpleExplanation: "A belief is simply a thought you have thought again and again until your brain decided it was a permanent fact.",
        lifeLesson: "When you question old limits, new possibilities open up naturally.",
        dailyPractice: "Ask yourself: 'Is this thought actually true, or is it just an old habit I learned long ago?'",
        accent: "#60A5FA"
      },
      {
        step: 4,
        label: "Emotions",
        tagline: "Your inner compass",
        simpleExplanation: "Emotions are signals from your body. They let you know whether the thought you are holding feels right, loving, and true to who you are.",
        lifeLesson: "Feelings are not mistakes. They are quiet guides helping you find your way back to calm.",
        dailyPractice: "When you feel upset, take three slow breaths instead of reacting in a rush.",
        accent: "#F43F5E"
      },
      {
        step: 5,
        label: "Actions",
        tagline: "Moving with purpose",
        simpleExplanation: "When your thoughts and feelings are clear, you don't need to force yourself to act. Action happens naturally and with confidence.",
        lifeLesson: "Calm certainty creates steady action. Frantic worry creates burnout.",
        dailyPractice: "Take one small, honest step today toward what matters most to you.",
        accent: "#F59E0B"
      },
      {
        step: 6,
        label: "Habits",
        tagline: "Your daily autopilot",
        simpleExplanation: "When you repeat an action, your brain saves energy by making it automatic. Good habits carry you forward even on days when motivation is low.",
        lifeLesson: "Your life changes when your daily routine changes.",
        dailyPractice: "Make good choices easy by keeping simple daily routines.",
        accent: "#10B981"
      },
      {
        step: 7,
        label: "Results",
        tagline: "The outer mirror of your inner state",
        simpleExplanation: "The outcomes in your career, relationships, and health are the natural harvest of the thoughts and habits you have practiced over time.",
        lifeLesson: "Change the root inside, and the fruit on the branches will take care of itself.",
        dailyPractice: "Be patient with your growth. Steady inner changes always show up in your outer world.",
        accent: "#A78BFA"
      }
    ]
  },
  booksSection: {
    sectionTag: "THE PUBLISHING HOUSE",
    headline: "WORDS THAT CHANGE PERSPECTIVE",
    italicQuote: "Books written to help you pause, reflect, understand, and see differently.",
    description: "Original digital books written by the author's father. Created as thoughtful guides to help you understand your mind, quiet inner chatter, and live with clarity.",
    sampleButtonText: "Free Sample",
    buyButtonText: "Get Book Now",
    viewStoreButtonText: "Visit Complete Digital Bookstore"
  },
  whySection: {
    sectionTag: "THE FOUR PILLARS",
    headline: "Why MIND RENDER",
    description: "We leave behind loud internet promises and fake guarantees. We offer clear books, quiet tools, and honest wisdom to help you master your thoughts and shape your own life.",
    pillars: [
      {
        title: "Understand.",
        subtitle: "Clear, Honest Ideas",
        desc: "Learn how your thoughts and attention really work, without confusing jargon or magical promises."
      },
      {
        title: "Reflect.",
        subtitle: "Quiet Self-Awareness",
        desc: "Pause to notice old habits and silent worries, so you can choose which thoughts to keep and which to release."
      },
      {
        title: "Practice.",
        subtitle: "Simple Daily Focus",
        desc: "Use short, calming exercises to steady your mind, protect your energy, and build strong daily habits."
      },
      {
        title: "Transform.",
        subtitle: "Lasting Inner Peace",
        desc: "Stop chasing after quick fixes. Build quiet confidence from within, and let your outer life reflect your calm."
      }
    ]
  },
  essaysSection: {
    sectionTag: "EDITORIAL ESSAYS",
    headline: "IDEAS TO HELP YOU SEE DIFFERENTLY",
    description: "Clear, thoughtful essays on attention, daily habits, and learning how your mind constructs your experience.",
    viewAllButtonText: "Explore All Editorial Inquiries"
  },
  finalCta: {
    sectionTag: "THE QUIET SHIFT",
    headlineLine1: "YOUR INNER WORLD SHAPES",
    headlineLine2: "THE WAY YOU EXPERIENCE",
    headlineLine3: "THE OUTER WORLD.",
    italicParagraph: "You do not need to fight with your life. When your mind is calm and your thoughts are clear, everything around you begins to change.",
    primaryButtonText: "Begin Your Journey",
    secondaryButtonText: "Try Mind Tools"
  },
  lastUpdated: new Date().toISOString()
};
