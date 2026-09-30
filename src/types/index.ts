export interface BookSamplePage {
  pageNumber: number;
  title: string;
  subtitle?: string;
  paragraphs: string[];
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorBio?: string;
  description: string;
  aboutText: string;
  category: string;
  topics: string[];
  price: number;
  originalPrice: number;
  currency: string;
  coverGradient: {
    primary: string;
    secondary: string;
    accent: string;
    pattern: 'orbital' | 'geometric' | 'neural' | 'prism';
  };
  pagesCount: number;
  format: string; // e.g. "Digital PDF + EPUB"
  publishYear: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isNewRelease: boolean;
  isPublished: boolean;
  samplePages: BookSamplePage[];
  tableOfContents: string[];
  learningOutcomes: string[];
  isbn: string;
}

export interface BookCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'callout' | 'scientific_note' | 'list';
  text?: string;
  items?: string[];
  citation?: string;
  label?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  blocks: ArticleBlock[];
  category: string;
  author: string;
  authorRole: string;
  readTimeMinutes: number;
  publishDate: string;
  isFeatured: boolean;
  tags: string[];
  relatedBookSlug?: string;
}

export interface OrderItem {
  bookId: string;
  title: string;
  author: string;
  price: number;
  currency: string;
  coverGradient: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  paymentMethod: 'Razorpay' | 'Card' | 'UPI' | 'Direct Checkout';
  paymentId: string;
  status: 'completed' | 'processing' | 'refunded';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  purchasedBookIds: string[];
}

export interface LibraryItem {
  bookId: string;
  purchasedAt: string;
  licenseKey: string;
  lastReadPage: number;
  readingProgressPercent: number;
  notesCount: number;
}

export interface MindSystemNode {
  id: string;
  stepNumber: number;
  label: string;
  scientificConcept: string;
  philosophicalInsight: string;
  neuroCognitiveRole: string;
  actionablePrinciple: string;
  color: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  category: string;
  prompt: string;
  reflection: string;
  tags: string[];
}
