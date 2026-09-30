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
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-cosmos)' }}>
      <section style={{ padding: '60px 0 40px', backgroundColor: 'var(--bg-deep)', borderBottom: '1px solid rgba(25, 25, 29, 0.08)' }}>
        <div className="container">
          <Link to="/library" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '1rem', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to Library
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Orders & Transaction History
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Official purchase receipts, cryptographic license records, and order verification.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          {userOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#FFFFFF', border: '1px solid rgba(25, 25, 29, 0.08)', borderRadius: '16px', color: 'var(--text-secondary)' }}>
              No recorded transactions found.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {userOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(25, 25, 29, 0.08)',
                    borderRadius: '16px',
                    padding: 'clamp(18px, 3.5vw, 28px)',
                    boxShadow: '0 8px 24px rgba(25, 25, 29, 0.04)',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(25, 25, 29, 0.08)', paddingBottom: '16px', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#8A8C9E', textTransform: 'uppercase' }}>
                        Order Reference
                      </span>
                      <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {order.orderNumber}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#8A8C9E', textTransform: 'uppercase' }}>
                        Total Paid
                      </span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B45309' }}>
                        ${order.totalAmount} {order.currency}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        <strong>Items:</strong> {order.items.map(it => it.title).join(', ')}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#8A8C9E' }}>
                        Billed to: {order.userName} ({order.userEmail}) • Method: {order.paymentMethod} • ID: {order.paymentId}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.08)', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>
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
