import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  Bookmark, 
  Headphones, 
  Volume2, 
  VolumeX, 
  X, 
  Radio, 
  Sliders
} from 'lucide-react';

export const MobileAppBottomNav: React.FC = () => {
  const location = useLocation();
  const { libraryItems } = useAuth();
  const { currentSound, toggleSound, isPlaying } = useAudio();
  const [soundSheetOpen, setSoundSheetOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const ambientPresets = [
    {
      id: 'solfeggio432',
      title: '432 Hz Calm',
      subtitle: 'Rest & Deep Alpha',
      color: '#D4AF37'
    },
    {
      id: 'solfeggio528',
      title: '528 Hz Clarity',
      subtitle: 'Insight & Renewal',
      color: '#818CF8'
    },
    {
      id: 'rain',
      title: 'Deep Rain Focus',
      subtitle: 'Steady Pink Noise',
      color: '#34D399'
    }
  ];

  return (
    <>
      {/* Bottom Floating App Navigation Bar (Mobile & Small Tablets Only) */}
      <nav
        className="mobile-app-nav"
        aria-label="Mobile App Navigation"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '66px',
          backgroundColor: 'rgba(8, 10, 15, 0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.75)',
          zIndex: 8900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)'
        }}
      >
        {/* 1. Home */}
        <Link
          to="/"
          className="mobile-nav-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isActive('/') ? '#D4AF37' : '#94A3B8',
            flex: 1,
            height: '100%',
            position: 'relative'
          }}
        >
          <div
            style={{
              padding: '4px 14px',
              borderRadius: '16px',
              backgroundColor: isActive('/') ? 'rgba(212, 175, 55, 0.14)' : 'transparent',
              transition: 'all 0.25s ease'
            }}
          >
            <Home size={20} color={isActive('/') ? '#D4AF37' : '#94A3B8'} />
          </div>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: isActive('/') ? 600 : 500,
              letterSpacing: '0.02em'
            }}
          >
            Home
          </span>
        </Link>

        {/* 2. Books */}
        <Link
          to="/books"
          className="mobile-nav-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isActive('/books') ? '#D4AF37' : '#94A3B8',
            flex: 1,
            height: '100%',
            position: 'relative'
          }}
        >
          <div
            style={{
              padding: '4px 14px',
              borderRadius: '16px',
              backgroundColor: isActive('/books') ? 'rgba(212, 175, 55, 0.14)' : 'transparent',
              transition: 'all 0.25s ease'
            }}
          >
            <BookOpen size={20} color={isActive('/books') ? '#D4AF37' : '#94A3B8'} />
          </div>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: isActive('/books') ? 600 : 500,
              letterSpacing: '0.02em'
            }}
          >
            Books
          </span>
        </Link>

        {/* 3. Mind Tools */}
        <Link
          to="/tools"
          className="mobile-nav-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isActive('/tools') ? '#D4AF37' : '#94A3B8',
            flex: 1,
            height: '100%',
            position: 'relative'
          }}
        >
          <div
            style={{
              padding: '4px 14px',
              borderRadius: '16px',
              backgroundColor: isActive('/tools') ? 'rgba(212, 175, 55, 0.14)' : 'transparent',
              transition: 'all 0.25s ease'
            }}
          >
            <Sparkles size={20} color={isActive('/tools') ? '#D4AF37' : '#94A3B8'} />
          </div>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: isActive('/tools') ? 600 : 500,
              letterSpacing: '0.02em'
            }}
          >
            Tools
          </span>
        </Link>

        {/* 4. Library */}
        <Link
          to="/library"
          className="mobile-nav-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            textDecoration: 'none',
            color: isActive('/library') ? '#D4AF37' : '#94A3B8',
            flex: 1,
            height: '100%',
            position: 'relative'
          }}
        >
          <div
            style={{
              padding: '4px 14px',
              borderRadius: '16px',
              backgroundColor: isActive('/library') ? 'rgba(212, 175, 55, 0.14)' : 'transparent',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            <Bookmark size={20} color={isActive('/library') ? '#D4AF37' : '#94A3B8'} />
            {libraryItems.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '1px',
                  right: '6px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#D4AF37',
                  boxShadow: '0 0 6px #D4AF37'
                }}
              />
            )}
          </div>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: isActive('/library') ? 600 : 500,
              letterSpacing: '0.02em'
            }}
          >
            Library
          </span>
        </Link>

        {/* 5. Ambient Sound Modal Trigger */}
        <button
          onClick={() => setSoundSheetOpen(true)}
          className="mobile-nav-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            background: 'none',
            border: 'none',
            color: isPlaying ? '#D4AF37' : '#94A3B8',
            flex: 1,
            height: '100%',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <div
            style={{
              padding: '4px 14px',
              borderRadius: '16px',
              backgroundColor: isPlaying ? 'rgba(212, 175, 55, 0.18)' : 'transparent',
              transition: 'all 0.25s ease',
              position: 'relative'
            }}
          >
            {isPlaying ? (
              <Volume2 size={20} color="#D4AF37" className="animate-pulse" />
            ) : (
              <Headphones size={20} color="#94A3B8" />
            )}
            {isPlaying && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '6px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 6px #10B981'
                }}
              />
            )}
          </div>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: isPlaying ? 600 : 500,
              letterSpacing: '0.02em'
            }}
          >
            {isPlaying ? 'Tuning' : 'Sound'}
          </span>
        </button>
      </nav>

      {/* Mobile Ambient Sound Bottom Sheet */}
      {soundSheetOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 6, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 9600,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
          onClick={() => setSoundSheetOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '500px',
              backgroundColor: '#0E1119',
              borderTop: '1px solid rgba(212, 175, 55, 0.3)',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px 20px',
              paddingBottom: 'max(28px, env(safe-area-inset-bottom, 24px))',
              boxShadow: '0 -20px 50px rgba(0, 0, 0, 0.9)',
              animation: 'slideUpSheet 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div
              style={{
                width: '40px',
                height: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                margin: '0 auto 16px'
              }}
            />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Headphones size={20} color="#D4AF37" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#F8FAFC' }}>
                  Consciousness Sound Chamber
                </h3>
              </div>
              <button
                onClick={() => setSoundSheetOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  padding: '4px',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ color: '#94A3B8', fontSize: '0.86rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Synthesized pure harmonic solfeggio tones to accompany reading and contemplation.
            </p>

            {/* Presets List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.25rem' }}>
              {ambientPresets.map(preset => {
                const isSelected = currentSound === preset.id && isPlaying;
                return (
                  <button
                    key={preset.id}
                    onClick={() => toggleSound(preset.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? `1.5px solid ${preset.color}` : '1px solid rgba(255, 255, 255, 0.07)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: isSelected ? '#FFFFFF' : '#E2E8F0', fontSize: '0.94rem' }}>
                        {preset.title}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '2px' }}>
                        {preset.subtitle}
                      </div>
                    </div>

                    <div style={{ color: preset.color }}>
                      {isSelected ? <Volume2 size={20} /> : <VolumeX size={18} color="#64748B" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {isPlaying && (
              <button
                onClick={() => toggleSound(currentSound as any)}
                className="btn-secondary"
                style={{ width: '100%', padding: '0.8rem', fontSize: '0.88rem' }}
              >
                <VolumeX size={16} /> Stop Playing
              </button>
            )}
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-app-nav {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          body {
            padding-bottom: 66px !important;
          }
          .mobile-nav-item:active {
            transform: scale(0.92);
          }
        }
        @keyframes slideUpSheet {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
