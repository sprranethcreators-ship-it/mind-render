import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Order } from '../../types';
import { DollarSign, CheckCircle2, Search, Filter, ShieldCheck, Download } from 'lucide-react';

export const AdminOrdersManager: React.FC = () => {
  const [orders] = useState<Order[]>(() => StorageService.getOrders());
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'completed' ? o.totalAmount : 0), 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
            Orders & Digital License Sales
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Verified customer transactions and issued manuscript access keys.
          </p>
        </div>

        {/* Total Revenue Metric */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(140, 109, 35, 0.25)',
            borderRadius: '12px',
            padding: '14px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <DollarSign size={20} color="#D97706" />
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B45309', fontWeight: 700 }}>
              Total Gross Sales
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              ${totalRevenue.toLocaleString()} USD
            </div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '1.5rem', maxWidth: '420px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Filter by Order #, email, or customer name..."
          style={{ width: '100%' }}
        />
      </div>

      {/* Orders Table */}
      <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--bg-deep)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Order Number</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Customer</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Items Purchased</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Amount</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Payment Method</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No customer orders match the query.
                </td>
              </tr>
            ) : (
              filteredOrders.map(ord => (
                <tr key={ord.id} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                  <td style={{ padding: '16px 18px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                    {ord.orderNumber}
                  </td>
                  <td style={{ padding: '16px 18px' }}>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{ord.userName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ord.userEmail}</div>
                  </td>
                  <td style={{ padding: '16px 18px' }}>
                    {ord.items.map((it, i) => (
                      <div key={i} style={{ color: '#B45309', fontSize: '0.84rem', fontWeight: 600 }}>
                        {it.title}
                      </div>
                    ))}
                  </td>
                  <td style={{ padding: '16px 18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    ${ord.totalAmount} {ord.currency}
                  </td>
                  <td style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>
                    <span style={{ fontSize: '0.78rem', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-deep)', border: '1px solid var(--border-soft)' }}>
                      {ord.paymentMethod}
                    </span>
                  </td>
                  <td style={{ padding: '16px 18px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: ord.status === 'completed' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                        color: ord.status === 'completed' ? '#059669' : '#D97706',
                        border: ord.status === 'completed' ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)'
                      }}
                    >
                      <CheckCircle2 size={12} /> {ord.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '16px 18px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {new Date(ord.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
