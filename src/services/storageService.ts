import { Book, Article, Order, User, LibraryItem, JournalEntry } from '../types';
import { SEED_BOOKS } from '../data/books';
import { SEED_ARTICLES } from '../data/articles';
import { HomepageContent } from '../types/homepageContent';
import { DEFAULT_HOMEPAGE_CONTENT } from '../data/homepageContent';

const STORAGE_KEYS = {
  BOOKS: 'mindrender_books_v2',
  ARTICLES: 'mindrender_articles_v2',
  ORDERS: 'mindrender_orders_v1',
  USERS: 'mindrender_users_v1',
  CURRENT_USER: 'mindrender_current_user_v1',
  USER_LIBRARY: 'mindrender_library_v1',
  JOURNAL: 'mindrender_journal_v1',
  HOMEPAGE_CONTENT: 'mindrender_homepage_content_v1'
};

const memoryStore: Record<string, string> = {};

const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof localStorage !== 'undefined') return localStorage.getItem(key);
    } catch {}
    return memoryStore[key] || null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
        return;
      }
    } catch {}
    memoryStore[key] = value;
  },
  removeItem: (key: string): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
        return;
      }
    } catch {}
    delete memoryStore[key];
  }
};

const INITIAL_USERS: User[] = [
  {
    id: "user-admin",
    name: "Architect Admin",
    email: "admin@mindrender.internal",
    role: "admin",
    createdAt: "2025-01-10T10:00:00Z",
    purchasedBookIds: ["mr-book-01", "mr-book-02", "mr-book-03", "mr-book-04"]
  },
  {
    id: "user-member",
    name: "Julian Vance",
    email: "julian@mindrender.internal",
    role: "user",
    createdAt: "2025-02-15T14:30:00Z",
    purchasedBookIds: ["mr-book-01"]
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-88910",
    orderNumber: "MR-88910",
    userId: "user-member",
    userEmail: "julian@mindrender.internal",
    userName: "Julian Vance",
    items: [
      {
        bookId: "mr-book-01",
        title: "The Architecture of Attention",
        author: "Father's Original Works",
        price: 24,
        currency: "USD",
        coverGradient: {
          primary: "#141B2D",
          secondary: "#080B12",
          accent: "#D4AF37"
        }
      }
    ],
    totalAmount: 24,
    currency: "USD",
    paymentMethod: "Razorpay",
    paymentId: "pay_live_9921043",
    status: "completed",
    createdAt: "2025-02-15T14:35:00Z"
  }
];

const INITIAL_LIBRARY: LibraryItem[] = [
  {
    bookId: "mr-book-01",
    purchasedAt: "2025-02-15T14:35:00Z",
    licenseKey: "MR-LIC-ATTN-88910-VA",
    lastReadPage: 3,
    readingProgressPercent: 12,
    notesCount: 2
  }
];

