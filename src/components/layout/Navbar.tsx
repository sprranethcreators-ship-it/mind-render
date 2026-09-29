import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAudio } from '../../context/AudioContext';
import { 
  BookOpen, 
  Sparkles, 
  Headphones, 
  Volume2, 
  VolumeX, 
  User as UserIcon, 
  Shield, 
  Menu, 
  X, 
  Layers, 
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentUser, isAdmin, switchDemoUser, logout, libraryItems } = useAuth();
  const { currentSound, toggleSound, isPlaying } = useAudio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioMenuOpen, setAudioMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Books', path: '/books' },
    { label: 'The Mind', path: '/topics' },
    { label: 'Essays', path: '/articles' },
    { label: 'Mind Tools', path: '/tools' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: isScrolled ? '64px' : '76px',
          backgroundColor: isScrolled ? 'rgba(6, 7, 9, 0.92)' : 'rgba(6, 7, 9, 0.72)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.7)' : 'none',
          zIndex: 8000,
          display: 'flex',
          alignItems: 'center',
          transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none'
            }}
          >
            {/* Geometric Glyph */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 0 16px rgba(212, 175, 55, 0.25)'
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '1px dashed #6366F1'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#D4AF37'
                }}
              />
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: '#F8FAFC',
                  lineHeight: 1
                }}
              >
                MIND RENDER
              </div>
              <div
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#D4AF37',
                  marginTop: '3px'
                }}
              >
                Consciousness & Books
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.25rem'
            }}
            className="desktop-nav"
          >
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '0.88rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: active ? 600 : 500,
                    color: active ? '#D4AF37' : '#CBD5E1',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '16px',
                        height: '2px',
                        backgroundColor: '#D4AF37',
                        borderRadius: '2px',
                        boxShadow: '0 0 8px #D4AF37'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Sound Synthesizer, Library, User Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Ambient Sound Mode Trigger */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setAudioMenuOpen(!audioMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '20px',
                  backgroundColor: isPlaying ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: isPlaying ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isPlaying ? '#818CF8' : '#94A3B8',
                  fontSize: '0.78rem',
                  fontWeight: 500
                }}
                title="Contemplation Soundscapes"
              >
                {isPlaying ? <Volume2 size={15} /> : <Headphones size={15} />}
                <span className="sound-label">
                  {currentSound === 'solfeggio432' ? '432 Hz' : currentSound === 'solfeggio528' ? '528 Hz' : currentSound === 'brownNoise' ? 'Rain Hum' : 'Ambient'}
                </span>
              </button>

              {audioMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '240px',
                    backgroundColor: '#10131B',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
                    padding: '8px',
                    zIndex: 9000
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: '#64748B', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 8px 4px' }}>
                    Mind Frequencies (Web Audio)
                  </div>
                  <button
                    onClick={() => { toggleSound('solfeggio432'); setAudioMenuOpen(false); }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '6px',
                      color: currentSound === 'solfeggio432' ? '#D4AF37' : '#CBD5E1',
                      backgroundColor: currentSound === 'solfeggio432' ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                      fontSize: '0.84rem'
                    }}
                  >
                    <span>432 Hz Healing Harmony</span>
                    {currentSound === 'solfeggio432' && <Sparkles size={14} />}
                  </button>

                  <button
                    onClick={() => { toggleSound('solfeggio528'); setAudioMenuOpen(false); }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '6px',
                      color: currentSound === 'solfeggio528' ? '#818CF8' : '#CBD5E1',
                      backgroundColor: currentSound === 'solfeggio528' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                      fontSize: '0.84rem'
                    }}
                  >
                    <span>528 Hz Transformation</span>
                    {currentSound === 'solfeggio528' && <Sparkles size={14} />}
                  </button>

                  <button
                    onClick={() => { toggleSound('brownNoise'); setAudioMenuOpen(false); }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '6px',
                      color: currentSound === 'brownNoise' ? '#6EE7B7' : '#CBD5E1',
                      backgroundColor: currentSound === 'brownNoise' ? 'rgba(110, 231, 183, 0.1)' : 'transparent',
                      fontSize: '0.84rem'
                    }}
                  >
                    <span>Deep Focus Rain / Hum</span>
                    {currentSound === 'brownNoise' && <Sparkles size={14} />}
                  </button>

                  {isPlaying && (
                    <button
                      onClick={() => { toggleSound('off'); setAudioMenuOpen(false); }}
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        marginTop: '4px',
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        color: '#EF4444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem'
                      }}
                    >
                      <VolumeX size={14} /> Mute Sound
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* My Library Button */}
            <Link
              to="/library"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#F8FAFC',
                fontSize: '0.84rem',
                fontWeight: 500,
                position: 'relative'
              }}
            >
              <BookOpen size={15} color="#D4AF37" />
              <span className="library-text">My Library</span>
              {libraryItems.length > 0 && (
                <span
                  style={{
                    backgroundColor: '#D4AF37',
                    color: '#090B10',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    width: '17px',
                    height: '17px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '2px'
                  }}
                >
                  {libraryItems.length}
                </span>
              )}
            </Link>

            {/* Account / Admin Portal */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  backgroundColor: isAdmin ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: isAdmin ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isAdmin ? '#D4AF37' : '#CBD5E1',
                  fontSize: '0.82rem'
                }}
              >
                {isAdmin ? <Shield size={15} /> : <UserIcon size={15} />}
                <span className="user-name">{currentUser?.name.split(' ')[0] || 'Account'}</span>
              </button>

              {accountMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '260px',
                    backgroundColor: '#10131B',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.8)',
                    padding: '10px',
                    zIndex: 9000
                  }}
                >
                  <div style={{ padding: '6px 8px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600, color: '#F8FAFC', fontSize: '0.9rem' }}>
                      {currentUser?.name || 'Guest Explorer'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                      {currentUser?.email || 'Sign in to access digital books'}
                    </div>
                    <div style={{ marginTop: '6px' }}>
                      <span className={isAdmin ? 'badge-gold' : 'badge-indigo'}>
                        {isAdmin ? 'Architect CMS Admin' : 'Registered Member'}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/admin"
                    onClick={() => setAccountMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      color: '#D4AF37',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(212, 175, 55, 0.08)',
                      marginBottom: '6px'
                    }}
                  >
                    <SlidersHorizontal size={15} /> Admin CMS Portal
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setAccountMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '7px 10px',
                      color: '#CBD5E1',
                      fontSize: '0.84rem',
                      borderRadius: '4px'
                    }}
                  >
                    Order History & Receipts
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setAccountMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '7px 10px',
                      color: '#CBD5E1',
                      fontSize: '0.84rem',
                      borderRadius: '4px'
                    }}
                  >
                    Member Profile & Journal
                  </Link>

                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <Link
                      to="/admin"
                      onClick={() => setAccountMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        color: '#D4AF37',
                        padding: '4px 8px',
                        textDecoration: 'none'
                      }}
                    >
                      <Shield size={13} />
                      <span>Administrative Access Gate</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              style={{
                color: '#F8FAFC',
                padding: '6px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '76px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#090B10',
            zIndex: 7999,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-display)',
                color: isActive(link.path) ? '#D4AF37' : '#F8FAFC',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/library"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '1.1rem',
              color: '#D4AF37',
              padding: '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <BookOpen size={18} /> My Library ({libraryItems.length} books)
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '1.1rem',
              color: '#818CF8',
              padding: '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <SlidersHorizontal size={18} /> Admin CMS Portal
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
          .sound-label, .library-text, .user-name {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
