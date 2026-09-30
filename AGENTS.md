<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# MIND RENDER — Architecture & Development Guide

MIND RENDER is a luxury digital publishing platform, digital bookstore, and consciousness-expansion web application built with React 19, TypeScript, and Vite.

## Tech Stack & Architecture
- **Framework**: React 19, TypeScript, Vite
- **Routing**: `react-router-dom` v7 with client-side routes
- **Icons**: `lucide-react`
- **Styling**: Vanilla CSS Design System with dark mode, luxury gold accents, glassmorphic surfaces, and CSS variables defined in `src/index.css`
- **Port**: Development server runs on port 8080 (`host: "::"`) for compatibility with Lovable's preview environment

## Project Structure
- `src/App.tsx`: Main route definitions and global context providers (`ToastProvider`, `AuthProvider`, `AudioProvider`)
- `src/index.css`: Comprehensive design tokens, themes, typography, and component styling
- `src/pages/`:
  - `HomePage.tsx`: Luxury hero section, interactive canvas, editorial philosophy, featured books & articles
  - `BooksStorePage.tsx` & `BookDetailPage.tsx`: Digital book catalog and purchasing simulation
  - `ArticlesIndexPage.tsx` & `ArticleDetailPage.tsx`: Long-form essays and thought leadership
  - `TopicsIndexPage.tsx` & `TopicDetailPage.tsx`: Deep-dive themes (Mind Architecture, Reality Design, etc.)
  - `InteractiveToolsPage.tsx`: Cognitive Reframer, Daily Affirmations, Focus Timer, Gratitude Journal, Visualization Sessions
  - `UserLibraryPage.tsx`: Purchased books, in-app digital reader modal
  - `UserOrdersPage.tsx`: Transaction history & receipts
  - `UserProfilePage.tsx`: Account preferences, settings, and member status
  - `AdminDashboardPage.tsx`: CMS studio for managing books, articles, users, and homepage content
  - `NotFoundPage.tsx`: 404 luxury fallback
- `src/components/`: Reusable UI modules organized by feature (`admin`, `books`, `common`, `hero`, `home`, `layout`, `reader`, `tools`)
- `src/context/`: Audio playback, authentication, toast notifications
- `src/services/`: Mock payment gateway, PDF security/watermarking, security encryption, local storage persistence
- `src/data/`: Default mock data for books, articles, categories, and mind systems

## Guidelines for Lovable AI
- Preserve the existing luxury midnight cosmic dark aesthetic (`#060709`, `#10131A`, Gold `#D4AF37`, Indigo `#6366F1`).
- Maintain type safety with TypeScript.
- All new routes should be wired up in `src/App.tsx`.
- Never force push to the connected git repository.
