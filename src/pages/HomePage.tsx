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
          paddingTop: '96px',
          paddingBottom: '50px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-cosmos)'
        }}
      >
        {/* Layer 1: Central Consciousness Mind Field Animation (Canvas) */}
        <NeuralConsciousnessCanvas />

        {/* Layer 2: Ethereal Atmospheric Depth Glow Behind Masthead (Soft Lavender & Warm Ivory) */}
        <div
          style={{
            position: 'absolute',
            top: '44%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(92vw, 720px)',
            height: 'min(55vh, 440px)',
            background: 'radial-gradient(ellipse at center, rgba(232, 226, 248, 0.55) 0%, rgba(246, 242, 232, 0.35) 45%, transparent 75%)',
            filter: 'blur(40px)',
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
              padding: '6px 18px',
              borderRadius: '24px',
              backgroundColor: 'rgba(200, 168, 78, 0.08)',
              border: '1px solid rgba(184, 148, 55, 0.3)',
              marginBottom: '1.75rem',
              boxShadow: '0 2px 12px rgba(200, 168, 78, 0.1)',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            <span style={{ width: '14px', height: '1.5px', backgroundColor: '#99751F', opacity: 0.6, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.74rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6E5316',
                fontWeight: 700,
                whiteSpace: 'normal',
                textAlign: 'center'
              }}
            >
              {content.hero.kicker}
            </span>
            <span style={{ width: '14px', height: '1.5px', backgroundColor: '#99751F', opacity: 0.6, flexShrink: 0 }} />
          </div>

          {/* Editorial Masthead Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 6.8vw, 5.2rem)',
              fontWeight: 800,
              letterSpacing: 'clamp(0.04em, 1.2vw, 0.12em)',
              color: 'var(--text-primary)',
              lineHeight: 1.12,
              marginBottom: '1.35rem',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            {content.hero.masthead}
          </h1>

          {/* Supporting Philosophy Quote */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
              fontStyle: 'italic',
              color: '#383844',
              maxWidth: '800px',
              margin: '0 auto 1.35rem',
              lineHeight: 1.55,
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            "{content.hero.philosophyQuote}"
          </p>

          {/* Supporting Paragraph in Simple, Clear English */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.96rem, 1.8vw, 1.08rem)',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.8,
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            {content.hero.supportingParagraph}
          </p>

          {/* Refined Hero CTA Buttons */}
          <div className="responsive-btn-group">
            {/* Primary CTA: Sophisticated Indigo */}
            <button
              onClick={scrollToExplore}
              className="hero-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '0.95rem 2rem',
                minHeight: '48px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #5146B8 0%, #4338CA 100%)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.88rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 6px 20px rgba(81, 70, 184, 0.28)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>{content.hero.primaryCtaLabel}</span>
              <div className="btn-icon" style={{ transition: 'transform 0.3s ease' }}>
                <Compass size={17} />
              </div>
            </button>

            {/* Secondary CTA: Warm Champagne Gold Outline/Accent */}
            <Link
              to={content.hero.secondaryCtaLink || '/books'}
              className="hero-btn-gold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '0.95rem 2rem',
                minHeight: '48px',
                borderRadius: '8px',
                background: 'rgba(200, 168, 78, 0.08)',
                color: '#6E5316',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: '1.5px solid #C8A84E',
                boxShadow: '0 4px 14px rgba(200, 168, 78, 0.15)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>{content.hero.secondaryCtaLabel}</span>
              <BookOpen size={17} color="#99751F" />
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
            color: 'var(--text-secondary)',
            fontSize: '0.74rem',
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
              width: '1.5px',
              height: '32px',
              backgroundColor: 'rgba(81, 70, 184, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div
              className="scroll-light-travel"
              style={{
                width: '100%',
                height: '14px',
                backgroundColor: '#5146B8',
                position: 'absolute',
                top: '-14px',
                boxShadow: '0 0 8px rgba(81, 70, 184, 0.6)'
              }}
            />
          </div>
        </div>

        <style>{`
          .hero-btn-primary:hover {
            background: linear-gradient(135deg, #6357C7 0%, #5146B8 100%) !important;
            box-shadow: 0 8px 28px rgba(81, 70, 184, 0.4) !important;
            transform: translateY(-2px);
          }
          .hero-btn-primary:hover .btn-icon {
            transform: rotate(45deg);
          }
          .hero-btn-gold:hover {
            background: rgba(200, 168, 78, 0.16) !important;
            border-color: #99751F !important;
            box-shadow: 0 6px 20px rgba(200, 168, 78, 0.25) !important;
            transform: translateY(-2px);
            color: #503C0D !important;
          }
          .scroll-indicator:hover {
            color: var(--text-primary) !important;
          }
          @keyframes scrollTravel {
            0% { top: -14px; opacity: 0; }
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
