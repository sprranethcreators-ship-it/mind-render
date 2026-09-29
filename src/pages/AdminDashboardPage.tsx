import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storageService';
import { SecurityService, SecurityAuditLog } from '../services/securityService';
import { AdminLoginGate } from '../components/admin/AdminLoginGate';
import { AdminHomepageContentEditor } from '../components/admin/AdminHomepageContentEditor';
import { AdminBooksManager } from '../components/admin/AdminBooksManager';
import { AdminArticlesManager } from '../components/admin/AdminArticlesManager';
import { AdminOrdersManager } from '../components/admin/AdminOrdersManager';
import { AdminUsersManager } from '../components/admin/AdminUsersManager';
import { useToast } from '../context/ToastContext';
import { 
  BookOpen, 
  FileText, 
  ShoppingCart, 
  Users, 
  Shield, 
  DollarSign, 
  Sparkles, 
  LogOut, 
  Key, 
  ShieldAlert, 
  CheckCircle2,
  Lock
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => SecurityService.isAdminAuthenticated());
  const [activeTab, setActiveTab] = useState<'homepage' | 'books' | 'articles' | 'orders' | 'users' | 'security'>('homepage');

  // Security modal / password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);

  const books = StorageService.getBooks();
  const articles = StorageService.getArticles();
  const orders = StorageService.getOrders();
  const users = StorageService.getUsers();
  const auditLogs = SecurityService.getSecurityAuditLogs();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'completed' ? o.totalAmount : 0), 0);

  const handleLogout = () => {
    SecurityService.adminLogout();
    setIsAuthenticated(false);
    showToast('info', 'Admin Session Locked', 'Master administrator session closed.');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      showToast('error', 'Password Too Short', 'Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('error', 'Mismatch', 'Passwords do not match.');
      return;
    }

    const success = SecurityService.updateAdminPassword(newPassword);
    if (success) {
      showToast('gold', 'Master Password Updated', 'The administrator master password has been changed.');
      setShowPasswordChangeModal(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast('error', 'Update Failed', 'Could not update password.');
    }
  };

  // If not authenticated via master key gate, show login gate
  if (!isAuthenticated) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#07080B' }}>
        <AdminLoginGate onAuthenticated={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      {/* Top Banner */}
      <section style={{ padding: '36px 0 20px', backgroundColor: '#090B10', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-gold">
                  <Shield size={13} /> Master Admin Console
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> Authenticated Session
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', color: '#F8FAFC', marginTop: '6px' }}>
                MIND RENDER Management Portal
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setShowPasswordChangeModal(true)}
                className="btn-secondary"
                style={{ padding: '0.65rem 1.2rem', fontSize: '0.82rem' }}
              >
                <Key size={14} /> Change Admin Key
              </button>

              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{ padding: '0.65rem 1.2rem', fontSize: '0.82rem', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#F87171' }}
              >
                <LogOut size={14} /> Lock & Exit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Metric Cards */}
      <section style={{ padding: '28px 0 20px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
            <div style={{ backgroundColor: '#0E1119', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D4AF37', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Gross Sales</span>
                <DollarSign size={18} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#F8FAFC' }}>
                ${totalRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '3px' }}>
                Across {orders.length} digital orders
              </div>
            </div>

            <div style={{ backgroundColor: '#0E1119', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#818CF8', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Treatises Catalog</span>
                <BookOpen size={18} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#F8FAFC' }}>
                {books.length} Books
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '3px' }}>
                {books.filter(b => b.isPublished).length} Published in bookstore
              </div>
            </div>

            <div style={{ backgroundColor: '#0E1119', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Editorial Essays</span>
                <FileText size={18} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#F8FAFC' }}>
                {articles.length} Essays
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '3px' }}>
                Published thought pieces
              </div>
            </div>

            <div style={{ backgroundColor: '#0E1119', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F59E0B', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Registered Readers</span>
                <Users size={18} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#F8FAFC' }}>
                {users.length} Users
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '3px' }}>
                Active library accounts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Navigation */}
      <section style={{ padding: '0 0 32px' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              gap: '8px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '12px',
              marginBottom: '28px',
              overflowX: 'auto'
            }}
          >
            <button
              onClick={() => setActiveTab('homepage')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'homepage' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                border: activeTab === 'homepage' ? '1px solid #D4AF37' : '1px solid transparent',
                color: activeTab === 'homepage' ? '#F3E5AB' : '#94A3B8',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Sparkles size={16} /> Homepage Content Studio
            </button>

            <button
              onClick={() => setActiveTab('books')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'books' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                border: activeTab === 'books' ? '1px solid #D4AF37' : '1px solid transparent',
                color: activeTab === 'books' ? '#F3E5AB' : '#94A3B8',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <BookOpen size={16} /> Books & Treatises ({books.length})
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'articles' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                border: activeTab === 'articles' ? '1px solid #D4AF37' : '1px solid transparent',
                color: activeTab === 'articles' ? '#F3E5AB' : '#94A3B8',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <FileText size={16} /> Articles & Essays ({articles.length})
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'orders' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                border: activeTab === 'orders' ? '1px solid #D4AF37' : '1px solid transparent',
                color: activeTab === 'orders' ? '#F3E5AB' : '#94A3B8',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <ShoppingCart size={16} /> Orders & Revenue ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('users')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'users' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                border: activeTab === 'users' ? '1px solid #D4AF37' : '1px solid transparent',
                color: activeTab === 'users' ? '#F3E5AB' : '#94A3B8',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Users size={16} /> Reader Accounts ({users.length})
            </button>

            <button
              onClick={() => setActiveTab('security')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'security' ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                border: activeTab === 'security' ? '1px solid #D4AF37' : '1px solid transparent',
                color: activeTab === 'security' ? '#F3E5AB' : '#94A3B8',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <ShieldAlert size={16} /> Security & Anti-Tamper ({auditLogs.length})
            </button>
          </div>

          {/* Tab Views */}
          {activeTab === 'homepage' && <AdminHomepageContentEditor />}
          {activeTab === 'books' && <AdminBooksManager />}
          {activeTab === 'articles' && <AdminArticlesManager />}
          {activeTab === 'orders' && <AdminOrdersManager />}
          {activeTab === 'users' && <AdminUsersManager />}
          {activeTab === 'security' && (
            <div style={{ backgroundColor: '#0A0C14', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '32px' }}>
              <h3 style={{ color: '#F8FAFC', fontSize: '1.4rem', marginBottom: '8px' }}>
                Platform Security & Anti-Hacking Guard
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginBottom: '24px' }}>
                Mind Render features cryptographically verified price integrity checks, rate-limiting anti-brute-force lockout, and continuous security event auditing.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ padding: '20px', backgroundColor: '#0E1119', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ color: '#10B981', fontWeight: 600, marginBottom: '6px' }}>Price Integrity Engine: ACTIVE</div>
                  <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                    All book checkouts validate client-side values against the authoritative server registry. Any modified price is instantly rejected.
                  </div>
                </div>

                <div style={{ padding: '20px', backgroundColor: '#0E1119', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <div style={{ color: '#D4AF37', fontWeight: 600, marginBottom: '6px' }}>Brute-Force Shield: ACTIVE</div>
                  <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>
                    Max 5 attempts allowed before a 15-minute lockout activates automatically.
                  </div>
                </div>
              </div>

              <h4 style={{ color: '#CBD5E1', fontSize: '1.1rem', marginBottom: '16px' }}>
                Recent Security Audit Logs ({auditLogs.length})
              </h4>
              {auditLogs.length === 0 ? (
                <div style={{ color: '#64748B', fontStyle: 'italic', padding: '20px', textAlign: 'center' }}>
                  No security incidents or anomalies recorded. System is 100% secure.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {auditLogs.map(log => (
                    <div
                      key={log.id}
                      style={{
                        padding: '14px 18px',
                        backgroundColor: '#0E1119',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 600, color: log.severity === 'critical' ? '#F87171' : log.severity === 'medium' ? '#FBBF24' : '#818CF8', fontSize: '0.8rem', marginRight: '10px' }}>
                          [{log.eventType}]
                        </span>
                        <span style={{ color: '#E2E8F0', fontSize: '0.88rem' }}>{log.details}</span>
                      </div>
                      <span style={{ fontSize: '0.74rem', color: '#64748B', whiteSpace: 'nowrap' }}>
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Change Password Modal */}
      {showPasswordChangeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 6, 8, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowPasswordChangeModal(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#0E1119',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '16px',
              padding: '32px 28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <Lock size={20} color="#D4AF37" />
              <h3 style={{ color: '#F8FAFC', fontSize: '1.2rem' }}>Change Master Admin Key</h3>
            </div>

            <form onSubmit={handlePasswordChange}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '6px' }}>
                  New Master Password (min 8 chars)
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  style={{ width: '100%' }}
                  placeholder="Enter new master password"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#CBD5E1', marginBottom: '6px' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  style={{ width: '100%' }}
                  placeholder="Confirm new master password"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowPasswordChangeModal(false)}
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.2rem' }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ padding: '0.65rem 1.4rem' }}
                >
                  Save New Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
