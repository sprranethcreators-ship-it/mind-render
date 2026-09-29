import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, LibraryItem } from '../types';
import { StorageService } from '../services/storageService';
import { useToast } from './ToastContext';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  libraryItems: LibraryItem[];
  login: (email: string) => Promise<boolean>;
  register: (name: string, email: string) => Promise<boolean>;
  logout: () => void;
  switchDemoUser: (role: 'admin' | 'member' | 'guest') => void;
  hasPurchased: (bookId: string) => boolean;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => StorageService.getCurrentUser());
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const { showToast } = useToast();

  const refreshUser = useCallback(() => {
    const user = StorageService.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setLibraryItems(StorageService.getUserLibrary(user.id));
    } else {
      setLibraryItems([]);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string): Promise<boolean> => {
    const users = StorageService.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      StorageService.setCurrentUser(found);
      setCurrentUser(found);
      setLibraryItems(StorageService.getUserLibrary(found.id));
      showToast('success', `Welcome back, ${found.name}`);
      return true;
    } else {
      showToast('error', 'User not found', 'Check the email address or register a new account.');
      return false;
    }
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    if (!name || !email) {
      showToast('error', 'Please fill in all fields');
      return false;
    }
    const newUser = StorageService.registerUser(name, email);
    setCurrentUser(newUser);
    setLibraryItems([]);
    showToast('gold', `Welcome to MIND RENDER`, `Account created for ${newUser.name}`);
    return true;
  };

  const logout = () => {
    StorageService.setCurrentUser(null);
    setCurrentUser(null);
    setLibraryItems([]);
    showToast('info', 'Logged out', 'You have been signed out of your session.');
  };

  const switchDemoUser = (target: 'admin' | 'member' | 'guest') => {
    if (target === 'guest') {
      logout();
      return;
    }
    const users = StorageService.getUsers();
    if (target === 'admin') {
      const adminUser = users.find(u => u.role === 'admin') || users[0];
      StorageService.setCurrentUser(adminUser);
      setCurrentUser(adminUser);
      setLibraryItems(StorageService.getUserLibrary(adminUser.id));
      showToast('gold', 'Switched to Architect Admin', 'Full administrative CMS permissions active.');
    } else {
      const memberUser = users.find(u => u.role === 'user') || users[1];
      StorageService.setCurrentUser(memberUser);
      setCurrentUser(memberUser);
      setLibraryItems(StorageService.getUserLibrary(memberUser.id));
      showToast('info', 'Switched to Member Demo', 'Library and purchasing user session active.');
    }
  };

  const hasPurchased = (bookId: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    return currentUser.purchasedBookIds.includes(bookId);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        isAdmin: currentUser?.role === 'admin',
        libraryItems,
        login,
        register,
        logout,
        switchDemoUser,
        hasPurchased,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
