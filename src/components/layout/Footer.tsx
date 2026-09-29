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
        backgroundColor: '#050608',
        borderTop: '1px solid rgba(255, 255, 255, 0.07)',
        paddingTop: '90px',
        paddingBottom: '50px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        {/* Top Minimal Editorial Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            paddingBottom: '60px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
            marginBottom: '60px'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#F8FAFC',
                marginBottom: '0.5rem'
              }}
            >
              MIND RENDER
            </div>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: '#D4AF37',
                marginBottom: '0.75rem'
              }}
            >
              "Explore your mind. Create a more conscious life."
            </p>

            <p style={{ color: '#94A3B8', fontSize: '0.94rem', lineHeight: 1.7, maxWidth: '480px' }}>
              An independent intellectual publishing house and digital platform dedicated to the architecture of consciousness.
            </p>
          </div>

          {/* Clean Newsletter Input */}
          <div
            style={{
              backgroundColor: '#0B0D14',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4AF37', marginBottom: '8px' }}>
              <Sparkles size={15} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Sunday Contemplation
              </span>
            </div>
            <p style={{ color: '#CBD5E1', fontSize: '0.88rem', marginBottom: '16px', lineHeight: 1.6 }}>
              Receive an unhurried, weekly letter on quiet focus, thought patterns, and personal sovereignty.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ flex: 1, fontSize: '0.88rem', padding: '10px 14px' }}
              />
              <button type="submit" className="btn-gold" style={{ padding: '0 18px', fontSize: '0.84rem', flexShrink: 0 }}>
                Join <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Minimal Directory Navigation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '36px',
            marginBottom: '60px'
          }}
        >
          {/* Main Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F8FAFC', marginBottom: '16px', fontWeight: 600 }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/books" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Books & Treatises</Link></li>
              <li><Link to="/topics" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>The Mind Curriculum</Link></li>
              <li><Link to="/articles" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Editorial Essays</Link></li>
              <li><Link to="/tools" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Interactive Mind Tools</Link></li>
            </ul>
          </div>

          {/* The Collection */}
          <div>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F8FAFC', marginBottom: '16px', fontWeight: 600 }}>
              Father's Original Works
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/books/the-architecture-of-attention" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>The Architecture of Attention</Link></li>
              <li><Link to="/books/the-resonance-principle" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>The Resonance Principle</Link></li>
              <li><Link to="/books/subconscious-blueprint" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Subconscious Blueprint</Link></li>
              <li><Link to="/books/mental-cinema-the-art-of-visualization" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Mental Cinema</Link></li>
            </ul>
          </div>

          {/* Member & Tools */}
          <div>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F8FAFC', marginBottom: '16px', fontWeight: 600 }}>
              Member Sanctuary
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/library" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>My Personal Library</Link></li>
              <li><Link to="/orders" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Orders & Invoices</Link></li>
              <li><Link to="/profile" style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Member Profile</Link></li>
              <li><Link to="/admin" style={{ color: '#818CF8', fontSize: '0.9rem' }}>Admin CMS Console</Link></li>
            </ul>
          </div>

          {/* Legal & Licensing */}
          <div>
            <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#F8FAFC', marginBottom: '16px', fontWeight: 600 }}>
              Legal & Integrity
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ color: '#94A3B8', fontSize: '0.9rem', cursor: 'pointer' }}>Privacy Policy</li>
              <li style={{ color: '#94A3B8', fontSize: '0.9rem', cursor: 'pointer' }}>Terms of Sale</li>
              <li style={{ color: '#94A3B8', fontSize: '0.9rem', cursor: 'pointer' }}>Refund Policy</li>
              <li style={{ color: '#94A3B8', fontSize: '0.9rem', cursor: 'pointer' }}>Author Rights & Copyright</li>
            </ul>
          </div>
        </div>

        {/* Bottom Minimal Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            color: '#64748B',
            fontSize: '0.82rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} MIND RENDER. Original digital manuscripts written by the author's father. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
            <ShieldCheck size={14} />
            <span>256-Bit Encrypted Digital Licensing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
