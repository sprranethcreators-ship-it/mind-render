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
      <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--bg-cosmos)' }}>
        <AdminLoginGate onAuthenticated={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: 'var(--bg-cosmos)' }}>
      {/* Top Banner */}
      <section style={{ padding: '36px 0 20px', backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-gold">
                  <Shield size={13} /> Master Admin Console
                </span>
                <span style={{ fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <CheckCircle2 size={12} /> Authenticated Session
                </span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', color: 'var(--text-primary)', marginTop: '6px' }}>
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
                style={{ padding: '0.65rem 1.2rem', fontSize: '0.82rem', borderColor: 'rgba(220, 38, 38, 0.3)', color: '#DC2626' }}
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
            <div style={{ backgroundColor: '#FFFFFF', border: '1.5px solid rgba(217, 119, 6, 0.25)', borderRadius: '12px', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B45309', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Gross Sales</span>
                <DollarSign size={18} color="#D97706" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                ${totalRevenue.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                Across {orders.length} digital orders
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-soft)', borderRadius: '12px', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--indigo-600)', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Treatises Catalog</span>
                <BookOpen size={18} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {books.length} Books
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                {books.filter(b => b.isPublished).length} Published in bookstore
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-soft)', borderRadius: '12px', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Editorial Essays</span>
                <FileText size={18} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {articles.length} Essays
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                Published thought pieces
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-soft)', borderRadius: '12px', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#D97706', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Registered Readers</span>
                <Users size={18} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {users.length} Users
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
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
              borderBottom: '1px solid var(--border-soft)',
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
                backgroundColor: activeTab === 'homepage' ? '#FFFFFF' : 'transparent',
                border: activeTab === 'homepage' ? '1.5px solid rgba(217, 119, 6, 0.4)' : '1px solid transparent',
                color: activeTab === 'homepage' ? '#B45309' : 'var(--text-secondary)',
                boxShadow: activeTab === 'homepage' ? 'var(--shadow-sm)' : 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={16} color={activeTab === 'homepage' ? '#D97706' : 'currentColor'} /> Homepage Content Studio
            </button>

            <button
              onClick={() => setActiveTab('books')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'books' ? '#FFFFFF' : 'transparent',
                border: activeTab === 'books' ? '1.5px solid rgba(217, 119, 6, 0.4)' : '1px solid transparent',
                color: activeTab === 'books' ? '#B45309' : 'var(--text-secondary)',
                boxShadow: activeTab === 'books' ? 'var(--shadow-sm)' : 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <BookOpen size={16} color={activeTab === 'books' ? '#D97706' : 'currentColor'} /> Books & Treatises ({books.length})
            </button>

            <button
              onClick={() => setActiveTab('articles')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'articles' ? '#FFFFFF' : 'transparent',
                border: activeTab === 'articles' ? '1.5px solid rgba(217, 119, 6, 0.4)' : '1px solid transparent',
                color: activeTab === 'articles' ? '#B45309' : 'var(--text-secondary)',
                boxShadow: activeTab === 'articles' ? 'var(--shadow-sm)' : 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <FileText size={16} color={activeTab === 'articles' ? '#D97706' : 'currentColor'} /> Articles & Essays ({articles.length})
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'orders' ? '#FFFFFF' : 'transparent',
                border: activeTab === 'orders' ? '1.5px solid rgba(217, 119, 6, 0.4)' : '1px solid transparent',
                color: activeTab === 'orders' ? '#B45309' : 'var(--text-secondary)',
                boxShadow: activeTab === 'orders' ? 'var(--shadow-sm)' : 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <ShoppingCart size={16} color={activeTab === 'orders' ? '#D97706' : 'currentColor'} /> Orders & Revenue ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('users')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'users' ? '#FFFFFF' : 'transparent',
                border: activeTab === 'users' ? '1.5px solid rgba(217, 119, 6, 0.4)' : '1px solid transparent',
                color: activeTab === 'users' ? '#B45309' : 'var(--text-secondary)',
                boxShadow: activeTab === 'users' ? 'var(--shadow-sm)' : 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <Users size={16} color={activeTab === 'users' ? '#D97706' : 'currentColor'} /> Reader Accounts ({users.length})
            </button>

            <button
              onClick={() => setActiveTab('security')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'security' ? '#FFFFFF' : 'transparent',
                border: activeTab === 'security' ? '1.5px solid rgba(217, 119, 6, 0.4)' : '1px solid transparent',
                color: activeTab === 'security' ? '#B45309' : 'var(--text-secondary)',
                boxShadow: activeTab === 'security' ? 'var(--shadow-sm)' : 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <ShieldAlert size={16} color={activeTab === 'security' ? '#D97706' : 'currentColor'} /> Security & Anti-Tamper ({auditLogs.length})
            </button>
          </div>

          {/* Tab Views */}
          {activeTab === 'homepage' && <AdminHomepageContentEditor />}
          {activeTab === 'books' && <AdminBooksManager />}
          {activeTab === 'articles' && <AdminArticlesManager />}
          {activeTab === 'orders' && <AdminOrdersManager />}
          {activeTab === 'users' && <AdminUsersManager />}
          {activeTab === 'security' && (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-soft)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
                Platform Security & Anti-Hacking Guard
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px' }}>
                Mind Render features cryptographically verified price integrity checks, rate-limiting anti-brute-force lockout, and continuous security event auditing.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ padding: '20px', backgroundColor: 'var(--bg-deep)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <div style={{ color: '#059669', fontWeight: 600, marginBottom: '6px' }}>Price Integrity Engine: ACTIVE</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    All book checkouts validate client-side values against the authoritative server registry. Any modified price is instantly rejected.
                  </div>
                </div>

                <div style={{ padding: '20px', backgroundColor: 'var(--bg-deep)', borderRadius: '12px', border: '1.5px solid rgba(217, 119, 6, 0.25)' }}>
                  <div style={{ color: '#B45309', fontWeight: 600, marginBottom: '6px' }}>Brute-Force Shield: ACTIVE</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Max 5 attempts allowed before a 15-minute lockout activates automatically.
                  </div>
                </div>
              </div>

              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '16px' }}>
                Recent Security Audit Logs ({auditLogs.length})
              </h4>
              {auditLogs.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '20px', textAlign: 'center' }}>
                  No security incidents or anomalies recorded. System is 100% secure.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {auditLogs.map(log => (
                    <div
                      key={log.id}
                      style={{
                        padding: '14px 18px',
                        backgroundColor: 'var(--bg-deep)',
                        borderRadius: '8px',
                        border: '1px solid var(--border-soft)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 600, color: log.severity === 'critical' ? '#DC2626' : log.severity === 'medium' ? '#D97706' : 'var(--indigo-600)', fontSize: '0.8rem', marginRight: '10px' }}>
                          [{log.eventType}]
                        </span>
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.88rem' }}>{log.details}</span>
                      </div>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
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
            backgroundColor: 'rgba(25, 25, 29, 0.6)',
            backdropFilter: 'blur(8px)',
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
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              borderRadius: '16px',
              padding: '32px 28px',
              boxShadow: 'var(--shadow-xl)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <Lock size={20} color="#D97706" />
              <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>Change Master Admin Key</h3>
            </div>

            <form onSubmit={handlePasswordChange}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
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
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
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
