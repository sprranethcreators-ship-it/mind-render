import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast('gold', 'Welcome to Sunday Letters', `Weekly reflections will be sent to ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: '#15161E',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '90px',
        paddingBottom: '50px',
        position: 'relative',
        zIndex: 10,
        color: '#E8E8EE'
      }}
    >
      <div className="container">
        {/* Top Minimal Editorial Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(28px, 4vw, 48px)',
            alignItems: 'center',
            paddingBottom: '40px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '40px'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.75rem)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#FAF8F3',
                marginBottom: '0.5rem',
                overflowWrap: 'break-word'
              }}
            >
              MIND RENDER
            </div>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: '#D4AF37',
                marginBottom: '0.75rem',
                overflowWrap: 'break-word'
              }}
            >
              "Explore your mind. Create a more conscious life."
            </p>

            <p style={{ color: '#9E9EB2', fontSize: '0.92rem', lineHeight: 1.65, maxWidth: '480px', overflowWrap: 'break-word' }}>
              An independent intellectual publishing house and digital platform dedicated to the architecture of consciousness.
            </p>
          </div>

          {/* Clean Newsletter Input */}
          <div
            style={{
              backgroundColor: '#1B1D28',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: '16px',
              padding: 'clamp(18px, 3vw, 28px)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4AF37', marginBottom: '8px' }}>
              <Sparkles size={15} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Sunday Contemplation
              </span>
            </div>
            <p style={{ color: '#C8C8D6', fontSize: '0.86rem', marginBottom: '14px', lineHeight: 1.55 }}>
              Receive an unhurried, weekly letter on quiet focus, thought patterns, and personal sovereignty.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  flex: '1 1 180px',
                  minWidth: '160px',
                  fontSize: '0.88rem',
                  padding: '10px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FAF8F3',
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{
                  padding: '0 18px',
                  fontSize: '0.84rem',
                  flexShrink: 0,
                  minHeight: '42px',
                  flex: '1 1 auto',
                  background: 'linear-gradient(135deg, #C59B27 0%, #D4AF37 100%)',
                  color: '#15161E'
                }}
              >
                Join <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Minimal Directory Navigation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: '28px',
            marginBottom: '40px'
          }}
        >
          {/* Main Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FAF8F3', marginBottom: '16px', fontWeight: 600 }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/books" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>Books & Treatises</Link></li>
              <li><Link to="/topics" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>The Mind Curriculum</Link></li>
              <li><Link to="/articles" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>Editorial Essays</Link></li>
              <li><Link to="/tools" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>Interactive Mind Tools</Link></li>
            </ul>
          </div>

          {/* The Collection */}
          <div>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FAF8F3', marginBottom: '16px', fontWeight: 600 }}>
              Father's Original Works
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/books/the-architecture-of-attention" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>The Architecture of Attention</Link></li>
              <li><Link to="/books/the-resonance-principle" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>The Resonance Principle</Link></li>
              <li><Link to="/books/subconscious-blueprint" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>Subconscious Blueprint</Link></li>
              <li><Link to="/books/mental-cinema-the-art-of-visualization" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>Mental Cinema</Link></li>
            </ul>
          </div>

          {/* Member & Tools */}
          <div>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FAF8F3', marginBottom: '16px', fontWeight: 600 }}>
              Member Sanctuary
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/library" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>My Personal Library</Link></li>
              <li><Link to="/orders" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>Orders & Invoices</Link></li>
              <li><Link to="/profile" style={{ color: '#A2A2B5', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#FAF8F3'} onMouseLeave={e => e.currentTarget.style.color = '#A2A2B5'}>Member Profile</Link></li>
              <li><Link to="/admin" style={{ color: '#A5B4FC', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#C7D2FE'} onMouseLeave={e => e.currentTarget.style.color = '#A5B4FC'}>Admin CMS Console</Link></li>
            </ul>
          </div>

          {/* Legal & Licensing */}
          <div>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FAF8F3', marginBottom: '16px', fontWeight: 600 }}>
              Legal & Integrity
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ color: '#A2A2B5', fontSize: '0.9rem', cursor: 'pointer' }}>Privacy Policy</li>
              <li style={{ color: '#A2A2B5', fontSize: '0.9rem', cursor: 'pointer' }}>Terms of Sale</li>
              <li style={{ color: '#A2A2B5', fontSize: '0.9rem', cursor: 'pointer' }}>Refund Policy</li>
              <li style={{ color: '#A2A2B5', fontSize: '0.9rem', cursor: 'pointer' }}>Author Rights & Copyright</li>
            </ul>
          </div>
        </div>

        {/* Bottom Minimal Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            color: '#76768E',
            fontSize: '0.82rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} MIND RENDER. Original digital manuscripts written by the author's father. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399' }}>
            <ShieldCheck size={14} />
            <span>256-Bit Encrypted Digital Licensing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
