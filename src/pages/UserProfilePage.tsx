import React from 'react';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storageService';
import { User, Shield, BookOpen, Clock, Settings, LogOut, CheckCircle2 } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { currentUser, switchDemoUser, logout, libraryItems } = useAuth();
  const journalEntries = StorageService.getJournalEntries();

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      <section style={{ padding: '60px 0 40px', backgroundColor: '#090B10', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF37'
              }}
            >
              <User size={30} />
            </div>

            <div>
              <span className={currentUser?.role === 'admin' ? 'badge-gold' : 'badge-indigo'}>
                {currentUser?.role === 'admin' ? 'Architect Admin' : 'Registered Member'}
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#F8FAFC', marginTop: '4px' }}>
                {currentUser?.name || 'Member Profile'}
              </h1>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
                {currentUser?.email} • Member since {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'Active'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {/* Account Metrics Card */}
            <div
              style={{
                backgroundColor: '#0E1119',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '32px'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#F8FAFC', marginBottom: '1.25rem' }}>
                Consciousness Ledger
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                  <span style={{ color: '#94A3B8' }}>Digital Books Owned</span>
                  <span style={{ fontWeight: 700, color: '#D4AF37' }}>{libraryItems.length} Treatises</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                  <span style={{ color: '#94A3B8' }}>Journal Inscriptions</span>
                  <span style={{ fontWeight: 700, color: '#818CF8' }}>{journalEntries.length} Reflections</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>License Validation</span>
                  <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} /> Active
                  </span>
                </div>
              </div>
            </div>

            {/* Persona Switcher / Session Controls */}
            <div
              style={{
                backgroundColor: '#0E1119',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '32px'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#F8FAFC', marginBottom: '0.5rem' }}>
                Test Personas & Role Switcher
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Switch instantly between Architect Admin (full CMS management) and Registered Member.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => switchDemoUser('admin')}
                  className={currentUser?.role === 'admin' ? 'btn-gold' : 'btn-secondary'}
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.86rem' }}
                >
                  <Shield size={16} /> Switch to Architect Admin
                </button>

                <button
                  onClick={() => switchDemoUser('member')}
                  className={currentUser?.role === 'user' ? 'btn-gold' : 'btn-secondary'}
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.86rem' }}
                >
                  <User size={16} /> Switch to Member Persona
                </button>

                <button
                  onClick={logout}
                  style={{
                    color: '#EF4444',
                    fontSize: '0.84rem',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '0.5rem'
                  }}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
