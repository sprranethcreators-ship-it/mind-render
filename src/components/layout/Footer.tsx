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
        background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F1E8 50%, #ECE6D8 100%)',
        borderTop: '2px solid rgba(217, 119, 6, 0.25)',
        paddingTop: '90px',
        paddingBottom: '50px',
        position: 'relative',
        zIndex: 10,
        color: '#334155'
      }}
    >
      {/* Ambient background glows */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          width: '350px',
          height: '250px',
          background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '400px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Top Minimal Editorial Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(28px, 4vw, 48px)',
            alignItems: 'center',
            paddingBottom: '40px',
            borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
            marginBottom: '40px'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 2.6vw, 1.85rem)',
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: '#0F172A',
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
                color: '#92400E',
                fontWeight: 600,
                marginBottom: '0.75rem',
                overflowWrap: 'break-word'
              }}
            >
              "Explore your mind. Create a more conscious life."
            </p>

            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.65, maxWidth: '480px', overflowWrap: 'break-word' }}>
              An independent intellectual publishing house and digital platform dedicated to the architecture of consciousness.
            </p>
          </div>

          {/* Clean Crystalline Newsletter Input */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(217, 119, 6, 0.3)',
              borderRadius: '18px',
              padding: 'clamp(20px, 3.2vw, 30px)',
              boxShadow: '0 16px 40px rgba(217, 119, 6, 0.12), 0 4px 12px rgba(15, 23, 42, 0.04)',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', marginBottom: '8px' }}>
              <Sparkles size={16} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Sunday Contemplation
              </span>
            </div>
            <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '14px', lineHeight: 1.55 }}>
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
                  fontSize: '0.9rem',
                  padding: '11px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid rgba(217, 119, 6, 0.3)',
                  color: '#0F172A',
                  borderRadius: '10px',
                  outline: 'none',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0 20px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                  minHeight: '44px',
                  flex: '1 1 auto',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
                  transition: 'all 0.2s'
                }}
              >
                Join <ArrowRight size={15} />
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
            <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0F172A', marginBottom: '16px', fontWeight: 700 }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/books" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Books & Treatises</Link></li>
              <li><Link to="/topics" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>The Mind Curriculum</Link></li>
              <li><Link to="/articles" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Editorial Essays</Link></li>
              <li><Link to="/tools" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Interactive Mind Tools</Link></li>
            </ul>
          </div>

          {/* The Collection */}
          <div>
            <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0F172A', marginBottom: '16px', fontWeight: 700 }}>
              Father's Original Works
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/books/the-architecture-of-attention" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>The Architecture of Attention</Link></li>
              <li><Link to="/books/the-resonance-principle" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>The Resonance Principle</Link></li>
              <li><Link to="/books/subconscious-blueprint" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Subconscious Blueprint</Link></li>
              <li><Link to="/books/mental-cinema-the-art-of-visualization" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Mental Cinema</Link></li>
            </ul>
          </div>

          {/* Member & Tools */}
          <div>
            <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0F172A', marginBottom: '16px', fontWeight: 700 }}>
              Member Sanctuary
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/library" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>My Personal Library</Link></li>
              <li><Link to="/orders" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Orders & Invoices</Link></li>
              <li><Link to="/profile" style={{ color: '#475569', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#B45309'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Member Profile</Link></li>
              <li><Link to="/admin" style={{ color: '#4F46E5', fontSize: '0.92rem', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#4338CA'} onMouseLeave={e => e.currentTarget.style.color = '#4F46E5'}>Admin CMS Console</Link></li>
            </ul>
          </div>

          {/* Legal & Licensing */}
          <div>
            <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0F172A', marginBottom: '16px', fontWeight: 700 }}>
              Legal & Integrity
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ color: '#64748B', fontSize: '0.92rem', cursor: 'pointer' }}>Privacy Policy</li>
              <li style={{ color: '#64748B', fontSize: '0.92rem', cursor: 'pointer' }}>Terms of Sale</li>
              <li style={{ color: '#64748B', fontSize: '0.92rem', cursor: 'pointer' }}>Refund Policy</li>
              <li style={{ color: '#64748B', fontSize: '0.92rem', cursor: 'pointer' }}>Author Rights & Copyright</li>
            </ul>
          </div>
        </div>

        {/* Bottom Minimal Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(217, 119, 6, 0.15)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            color: '#64748B',
            fontSize: '0.84rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} MIND RENDER. Original digital manuscripts written by the author's father. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 600 }}>
            <ShieldCheck size={16} />
            <span>256-Bit Encrypted Digital Licensing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
