import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'gold';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        width: 'calc(100vw - 48px)',
        pointerEvents: 'none'
      }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '16px',
              backgroundColor: '#12151E',
              border: toast.type === 'gold' 
                ? '1px solid rgba(212, 175, 55, 0.4)' 
                : toast.type === 'error'
                ? '1px solid rgba(239, 68, 68, 0.4)'
                : '1px solid rgba(99, 102, 241, 0.35)',
              borderRadius: '10px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(12px)',
              animation: 'fadeIn 0.3s ease'
            }}
          >
            {toast.type === 'success' && <CheckCircle size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />}
            {toast.type === 'gold' && <CheckCircle size={20} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />}
            {toast.type === 'error' && <AlertCircle size={20} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />}
            {toast.type === 'info' && <Info size={20} color="#6366F1" style={{ flexShrink: 0, marginTop: '2px' }} />}

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F8FAFC', marginBottom: toast.message ? '4px' : '0' }}>
                {toast.title}
              </div>
              {toast.message && (
                <div style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.4 }}>
                  {toast.message}
                </div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: '#64748B', padding: '2px', cursor: 'pointer' }}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
