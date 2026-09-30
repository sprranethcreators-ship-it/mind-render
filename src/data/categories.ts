export interface MindCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  scientificPerspective: string;
  philosophicalPerspective: string;
  icon: string;
  accentColor: string;
  topicsCovered: string[];
}

export const MIND_CATEGORIES: MindCategory[] = [
  {
    id: "law-of-attraction",
    name: "Law of Attraction",
    slug: "law-of-attraction",
    tagline: "Resonance, Expectation, and Experiential Alignment",
    description: "An intellectual inquiry into how our dominant internal mental states harmonize with the external circumstances we gravitate toward.",
    scientificPerspective: "Understood neuroscientifically through attentional bias, self-fulfilling prophecies, and the Reticular Activating System filtering external stimuli that match current internal priorities.",
    philosophicalPerspective: "The metaphysical proposition that like attracts like; that conscious awareness and expectation attune the subjective experience of reality.",
    icon: "Compass",
    accentColor: "#D4AF37",
    topicsCovered: ["Vibrational Harmony", "Attentional Gravity", "Expectation Bias", "Environmental Congruence"]
  },
  {
    id: "manifestation",
    name: "Manifestation",
    slug: "manifestation",
    tagline: "From Internal Blueprint to Physical Realization",
    description: "The deliberate process of translating an inner vision, feeling state, and mental clarity into concrete external actions and tangible outcomes.",
    scientificPerspective: "Goal-directed neurobiology, neuroplastic reorganization, and targeted behavioral execution preceded by structured mental simulation.",
    philosophicalPerspective: "The intentional crystallization of potential into form through sustained focus, emotional coherence, and non-resistant surrender.",
    icon: "Sparkles",
    accentColor: "#6366F1",
    topicsCovered: ["Deliberate Creation", "Mental Blueprints", "Action Alignment", "Receptivity"]
  },
  {
    id: "mindset",
    name: "Mindset & Mental Paradigms",
    slug: "mindset",
    tagline: "The Operating System of Your Reality",
    description: "The foundational framework of implicit assumptions and psychological orientations that dictate how one interprets challenges, potential, and self-worth.",
    scientificPerspective: "Extensively studied by Carol Dweck and cognitive psychologists: growth vs. fixed mindsets, neuroplasticity, and locus of control.",
    philosophicalPerspective: "The lens through which reality is filtered. Change the lens, and the observed universe shifts in meaning.",
    icon: "Cpu",
    accentColor: "#3B82F6",
    topicsCovered: ["Growth Mindset", "Cognitive Flexibility", "Locus of Control", "Abundance Paradigms"]
  },
  {
    id: "subconscious-mind",
    name: "Subconscious Mind",
    slug: "subconscious-mind",
    tagline: "The Silent Engine of 95% of Daily Behavior",
    description: "The vast reservoir of automated neurological scripts, autonomic responses, conditioned memories, and baseline beliefs operating beneath awareness.",
    scientificPerspective: "Dual-process theory (System 1 automaticity vs. System 2 deliberate control), basal ganglia habit loops, and implicit memory networks.",
    philosophicalPerspective: "The fertile soil of the psyche: whatever seed is planted with strong emotional resonance will inevitably sprout into conscious behavior.",
    icon: "Layers",
    accentColor: "#8B5CF6",
    topicsCovered: ["Subconscious Reprogramming", "Hypnagogic States", "Childhood Conditioning", "Implicit Beliefs"]
  },
  {
    id: "visualization",
    name: "Visualization & Mental Rehearsal",
    slug: "visualization",
    tagline: "The Architecture of Internal Cinema",
    description: "The systematic discipline of cultivating vivid, sensory-rich mental imagery to condition neural pathways before physical execution.",
    scientificPerspective: "Functional equivalence in motor cortex: mental simulation activates the same neural motor areas and visual cortices as actual physical practice.",
    philosophicalPerspective: "Entering the state of the wish already fulfilled (Neville Goddard, Hermes Trismegistus) to unify observer and outcome.",
    icon: "Eye",
    accentColor: "#EC4899",
    topicsCovered: ["Sensory Immersion", "First-Person Rehearsal", "Feeling Tone", "Motor Priming"]
  },
  {
    id: "affirmations",
    name: "Affirmations & Self-Talk",
    slug: "affirmations",
    tagline: "Linguistic Restructuring of Thought Loops",
    description: "The deliberate choice of internal language and declarations to dislodge habitual cognitive distortions and reinforce empowering self-concepts.",
    scientificPerspective: "Self-affirmation theory (Steele, 1988) shown in fMRI studies to activate reward pathways (ventral striatum and medial prefrontal cortex).",
    philosophicalPerspective: "The generative power of the Logos: your spoken and unspoken words define the boundaries of your lived identity.",
    icon: "MessageSquare",
    accentColor: "#F59E0B",
    topicsCovered: ["Linguistic Reframing", "Autosuggestion", "Present-Tense Cadence", "Emotional Congruence"]
  },
  {
    id: "focus-and-attention",
    name: "Focus & Attention",
    slug: "focus-and-attention",
    tagline: "The Scarcest Currency of Human Consciousness",
    description: "Where attention goes, neural energy flows. Mastering the discipline of voluntary attentional allocation amidst relentless digital fragmentation.",
    scientificPerspective: "Prefrontal cortex executive control, dopamine regulation, flow states, and cognitive load attenuation.",
    philosophicalPerspective: "Attention is the purest act of love and creation; what you pay attention to becomes your ultimate reality.",
    icon: "Target",
    accentColor: "#10B981",
    topicsCovered: ["Deep Work", "Attentional Hygiene", "Reticular Activation", "Distraction Immunity"]
  },
  {
    id: "habits-and-discipline",
    name: "Habits & Discipline",
    slug: "habits-and-discipline",
    tagline: "Automating Excellence Through Daily Rituals",
    description: "The architecture of small, incremental behaviors compounded over time to generate massive psychological and physical transformation.",
    scientificPerspective: "The neurological loop of Cue, Craving, Response, and Reward governed by dopamine signaling and striatal consolidation.",
    philosophicalPerspective: "Discipline is freedom. It is the conscious sacrifice of immediate micro-gratification for macro-fulfillment.",
    icon: "Repeat",
    accentColor: "#6EE7B7",
    topicsCovered: ["Habit Stacking", "Identity-Based Change", "Friction Engineering", "Compounding Rituals"]
  },
  {
    id: "emotional-awareness",
    name: "Emotional Awareness",
    slug: "emotional-awareness",
    tagline: "Navigating Your Internal Navigational Guidance",
    description: "Understanding emotions not as obstacles to suppress, but as biochemical feedback signaling psychological alignment or dissonance.",
    scientificPerspective: "Affective neuroscience (Panksepp, Feldman Barrett's Theory of Constructed Emotion) and interoceptive awareness in the insular cortex.",
    philosophicalPerspective: "Emotions are the vibrational signature of your thoughts; they provide immediate feedback on whether you are resisting or allowing life.",
    icon: "Heart",
    accentColor: "#F43F5E",
    topicsCovered: ["Cognitive Reappraisal", "Interoception", "Emotional Agility", "Non-Violent Self-Inquiry"]
  },
  {
    id: "meditation-and-mindfulness",
    name: "Meditation & Mindfulness",
    slug: "meditation-and-mindfulness",
    tagline: "The Still Observer Behind the Stream of Thought",
    description: "Cultivating meta-cognitive awareness: the capacity to witness thoughts, sensations, and urges without reflexive reactivity or attachment.",
    scientificPerspective: "Default Mode Network (DMN) down-regulation, cortical thickening of the hippocampus, and amygdala shrinkage over sustained practice.",
    philosophicalPerspective: "Recognizing that you are not your thoughts, but the vast, silent awareness in which thoughts arise and dissolve.",
    icon: "Sun",
    accentColor: "#A78BFA",
    topicsCovered: ["Vipassana", "Open Monitoring", "Breath Regulation", "Non-Dual Awareness"]
  },
  {
    id: "personal-growth",
    name: "Personal Growth & Self-Mastery",
    slug: "personal-growth",
    tagline: "The Unfolding of Individual Potential",
    description: "The lifelong commitment to psychological integration, conscious evolution, ethical clarity, and holistic fulfillment.",
    scientificPerspective: "Maslow's hierarchy of needs, self-determination theory (autonomy, competence, relatedness), and positive psychology.",
    philosophicalPerspective: "The heroic journey of individuation (Carl Jung): integrating the shadow and manifesting one's deepest purposeful calling.",
    icon: "TrendingUp",
    accentColor: "#38BDF8",
    topicsCovered: ["Individuation", "Self-Determination", "Life Architecture", "Integrity & Purpose"]
  }
];
