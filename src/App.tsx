import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileAppBottomNav } from './components/layout/MobileAppBottomNav';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { BooksStorePage } from './pages/BooksStorePage';
import { BookDetailPage } from './pages/BookDetailPage';
import { TopicsIndexPage } from './pages/TopicsIndexPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { ArticlesIndexPage } from './pages/ArticlesIndexPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { InteractiveToolsPage } from './pages/InteractiveToolsPage';
import { UserLibraryPage } from './pages/UserLibraryPage';
import { UserOrdersPage } from './pages/UserOrdersPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AudioProvider>
            <ScrollToTop />
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Navbar />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#FFC0CB' }} />} />
                  <Route path="/books" element={<BooksStorePage />} />
                  <Route path="/books/:slug" element={<BookDetailPage />} />
                  <Route path="/topics" element={<TopicsIndexPage />} />
                  <Route path="/topics/:slug" element={<TopicDetailPage />} />
                  <Route path="/articles" element={<ArticlesIndexPage />} />
                  <Route path="/articles/:slug" element={<ArticleDetailPage />} />
                  <Route path="/tools" element={<InteractiveToolsPage />} />
                  <Route path="/library" element={<UserLibraryPage />} />
                  <Route path="/orders" element={<UserOrdersPage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <MobileAppBottomNav />
            </div>
          </AudioProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
