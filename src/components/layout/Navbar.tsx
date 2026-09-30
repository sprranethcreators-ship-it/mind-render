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
          backgroundColor: isScrolled ? 'rgba(250, 248, 243, 0.96)' : 'rgba(250, 248, 243, 0.86)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isScrolled ? '1px solid rgba(25, 25, 29, 0.08)' : '1px solid rgba(25, 25, 29, 0.05)',
          boxShadow: isScrolled ? '0 6px 20px rgba(25, 25, 29, 0.04)' : 'none',
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
                border: '1.5px solid #99751F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 0 14px rgba(200, 168, 78, 0.15)',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '1px dashed #5146B8'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#99751F'
                }}
              />
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: 'var(--text-primary)',
                  lineHeight: 1
                }}
              >
                MIND RENDER
              </div>
              <div
                style={{
                  fontSize: '0.64rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#99751F',
                  fontWeight: 700,
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
                    fontWeight: active ? 700 : 600,
                    color: active ? '#5146B8' : '#2D2E36',
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
                        width: '18px',
                        height: '2px',
                        backgroundColor: '#5146B8',
                        borderRadius: '2px',
                        boxShadow: '0 0 6px rgba(81, 70, 184, 0.4)'
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
            <div className="desktop-sound-trigger" style={{ position: 'relative' }}>
              <button
                onClick={() => setAudioMenuOpen(!audioMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '20px',
                  backgroundColor: isPlaying ? 'rgba(81, 70, 184, 0.1)' : '#FFFFFF',
                  border: isPlaying ? '1px solid #5146B8' : '1px solid var(--border-subtle)',
                  color: isPlaying ? '#5146B8' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer'
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
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    boxShadow: '0 12px 35px rgba(25, 25, 29, 0.1)',
                    padding: '8px',
                    zIndex: 9000
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: '#747484', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 8px 4px', fontWeight: 600 }}>
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
                      color: currentSound === 'solfeggio432' ? '#99751F' : 'var(--text-primary)',
                      backgroundColor: currentSound === 'solfeggio432' ? 'rgba(200, 168, 78, 0.12)' : 'transparent',
                      fontSize: '0.84rem',
                      fontWeight: 600
                    }}
                  >
                    <span>432 Hz Healing Harmony</span>
                    {currentSound === 'solfeggio432' && <Sparkles size={14} color="#99751F" />}
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
                      color: currentSound === 'solfeggio528' ? '#5146B8' : 'var(--text-primary)',
                      backgroundColor: currentSound === 'solfeggio528' ? 'rgba(81, 70, 184, 0.1)' : 'transparent',
                      fontSize: '0.84rem',
                      fontWeight: 600
                    }}
                  >
                    <span>528 Hz Transformation</span>
                    {currentSound === 'solfeggio528' && <Sparkles size={14} color="#5146B8" />}
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
                      color: currentSound === 'brownNoise' ? '#059669' : 'var(--text-primary)',
                      backgroundColor: currentSound === 'brownNoise' ? 'rgba(5, 150, 105, 0.1)' : 'transparent',
                      fontSize: '0.84rem',
                      fontWeight: 600
                    }}
                  >
                    <span>Deep Focus Rain / Hum</span>
                    {currentSound === 'brownNoise' && <Sparkles size={14} color="#059669" />}
                  </button>

                  {isPlaying && (
                    <button
                      onClick={() => { toggleSound('off'); setAudioMenuOpen(false); }}
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        marginTop: '4px',
                        borderTop: '1px solid var(--border-subtle)',
                        color: '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600
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
              className="desktop-library-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                fontWeight: 600,
                boxShadow: 'var(--shadow-sm)',
                position: 'relative'
              }}
            >
              <BookOpen size={15} color="#99751F" />
              <span className="library-text">My Library</span>
              {libraryItems.length > 0 && (
                <span
                  style={{
                    backgroundColor: '#99751F',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
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
                  backgroundColor: isAdmin ? 'rgba(200, 168, 78, 0.12)' : '#FFFFFF',
                  border: isAdmin ? '1px solid rgba(200, 168, 78, 0.4)' : '1px solid var(--border-subtle)',
                  color: isAdmin ? '#99751F' : 'var(--text-primary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer'
                }}
              >
                {isAdmin ? <Shield size={15} color="#99751F" /> : <UserIcon size={15} />}
                <span className="user-name">{currentUser?.name.split(' ')[0] || 'Account'}</span>
              </button>

              {accountMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '260px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    boxShadow: '0 15px 40px rgba(25, 25, 29, 0.12)',
                    padding: '10px',
                    zIndex: 9000
                  }}
                >
                  <div style={{ padding: '6px 8px 10px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                      {currentUser?.name || 'Guest Explorer'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
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
                      color: '#99751F',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(200, 168, 78, 0.1)',
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
                      color: 'var(--text-secondary)',
                      fontSize: '0.84rem',
                      borderRadius: '4px',
                      fontWeight: 500
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
                      color: 'var(--text-secondary)',
                      fontSize: '0.84rem',
                      borderRadius: '4px',
                      fontWeight: 500
                    }}
                  >
                    Member Profile & Journal
                  </Link>

                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                    <Link
                      to="/admin"
                      onClick={() => setAccountMenuOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        color: '#99751F',
                        padding: '4px 8px',
                        textDecoration: 'none',
                        fontWeight: 600
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
                color: 'var(--text-primary)',
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
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#FAF8F3',
            zIndex: 7999,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
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
                color: isActive(link.path) ? '#5146B8' : 'var(--text-primary)',
                fontWeight: 600,
                padding: '10px 0',
                borderBottom: '1px solid var(--border-subtle)'
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
              color: '#99751F',
              fontWeight: 600,
              padding: '10px 0',
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
              color: '#5146B8',
              fontWeight: 600,
              padding: '10px 0',
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
          .desktop-nav, .desktop-sound-trigger, .desktop-library-link {
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
