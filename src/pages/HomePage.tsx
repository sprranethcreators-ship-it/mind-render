import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NeuralConsciousnessCanvas } from '../components/hero/NeuralConsciousnessCanvas';
import { EditorialPhilosophy } from '../components/home/EditorialPhilosophy';
import { MindTopicsGrid } from '../components/home/MindTopicsGrid';
import { InterconnectedMindSystem } from '../components/home/InterconnectedMindSystem';
import { FeaturedBooksSection } from '../components/home/FeaturedBooksSection';
import { WhyMindRender } from '../components/home/WhyMindRender';
import { FeaturedArticles } from '../components/home/FeaturedArticles';
import { FinalCta } from '../components/home/FinalCta';
import { BookOpen, Compass } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { HomepageContent } from '../types/homepageContent';

export const HomePage: React.FC = () => {
  const [content, setContent] = useState<HomepageContent>(() => StorageService.getHomepageContent());

  useEffect(() => {
    const handleContentUpdate = (e: any) => {
      if (e.detail) {
        setContent(e.detail);
      } else {
        setContent(StorageService.getHomepageContent());
      }
    };

    window.addEventListener('mindrender:homepage_content_updated', handleContentUpdate);
    return () => {
      window.removeEventListener('mindrender:homepage_content_updated', handleContentUpdate);
    };
  }, []);

  const scrollToExplore = () => {
    const targetId = content.hero.primaryCtaLink?.startsWith('#') 
      ? content.hero.primaryCtaLink.substring(1) 
      : 'editorial-transition';
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* =========================================================================
          HERO SECTION — SIGNATURE EXPERIENCE
          Abstract multi-layered Mind Field, editorial masthead, clear English copy
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '90px',
          paddingBottom: '40px',
          overflow: 'hidden',
          backgroundColor: '#060709'
        }}
      >
        {/* Layer 1: Central Consciousness Mind Field Animation (Canvas) */}
        <NeuralConsciousnessCanvas />

        {/* Layer 2: Ethereal Atmospheric Depth Glow Behind Masthead */}
        <div
          style={{
            position: 'absolute',
            top: '44%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(90vw, 640px)',
            height: 'min(50vh, 380px)',
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.22) 0%, rgba(139, 92, 246, 0.12) 40%, rgba(212, 175, 55, 0.04) 65%, transparent 75%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Layer 3: Hero Content Container */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            maxWidth: '920px',
            margin: '0 auto',
            padding: '1.5rem 1rem'
          }}
        >
          {/* Subtle Brand Motif Kicker */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '6px 16px',
              borderRadius: '24px',
              backgroundColor: 'rgba(212, 175, 55, 0.06)',
              border: '1px solid rgba(212, 175, 55, 0.22)',
              marginBottom: '1.75rem',
              boxShadow: '0 0 25px rgba(212, 175, 55, 0.1)',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            <span style={{ width: '12px', height: '1px', backgroundColor: '#D4AF37', opacity: 0.6, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#F3E5AB',
                fontWeight: 600,
                whiteSpace: 'normal',
                textAlign: 'center'
              }}
            >
              {content.hero.kicker}
            </span>
            <span style={{ width: '12px', height: '1px', backgroundColor: '#D4AF37', opacity: 0.6, flexShrink: 0 }} />
          </div>

          {/* Editorial Masthead Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 6.2vw, 4.8rem)',
              fontWeight: 800,
              letterSpacing: 'clamp(0.04em, 1.2vw, 0.12em)',
              color: '#F8FAFC',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 45px rgba(99, 102, 241, 0.3)'
            }}
          >
            {content.hero.masthead}
          </h1>

          {/* Supporting Philosophy */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2.4vw, 1.65rem)',
              fontStyle: 'italic',
              color: '#CBD5E1',
              maxWidth: '780px',
              margin: '0 auto 1.25rem',
              lineHeight: 1.55,
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
            }}
          >
            "{content.hero.philosophyQuote}"
          </p>

          {/* Supporting Paragraph in Simple, Clear English */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
              color: '#94A3B8',
              maxWidth: '620px',
              margin: '0 auto 2.25rem',
              lineHeight: 1.75,
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            {content.hero.supportingParagraph}
          </p>

          {/* Refined Hero CTA Buttons */}
          <div className="responsive-btn-group">
            {/* Primary CTA */}
            <button
              onClick={scrollToExplore}
              className="hero-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '0.95rem 1.8rem',
                minHeight: '48px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.86rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 6px 25px rgba(79, 70, 229, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>{content.hero.primaryCtaLabel}</span>
              <div className="btn-icon" style={{ transition: 'transform 0.3s ease' }}>
                <Compass size={17} />
              </div>
            </button>

            {/* Secondary CTA */}
            <Link
              to={content.hero.secondaryCtaLink || '/books'}
              className="hero-btn-gold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '0.95rem 1.8rem',
                minHeight: '48px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(197, 160, 40, 0.05) 100%)',
                color: '#F3E5AB',
                fontWeight: 600,
                fontSize: '0.86rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.12)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>{content.hero.secondaryCtaLabel}</span>
              <BookOpen size={17} color="#D4AF37" />
            </Link>
          </div>
        </div>

        {/* Scroll Transition Indicator at the bottom */}
        <div
          onClick={scrollToExplore}
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: '#64748B',
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            zIndex: 3,
            transition: 'color 0.2s ease'
          }}
          className="scroll-indicator"
        >
          <span>{content.hero.scrollIndicatorText}</span>
          <div
            style={{
              width: '1px',
              height: '32px',
              backgroundColor: 'rgba(212, 175, 55, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              className="scroll-light-travel"
              style={{
                width: '100%',
                height: '12px',
                backgroundColor: '#D4AF37',
                position: 'absolute',
                top: '-12px',
                boxShadow: '0 0 8px #D4AF37'
              }}
            />
          </div>
        </div>

        <style>{`
          .hero-btn-primary:hover {
            background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%) !important;
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.4) !important;
            transform: translateY(-2px);
          }
          .hero-btn-primary:hover .btn-icon {
            transform: rotate(45deg);
          }
          .hero-btn-gold:hover {
            background: rgba(212, 175, 55, 0.18) !important;
            border-color: #D4AF37 !important;
            box-shadow: 0 6px 28px rgba(212, 175, 55, 0.3) !important;
            transform: translateY(-2px);
            color: #FFFFFF !important;
          }
          .scroll-indicator:hover {
            color: #CBD5E1 !important;
          }
          @keyframes scrollTravel {
            0% { top: -12px; opacity: 0; }
            30% { opacity: 1; }
            100% { top: 32px; opacity: 0; }
          }
          .scroll-light-travel {
            animation: scrollTravel 2.4s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* =========================================================================
          EDITORIAL TRANSITION & PHILOSOPHY
          ========================================================================= */}
      <div id="editorial-transition">
        <EditorialPhilosophy content={content.philosophy} />
      </div>

      {/* =========================================================================
          EXPLORE YOUR MIND — 6 REDESIGNED EDITORIAL TOPIC CARDS
          ========================================================================= */}
      <MindTopicsGrid content={content.topicsSection} />

      {/* =========================================================================
          SIGNATURE "MIND IN MOTION" SECTION
          ========================================================================= */}
      <InterconnectedMindSystem content={content.mindInMotion} />

      {/* =========================================================================
          PUBLISHING HOUSE & FATHER'S TREATISES
          ========================================================================= */}
      <FeaturedBooksSection content={content.booksSection} />

      {/* =========================================================================
          WHY MIND RENDER — 4 PILLARS
          ========================================================================= */}
      <WhyMindRender content={content.whySection} />

      {/* =========================================================================
          IDEAS TO HELP YOU SEE DIFFERENTLY — EDITORIAL ESSAYS
          ========================================================================= */}
      <FeaturedArticles content={content.essaysSection} />

      {/* =========================================================================
          CINEMATIC FINAL HORIZON CTA
          ========================================================================= */}
      <FinalCta content={content.finalCta} />
    </div>
  );
};
