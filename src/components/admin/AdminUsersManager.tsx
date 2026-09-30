import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { User } from '../../types';
import { Users, Shield, BookOpen, Calendar } from 'lucide-react';

export const AdminUsersManager: React.FC = () => {
  const [users] = useState<User[]>(() => StorageService.getUsers());

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          Registered Members & Accounts
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Overview of member accounts and their associated digital libraries.
        </p>
      </div>

      <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--bg-deep)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>User</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Role</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Books in Library</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Member Since</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                <td style={{ padding: '16px 18px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{u.email}</div>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <span className={u.role === 'admin' ? 'badge-gold' : 'badge-indigo'}>
                    {u.role === 'admin' ? 'Architect Admin' : 'Member'}
                  </span>
                </td>
                <td style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={14} color="#D97706" />
                    <span>{u.purchasedBookIds.length} Publications</span>
                  </div>
                </td>
                <td style={{ padding: '16px 18px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
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
