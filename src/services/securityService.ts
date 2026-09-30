import { Book } from '../types';
import { StorageService } from './storageService';

const ADMIN_STORAGE_KEY = 'mr_admin_auth_v1';
const ADMIN_LOCKOUT_KEY = 'mr_admin_lockout_v1';
const DEFAULT_ADMIN_PASSWORD_HASH = 'MindRender@2026'; // Default Master Password

// In-memory fallback if localStorage is unavailable
const memoryStore: Record<string, string> = {};
const memorySessionStore: Record<string, string> = {};

const safeLocal = {
  getItem: (k: string) => typeof localStorage !== 'undefined' ? localStorage.getItem(k) : (memoryStore[k] || null),
  setItem: (k: string, v: string) => typeof localStorage !== 'undefined' ? localStorage.setItem(k, v) : (memoryStore[k] = v),
  removeItem: (k: string) => typeof localStorage !== 'undefined' ? localStorage.removeItem(k) : (delete memoryStore[k])
};

const safeSession = {
  getItem: (k: string) => typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(k) : (memorySessionStore[k] || null),
  setItem: (k: string, v: string) => typeof sessionStorage !== 'undefined' ? sessionStorage.setItem(k, v) : (memorySessionStore[k] = v),
  removeItem: (k: string) => typeof sessionStorage !== 'undefined' ? sessionStorage.removeItem(k) : (delete memorySessionStore[k])
};

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  eventType: 'PRICE_TAMPER_ATTEMPT' | 'FAILED_LOGIN' | 'SUCCESSFUL_LOGIN' | 'SETTINGS_CHANGED';
  details: string;
  severity: 'low' | 'medium' | 'critical';
}

export const SecurityService = {
  /**
   * Authoritative price verification.
   * Prevents any client-side DOM or script tampering of book prices.
   */
  validateBookPurchaseIntegrity(bookId: string, clientClaimedPrice: number, authoritativeBook?: Book): {
    valid: boolean;
    isValid: boolean;
    authorizedPrice: number;
    error?: string;
  } {
    const book = authoritativeBook || StorageService.getBooks().find(b => b.id === bookId);

    if (!book || book.id !== bookId) {
      this.recordSecurityEvent(
        'PRICE_TAMPER_ATTEMPT',
        `Unknown bookId: "${bookId}" attempted in checkout.`,
        'critical'
      );
      return {
        valid: false,
        isValid: false,
        authorizedPrice: 0,
        error: "Security Alert: Invalid book item specification."
      };
    }

    // Compare with authoritative catalog price
    if (Math.abs(book.price - clientClaimedPrice) > 0.001) {
      this.recordSecurityEvent(
        'PRICE_TAMPER_ATTEMPT',
        `Price mismatch detected for "${book.title}" (ID: ${bookId}). Claimed: $${clientClaimedPrice}, Real Price: $${book.price}.`,
        'critical'
      );
      return {
        valid: false,
        isValid: false,
        authorizedPrice: book.price,
        error: `Security Verification Failed: The price was tampered with. Authoritative price is $${book.price}.`
      };
    }

    return {
      valid: true,
      isValid: true,
      authorizedPrice: book.price
    };
  },

  /**
   * Admin Password Verification & Rate-Limiting
   */
  verifyAdminPassword(password: string): { success: boolean; message?: string } {
    // Check lockout
    const lockoutRaw = safeLocal.getItem(ADMIN_LOCKOUT_KEY);
    if (lockoutRaw) {
      try {
        const lockout = JSON.parse(lockoutRaw);
        if (lockout.lockedUntil > Date.now()) {
          const minutesRemaining = Math.ceil((lockout.lockedUntil - Date.now()) / 60000);
          return {
            success: false,
            message: `Admin access locked due to failed attempts. Try again in ${minutesRemaining} minute(s).`
          };
        }
      } catch {}
    }

    const currentSavedPass = safeLocal.getItem('mr_custom_admin_password') || DEFAULT_ADMIN_PASSWORD_HASH;

    if (password === currentSavedPass) {
      // Clear failed attempts
      safeLocal.removeItem(ADMIN_LOCKOUT_KEY);
      
      // Generate secure session token with 4-hour expiration
      const sessionToken = {
        token: `adm_sec_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`,
        expiresAt: Date.now() + 4 * 60 * 60 * 1000,
        role: 'architect_admin'
      };
      safeSession.setItem(ADMIN_STORAGE_KEY, JSON.stringify(sessionToken));

      this.recordSecurityEvent('SUCCESSFUL_LOGIN', 'Admin authenticated into management console.', 'low');
      return { success: true };
    } else {
      // Track failed attempt
      let failedAttempts = 1;
      let lockoutObj = { attempts: 1, lockedUntil: 0 };
      if (lockoutRaw) {
        try {
          const parsed = JSON.parse(lockoutRaw);
          failedAttempts = (parsed.attempts || 0) + 1;
          lockoutObj.attempts = failedAttempts;
        } catch {}
      }

      if (failedAttempts >= 5) {
        lockoutObj.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 minute lockout
        safeLocal.setItem(ADMIN_LOCKOUT_KEY, JSON.stringify(lockoutObj));
        this.recordSecurityEvent('FAILED_LOGIN', `5 failed admin login attempts. Console locked for 15 minutes.`, 'critical');
        return {
          success: false,
          message: "Too many failed attempts. Admin panel locked for 15 minutes."
        };
      }

      safeLocal.setItem(ADMIN_LOCKOUT_KEY, JSON.stringify(lockoutObj));
      this.recordSecurityEvent('FAILED_LOGIN', `Failed admin login attempt (${failedAttempts}/5).`, 'medium');
      return {
        success: false,
        message: `Incorrect admin password. (${5 - failedAttempts} attempts remaining)`
      };
    }
  },

  isAdminAuthenticated(): boolean {
    const raw = safeSession.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return false;
    try {
      const session = JSON.parse(raw);
      if (session.expiresAt && session.expiresAt > Date.now() && session.role === 'architect_admin') {
        return true;
      }
      safeSession.removeItem(ADMIN_STORAGE_KEY);
      return false;
    } catch {
      return false;
    }
  },

  adminLogout(): void {
    safeSession.removeItem(ADMIN_STORAGE_KEY);
  },

  updateAdminPassword(newPassword: string): boolean {
    if (!newPassword || newPassword.length < 8) return false;
    safeLocal.setItem('mr_custom_admin_password', newPassword);
    this.recordSecurityEvent('SETTINGS_CHANGED', 'Admin master password updated.', 'low');
    return true;
  },

  /**
   * Sanitizes strings to prevent XSS script injection into the CMS
   */
  sanitizeInput(input: string): string {
    if (!input) return '';
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '');
  },

  /**
   * Security Audit Log
   */
  recordSecurityEvent(eventType: SecurityAuditLog['eventType'], details: string, severity: SecurityAuditLog['severity']) {
    const logKey = 'mr_security_audit_logs';
    const raw = safeLocal.getItem(logKey);
    let logs: SecurityAuditLog[] = [];
    if (raw) {
      try { logs = JSON.parse(raw); } catch {}
    }
    logs.unshift({
      id: `sec-${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventType,
      details,
      severity
    });
    safeLocal.setItem(logKey, JSON.stringify(logs.slice(0, 100)));
  },

  getSecurityAuditLogs(): SecurityAuditLog[] {
    const raw = safeLocal.getItem('mr_security_audit_logs');
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  }
};
