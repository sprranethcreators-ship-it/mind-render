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

        {/* Layer 2: Ethereal Multi-Prismatic Atmospheric Blooms (Rose, Violet & Honey Gold) */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 'min(50vw, 480px)',
            height: 'min(50vw, 480px)',
            background: 'radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, rgba(244, 63, 94, 0.08) 40%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '18%',
            right: '8%',
            width: 'min(52vw, 500px)',
            height: 'min(52vw, 500px)',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, rgba(99, 102, 241, 0.09) 45%, transparent 70%)',
            filter: 'blur(65px)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(92vw, 760px)',
            height: 'min(55vh, 460px)',
            background: 'radial-gradient(ellipse at center, rgba(254, 243, 199, 0.35) 0%, rgba(238, 242, 255, 0.3) 40%, transparent 75%)',
            filter: 'blur(45px)',
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
          {/* Subtle Brand Motif Kicker - Crystalline Jewel Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '8px 22px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 243, 199, 0.4) 100%)',
              border: '1.5px solid rgba(217, 119, 6, 0.35)',
              marginBottom: '1.75rem',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.15), 0 2px 6px rgba(99, 102, 241, 0.08)',
              maxWidth: '100%',
              boxSizing: 'border-box',
              backdropFilter: 'blur(12px)'
            }}
          >
            <span style={{ width: '16px', height: '2px', background: 'linear-gradient(90deg, #D97706, #F59E0B)', borderRadius: '2px', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B45309',
                fontWeight: 800,
                whiteSpace: 'normal',
                textAlign: 'center'
              }}
            >
              {content.hero.kicker}
            </span>
            <span style={{ width: '16px', height: '2px', background: 'linear-gradient(90deg, #F59E0B, #D97706)', borderRadius: '2px', flexShrink: 0 }} />
          </div>

          {/* Editorial Masthead Headline with Liquid Iridescent Gradient */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 6.8vw, 5.2rem)',
              fontWeight: 800,
              letterSpacing: 'clamp(0.04em, 1.2vw, 0.12em)',
              background: 'linear-gradient(135deg, #090B0E 0%, #1E1B4B 35%, #4338CA 65%, #B45309 95%, #D97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
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
              color: '#2A2C3A',
              maxWidth: '800px',
              margin: '0 auto 1.35rem',
              lineHeight: 1.55,
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              fontWeight: 500
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
            {/* Primary CTA: Royal Indigo / Amethyst Gradient */}
            <button
              onClick={scrollToExplore}
              className="hero-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '1rem 2.2rem',
                minHeight: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4338CA 0%, #6366F1 50%, #7C3AED 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                boxShadow: '0 8px 25px -3px rgba(79, 70, 229, 0.45), 0 3px 10px rgba(79, 70, 229, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>{content.hero.primaryCtaLabel}</span>
              <div className="btn-icon" style={{ transition: 'transform 0.3s ease' }}>
                <Compass size={18} />
              </div>
            </button>

            {/* Secondary CTA: Liquid Imperial Gold */}
            <Link
              to={content.hero.secondaryCtaLink || '/books'}
              className="hero-btn-gold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '1rem 2.2rem',
                minHeight: '50px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #B45309 0%, #D97706 40%, #F59E0B 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 8px 25px -3px rgba(217, 119, 6, 0.45), 0 3px 10px rgba(217, 119, 6, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>{content.hero.secondaryCtaLabel}</span>
              <BookOpen size={18} color="#FFFFFF" />
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
              width: '2px',
              height: '36px',
              backgroundColor: 'rgba(99, 102, 241, 0.25)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px'
            }}
          >
            <div
              className="scroll-light-travel"
              style={{
                width: '100%',
                height: '14px',
                background: 'linear-gradient(180deg, #D97706 0%, #6366F1 100%)',
                position: 'absolute',
                top: '-14px',
                boxShadow: '0 0 8px rgba(99, 102, 241, 0.8)',
                borderRadius: '2px'
              }}
            />
          </div>
        </div>

        <style>{`
          .hero-btn-primary:hover {
            background: linear-gradient(135deg, #3730A3 0%, #4F46E5 50%, #6D28D9 100%) !important;
            box-shadow: 0 12px 32px -4px rgba(79, 70, 229, 0.55), 0 4px 12px -2px rgba(79, 70, 229, 0.35) !important;
            transform: translateY(-2px);
          }
          .hero-btn-primary:hover .btn-icon {
            transform: rotate(45deg);
          }
          .hero-btn-gold:hover {
            background: linear-gradient(135deg, #92400E 0%, #B45309 40%, #D97706 100%) !important;
            box-shadow: 0 12px 32px -4px rgba(217, 119, 6, 0.55), 0 4px 12px -2px rgba(217, 119, 6, 0.35) !important;
            transform: translateY(-2px);
            color: #FFFFFF !important;
          }
          .scroll-indicator:hover {
            color: #4F46E5 !important;
          }
          @keyframes scrollTravel {
            0% { top: -14px; opacity: 0; }
            30% { opacity: 1; }
            100% { top: 36px; opacity: 0; }
          }
          .scroll-light-travel {
            animation: scrollTravel 2.2s ease-in-out infinite;
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
