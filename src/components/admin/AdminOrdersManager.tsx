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
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#F8FAFC' }}>
            Orders & Digital License Sales
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
            Verified customer transactions and issued manuscript access keys.
          </p>
        </div>

        {/* Total Revenue Metric */}
        <div
          style={{
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '10px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <DollarSign size={20} color="#D4AF37" />
          <div>
            <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4AF37' }}>
              Total Gross Sales
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#F8FAFC' }}>
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
      <div style={{ overflowX: 'auto', backgroundColor: '#0E1119', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#121622', color: '#94A3B8' }}>
              <th style={{ padding: '14px 18px' }}>Order Number</th>
              <th style={{ padding: '14px 18px' }}>Customer</th>
              <th style={{ padding: '14px 18px' }}>Items Purchased</th>
              <th style={{ padding: '14px 18px' }}>Amount</th>
              <th style={{ padding: '14px 18px' }}>Payment Method</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '30px', textAlign: 'center', color: '#64748B' }}>
                  No customer orders match the query.
                </td>
              </tr>
            ) : (
              filteredOrders.map(ord => (
                <tr key={ord.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '16px 18px', fontWeight: 600, color: '#F8FAFC', fontFamily: 'monospace' }}>
                    {ord.orderNumber}
                  </td>
                  <td style={{ padding: '16px 18px' }}>
                    <div style={{ color: '#E2E8F0', fontWeight: 500 }}>{ord.userName}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{ord.userEmail}</div>
                  </td>
                  <td style={{ padding: '16px 18px' }}>
                    {ord.items.map((it, i) => (
                      <div key={i} style={{ color: '#D4AF37', fontSize: '0.84rem' }}>
                        {it.title}
                      </div>
                    ))}
                  </td>
                  <td style={{ padding: '16px 18px', fontWeight: 700, color: '#F8FAFC' }}>
                    ${ord.totalAmount} {ord.currency}
                  </td>
                  <td style={{ padding: '16px 18px', color: '#CBD5E1' }}>
                    <span style={{ fontSize: '0.78rem', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
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
                        backgroundColor: ord.status === 'completed' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: ord.status === 'completed' ? '#10B981' : '#F59E0B'
                      }}
                    >
                      <CheckCircle2 size={12} /> {ord.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '16px 18px', color: '#64748B', fontSize: '0.8rem' }}>
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
