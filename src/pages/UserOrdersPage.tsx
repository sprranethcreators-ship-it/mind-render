import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storageService';
import { Order } from '../types';
import { CheckCircle2, ShieldCheck, Download, ArrowLeft, BookOpen } from 'lucide-react';

export const UserOrdersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const allOrders = StorageService.getOrders();
  
  // Filter for orders belonging to this user (or show all in demo if no matching)
  const userOrders = currentUser 
    ? allOrders.filter(o => o.userId === currentUser.id || o.userEmail.toLowerCase() === currentUser.email.toLowerCase())
    : allOrders.slice(0, 1);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      <section style={{ padding: '60px 0 40px', backgroundColor: '#090B10', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <Link to="/library" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.82rem', marginBottom: '1rem' }}>
            <ArrowLeft size={14} /> Back to Library
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#F8FAFC' }}>
            Orders & Transaction History
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
            Official purchase receipts, cryptographic license records, and order verification.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          {userOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#0E1119', borderRadius: '16px', color: '#94A3B8' }}>
              No recorded transactions found.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {userOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: '#0E1119',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: 'clamp(18px, 3.5vw, 28px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '16px', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#64748B', textTransform: 'uppercase' }}>
                        Order Reference
                      </span>
                      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC' }}>
                        {order.orderNumber}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#64748B', textTransform: 'uppercase' }}>
                        Total Paid
                      </span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#D4AF37' }}>
                        ${order.totalAmount} {order.currency}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '4px' }}>
                        <strong>Items:</strong> {order.items.map(it => it.title).join(', ')}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        Billed to: {order.userName} ({order.userEmail}) • Method: {order.paymentMethod} • ID: {order.paymentId}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '4px 10px', borderRadius: '4px' }}>
                        <CheckCircle2 size={13} /> {order.status.toUpperCase()}
                      </span>
                      <Link to="/library" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                        <BookOpen size={13} /> View in Library
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
