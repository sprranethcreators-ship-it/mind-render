import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { User } from '../../types';
import { Users, Shield, BookOpen, Calendar } from 'lucide-react';

export const AdminUsersManager: React.FC = () => {
  const [users] = useState<User[]>(() => StorageService.getUsers());

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#F8FAFC' }}>
          Registered Members & Accounts
        </h3>
        <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
          Overview of member accounts and their associated digital libraries.
        </p>
      </div>

      <div style={{ overflowX: 'auto', backgroundColor: '#0E1119', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#121622', color: '#94A3B8' }}>
              <th style={{ padding: '14px 18px' }}>User</th>
              <th style={{ padding: '14px 18px' }}>Role</th>
              <th style={{ padding: '14px 18px' }}>Books in Library</th>
              <th style={{ padding: '14px 18px' }}>Member Since</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '16px 18px' }}>
                  <div style={{ fontWeight: 600, color: '#F8FAFC' }}>{u.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{u.email}</div>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <span className={u.role === 'admin' ? 'badge-gold' : 'badge-indigo'}>
                    {u.role === 'admin' ? 'Architect Admin' : 'Member'}
                  </span>
                </td>
                <td style={{ padding: '16px 18px', color: '#CBD5E1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={14} color="#D4AF37" />
                    <span>{u.purchasedBookIds.length} Publications</span>
                  </div>
                </td>
                <td style={{ padding: '16px 18px', color: '#64748B', fontSize: '0.8rem' }}>
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