export const StorageService = {
  // Books
  getBooks(): Book[] {
    const raw = safeStorage.getItem(STORAGE_KEYS.BOOKS);
    if (!raw) {
      safeStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(SEED_BOOKS));
      return SEED_BOOKS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_BOOKS;
    }
  },

  saveBook(book: Book): void {
    const books = this.getBooks();
    const index = books.findIndex(b => b.id === book.id);
    if (index >= 0) {
      books[index] = book;
    } else {
      books.unshift(book);
    }
    safeStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  },

  deleteBook(bookId: string): void {
    const books = this.getBooks().filter(b => b.id !== bookId);
    safeStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  },

  // Articles
  getArticles(): Article[] {
    const raw = safeStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!raw) {
      safeStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(SEED_ARTICLES));
      return SEED_ARTICLES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return SEED_ARTICLES;
    }
  },

  saveArticle(article: Article): void {
    const articles = this.getArticles();
    const index = articles.findIndex(a => a.id === article.id);
    if (index >= 0) {
      articles[index] = article;
    } else {
      articles.unshift(article);
    }
    safeStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  },

  deleteArticle(articleId: string): void {
    const articles = this.getArticles().filter(a => a.id !== articleId);
    safeStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  },

  // Orders
  getOrders(): Order[] {
    const raw = safeStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      safeStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_ORDERS;
    }
  },

  createOrder(order: Order): void {
    const orders = this.getOrders();
    orders.unshift(order);
    safeStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // Also grant book access to the user's library and user model
    order.items.forEach(item => {
      this.grantBookToUser(order.userId, item.bookId);
    });
  },

  // Users
  getUsers(): User[] {
    const raw = safeStorage.getItem(STORAGE_KEYS.USERS);
    if (!raw) {
      safeStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_USERS;
    }
  },

  getCurrentUser(): User | null {
    const raw = safeStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) {
      // Default to member user for frictionless initial demo preview
      const defaultUser = INITIAL_USERS[1];
      safeStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
      return defaultUser;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      safeStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      safeStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  registerUser(name: string, email: string): User {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return existing;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
      purchasedBookIds: []
    };
    users.push(newUser);
    safeStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.setCurrentUser(newUser);
    return newUser;
  },

  // Library
  getUserLibrary(userId: string): LibraryItem[] {
    const raw = safeStorage.getItem(`${STORAGE_KEYS.USER_LIBRARY}_${userId}`);
    if (!raw) {
      if (userId === "user-member") {
        safeStorage.setItem(`${STORAGE_KEYS.USER_LIBRARY}_${userId}`, JSON.stringify(INITIAL_LIBRARY));
        return INITIAL_LIBRARY;
      }
      return [];
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  grantBookToUser(userId: string, bookId: string): void {
    // 1. Update User object
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex >= 0) {
      if (!users[userIndex].purchasedBookIds.includes(bookId)) {
        users[userIndex].purchasedBookIds.push(bookId);
      }
      safeStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      
      const current = this.getCurrentUser();
      if (current && current.id === userId) {
        this.setCurrentUser(users[userIndex]);
      }
    }

    // 2. Add to User Library items
    const library = this.getUserLibrary(userId);
    if (!library.some(item => item.bookId === bookId)) {
      library.unshift({
        bookId,
        purchasedAt: new Date().toISOString(),
        licenseKey: `MR-LIC-${bookId.toUpperCase().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`,
        lastReadPage: 1,
        readingProgressPercent: 0,
        notesCount: 0
      });
      safeStorage.setItem(`${STORAGE_KEYS.USER_LIBRARY}_${userId}`, JSON.stringify(library));
    }
  },

  updateReadingProgress(userId: string, bookId: string, page: number, percent: number): void {
    const library = this.getUserLibrary(userId);
    const item = library.find(l => l.bookId === bookId);
    if (item) {
      item.lastReadPage = page;
      item.readingProgressPercent = percent;
      safeStorage.setItem(`${STORAGE_KEYS.USER_LIBRARY}_${userId}`, JSON.stringify(library));
    }
  },

  // Journal entries for interactive tools
  getJournalEntries(): JournalEntry[] {
    const raw = safeStorage.getItem(STORAGE_KEYS.JOURNAL);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveJournalEntry(entry: JournalEntry): void {
    const entries = this.getJournalEntries();
    entries.unshift(entry);
    safeStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
  },

  // Homepage Content (100% editable from Admin Panel)
  getHomepageContent(): HomepageContent {
    const raw = safeStorage.getItem(STORAGE_KEYS.HOMEPAGE_CONTENT);
    if (!raw) {
      safeStorage.setItem(STORAGE_KEYS.HOMEPAGE_CONTENT, JSON.stringify(DEFAULT_HOMEPAGE_CONTENT));
      return DEFAULT_HOMEPAGE_CONTENT;
    }
    try {
      const parsed = JSON.parse(raw);
      // Merge with default to ensure no missing keys if new fields were added
      return {
        ...DEFAULT_HOMEPAGE_CONTENT,
        ...parsed,
        hero: { ...DEFAULT_HOMEPAGE_CONTENT.hero, ...(parsed.hero || {}) },
        philosophy: {
          ...DEFAULT_HOMEPAGE_CONTENT.philosophy,
          ...(parsed.philosophy || {}),
          triadCards: parsed.philosophy?.triadCards || DEFAULT_HOMEPAGE_CONTENT.philosophy.triadCards
        },
        topicsSection: {
          ...DEFAULT_HOMEPAGE_CONTENT.topicsSection,
          ...(parsed.topicsSection || {}),
          topics: parsed.topicsSection?.topics || DEFAULT_HOMEPAGE_CONTENT.topicsSection.topics
        },
        mindInMotion: {
          ...DEFAULT_HOMEPAGE_CONTENT.mindInMotion,
          ...(parsed.mindInMotion || {}),
          steps: parsed.mindInMotion?.steps || DEFAULT_HOMEPAGE_CONTENT.mindInMotion.steps
        },
        booksSection: { ...DEFAULT_HOMEPAGE_CONTENT.booksSection, ...(parsed.booksSection || {}) },
        whySection: {
          ...DEFAULT_HOMEPAGE_CONTENT.whySection,
          ...(parsed.whySection || {}),
          pillars: parsed.whySection?.pillars || DEFAULT_HOMEPAGE_CONTENT.whySection.pillars
        },
        essaysSection: { ...DEFAULT_HOMEPAGE_CONTENT.essaysSection, ...(parsed.essaysSection || {}) },
        finalCta: { ...DEFAULT_HOMEPAGE_CONTENT.finalCta, ...(parsed.finalCta || {}) }
      };
    } catch {
      return DEFAULT_HOMEPAGE_CONTENT;
    }
  },

  saveHomepageContent(content: HomepageContent): void {
    const updated = {
      ...content,
      lastUpdated: new Date().toISOString()
    };
    safeStorage.setItem(STORAGE_KEYS.HOMEPAGE_CONTENT, JSON.stringify(updated));
    // Dispatch a custom event so open tabs/components can re-render immediately
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mindrender:homepage_content_updated', { detail: updated }));
    }
  },

  resetHomepageContent(): HomepageContent {
    safeStorage.setItem(STORAGE_KEYS.HOMEPAGE_CONTENT, JSON.stringify(DEFAULT_HOMEPAGE_CONTENT));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mindrender:homepage_content_updated', { detail: DEFAULT_HOMEPAGE_CONTENT }));
    }
    return DEFAULT_HOMEPAGE_CONTENT;
  }
};
