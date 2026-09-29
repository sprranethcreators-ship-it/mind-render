# MIND RENDER
> *"Your mind is the interface through which you experience your reality."*

An intellectual digital platform and publisher dedicated to the architecture of consciousness, thought patterns, belief systems, and original foundational treatises written by the author's father.

---

## 🏛️ Brand & Design Philosophy
MIND RENDER eschews superficial manifestation gimmicks and magical thinking. It establishes an elevated, calm, cinematic, and editorial atmosphere that bridges **established cognitive neuroscience** (neuroplasticity, reticular activating system, habit automaticity) with **contemplative metaphysics** (resonance, intentional focus, sovereign observation).

### Visual Direction
- **Deep Cosmos / Midnight:** `#060709`, `#090B10`, `#10131A`
- **Atmospheric Glow:** Indigo (`#6366F1`), Violet (`#8B5CF6`)
- **Accents:** Warm Gold (`#D4AF37`, `#F3E5AB`)
- **Typography:**
  - Display: `Cinzel` (luxurious, editorial display)
  - Serif: `Cormorant Garamond` (prose, pull quotes, italic reflection)
  - Sans-Serif: `Plus Jakarta Sans` (ultra-clean, modern geometric UI)

---

## 🚀 Key Features

### 1. 3D Digital Bookstore & Father's Treatises (`/books`)
- **Realistic 3D Book Presentation:** Custom CSS 3D transforms with responsive mouse parallax tilt, spine shadows, and foil specular reflections.
- **Dedicated Product Pages (`/books/:slug`):** Comprehensive descriptions, learning outcomes, and complete curriculum syllabi.
- **Sample Manuscript Reader (`BookPreviewModal`):** Multi-page sample chapters with table-of-contents toggle.
- **Instant Secure Checkout (`SecureCheckoutModal`):**
  - **Modular Razorpay Ready:** Plug in `VITE_RAZORPAY_KEY_ID`.
  - **Verified Test Sandbox:** Instant cryptographic simulation with real order generation for testing.

### 2. Secure Digital Delivery & Watermarked Licensing
- **No Public PDF Exits:** Access is gated behind server/storage verification.
- **Cryptographic License Watermarking:** Each downloaded manuscript is stamped with the buyer's name, email, order reference, and verification hash.
- **Distraction-Free In-App Reader (`InAppReaderModal`):**
  - Midnight, Sepia, and Obsidian themes
  - Font scaling (normal, large, larger)
  - Persistent reading progress tracking synced with the member's library.

### 3. The 11 Pillars of Consciousness (`/topics`)
1. Law of Attraction
2. Manifestation Architecture
3. Mindset & Mental Paradigms
4. Subconscious Mind
5. Visualization & Mental Rehearsal
6. Affirmations & Self-Talk
7. Focus & Attention
8. Habits & Discipline
9. Emotional Guidance
10. Meditation & Mindfulness
11. Personal Growth & Individuation

*Every domain rigorously distinguishes established psychological science from contemplative philosophical inquiry.*

### 4. Interactive Mind Conditioning Tools (`/tools`)
- **Daily Affirmation Resonance:** Daily high-vibrational affirmations with a box-breathing guide and **432 Hz Solfeggio frequency** audio synthesizer (via Web Audio API).
- **Awareness & Gratitude Journal:** Categorized self-inquiry ledger saved to persistent local storage.
- **Mental Cinema Studio:** 3-phase guided sensory visualization timer (Grounding, Immersion, Feeling of the Wish Fulfilled).
- **Binaural Focus Flow Timer:** Pomodoro work blocks with an ambient brown noise rain synthesizer.
- **Cognitive Reframer:** 4-step cognitive restructuring assistant to dismantle automated negative thoughts into sovereign reframes.

### 5. Professional Admin CMS Portal (`/admin`)
- **Treatise Management:** Add, edit, delete, set price, toggle published/draft, and toggle featured status.
- **Editorial Essays:** Publish research-backed essays with quotes, citations, and tags.
- **Orders & Gross Revenue:** Full transaction ledger with customer details, payment methods, and live revenue calculations.
- **Member Accounts:** Directory of registered users and their owned library contents.

---

## 🛠️ Local Development & Running

```bash
# Navigate to project directory
cd mind-render

# Install dependencies (already completed)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application runs on `http://localhost:5173/`.
