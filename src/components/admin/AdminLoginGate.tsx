import React, { useState } from 'react';
import { SecurityService } from '../../services/securityService';
import { Lock, Shield, Eye, EyeOff, AlertTriangle, KeyRound, Sparkles } from 'lucide-react';

interface AdminLoginGateProps {
  onAuthenticated: () => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const result = SecurityService.verifyAdminPassword(password);
      if (result.success) {
        onAuthenticated();
      } else {
        setErrorMessage(result.message || 'Authentication failed. Please check master password.');
      }
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--bg-cosmos)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(140, 109, 35, 0.25)',
          borderRadius: '20px',
          padding: '40px 32px',
          boxShadow: '0 20px 48px rgba(25, 25, 29, 0.08), 0 0 40px rgba(140, 109, 35, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Ambient Warmth */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(140, 109, 35, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Shield Icon Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(140, 109, 35, 0.08)',
              border: '1.5px solid rgba(140, 109, 35, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              boxShadow: '0 0 25px rgba(140, 109, 35, 0.12)'
            }}
          >
            <Lock size={28} color="#8C6D23" />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#8C6D23',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Shield size={13} /> RESTRICTED ACCESS
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.02em',
              marginTop: '0.4rem',
              marginBottom: '0.5rem'
            }}
          >
            MIND RENDER Console
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Enter the master administrator key to manage catalog, orders, and all homepage editorial content.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '8px',
              color: '#DC2626',
              fontSize: '0.84rem',
              marginBottom: '1.5rem',
              lineHeight: 1.5
            }}
          >
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.82rem',
                color: 'var(--text-primary)',
                marginBottom: '8px',
                fontWeight: 500
              }}
            >
              Master Administrator Password
            </label>

            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password..."
                style={{
                  width: '100%',
                  paddingRight: '45px',
                  fontFamily: showPassword ? 'var(--font-sans)' : 'monospace',
                  letterSpacing: showPassword ? 'normal' : '0.15em'
                }}
                disabled={isSubmitting}
                autoFocus
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Default Key Note & Rate Limit Guarantee */}
          <div
            style={{
              backgroundColor: 'rgba(140, 109, 35, 0.06)',
              border: '1px solid rgba(140, 109, 35, 0.2)',
              borderRadius: '8px',
              padding: '12px 14px',
              marginBottom: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8C6D23', fontWeight: 600 }}>
              <KeyRound size={14} />
              <span>Default Master Key:</span>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: 'var(--text-primary)', backgroundColor: '#FAF8F3', border: '1px solid rgba(140, 109, 35, 0.25)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', fontWeight: 600 }}>
              MindRender@2026
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Protected with 5-attempt rate-limiting & 15-minute anti-brute-force lockout.
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-gold"
            style={{
              width: '100%',
              padding: '0.95rem',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'wait' : 'pointer'
            }}
          >
            <Sparkles size={16} />
            <span>{isSubmitting ? 'Verifying Credentials...' : 'Unlock Management Console'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
