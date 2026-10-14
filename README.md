# BookShelf

A beautiful, personal book tracker for readers who love to organize their library and track their reading journey.

![BookShelf](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)

## Overview

BookShelf is a modern, responsive web application that helps you track your reading progress, organize your books by status, rate and review your reads, and maintain a personal library. Built with React 18, Vite, and Tailwind CSS, it features a warm, editorial design inspired by premium bookstores.

## Features

### Core Features
- **Add/Edit/Delete Books**: Full CRUD operations with inline validation
- **Three Shelves**: Organize books into "Want to Read", "Reading", and "Finished"
- **Progress Tracking**: Visual gauges and progress bars for reading books
- **Star Ratings**: Rate books from 0-5 stars with keyboard accessibility
- **Notes Editor**: Add personal notes to each book with auto-save
- **Search & Filter**: Search by title/author, filter by status, genre, and rating
- **Sort Options**: Sort by date added, title, author, or rating
- **Grid/List Views**: Toggle between grid and list layouts
- **Statistics**: Track total books, reading count, finished count, and pages read
- **Auto-Generated Covers**: Beautiful gradient covers generated from book titles
- **Sample Data**: Load sample books to get started quickly
- **JSON Export/Import**: Backup and restore your library

### Additional Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Mobile Sidebar**: Collapsible drawer navigation on mobile devices
- **Toast Notifications**: User feedback for all actions
- **Delete Confirmation**: Prevents accidental deletions
- **Empty States**: Friendly messages when no books are found
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error recovery
- **Accessibility**: WCAG AA compliant with keyboard navigation and ARIA attributes
- **Data Persistence**: LocalStorage-based storage with schema versioning

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom theme tokens
- **Routing**: React Router (BrowserRouter)
- **State Management**: Custom hooks (useBooks)
- **Storage**: LocalStorage (with API stub for future backend)
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel and Netlify (includes `public/_redirects`)

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abhinanthspillai/book-tracker-webapp.git
cd book-tracker-webapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

## Project Structure

```
src/
├── config/              # Configuration files
│   ├── app.js          # App name, routes, storage keys
│   └── schema.js       # Book model, statuses, genres, validators
├── repositories/        # Data layer (repository pattern)
│   ├── bookRepository.js      # Repository interface
│   ├── localStorageRepository.js  # LocalStorage implementation
│   ├── apiRepository.js        # API stub (for future backend)
│   └── index.js               # Repository selector
├── hooks/              # Custom React hooks
│   └── useBooks.js     # Book state management and CRUD
├── utils/              # Pure utility functions
│   ├── filterSort.js   # Filter and sort logic
│   ├── validators.js   # Validation helpers
│   ├── stats.js        # Statistics calculations
│   └── coverGradient.js # Cover generation
├── components/         # Reusable UI components
│   ├── BookCard.jsx
│   ├── BookForm.jsx
│   ├── StarRating.jsx
│   ├── ProgressBar.jsx
│   ├── Gauge.jsx
│   ├── StatCard.jsx
│   ├── EmptyState.jsx
│   ├── Toast.jsx
│   ├── ConfirmDialog.jsx
│   ├── Button.jsx
│   └── Sidebar.jsx
├── pages/              # Page components
│   ├── landing/        # Landing page (isolated)
│   │   └── Landing.jsx
│   ├── library/        # Library page
│   │   ├── Library.jsx
│   │   └── icons.js
│   └── detail/         # Book detail page
│       └── BookDetail.jsx
├── test/               # Test setup
│   └── setup.js
├── App.jsx             # Main app with routing
├── main.jsx            # React entry point
└── index.css           # Global styles and Tailwind
```

## Architecture Decisions

### Repository Pattern
The data layer uses a repository pattern to abstract storage implementation. This makes it trivial to switch from LocalStorage to a REST API or any other storage mechanism. The `useBooks` hook only imports from `repositories/index.js`, which selects the implementation based on environment variables.

**To switch to a backend:**
1. Set `VITE_STORAGE=api` in your environment
2. Implement the REST API endpoints at `/api/books`
3. The existing `apiRepository.js` stub will handle the communication

### Config-Driven Schema
All book fields, statuses, genres, and validation rules are defined in `src/config/schema.js`. This single source of truth ensures consistency across forms, filters, badges, and validators. Adding a new field or changing validation rules only requires editing this one file.

### Isolated Landing Page
The landing page lives in `src/pages/landing/` and is completely isolated from the library and detail pages. It can be deleted together with its route without breaking the app, making it easy to remove if you want a pure application experience.

### Utility-First Business Logic
All business logic (filtering, sorting, validation, statistics) lives in pure utility functions in `src/utils/`. These functions are:
- Easy to test (no React dependencies)
- Reusable across components
- Easy to reason about (no side effects)

## Design System

### Colors
- **Background**: `#FAF6EE` (cream)
- **Surface**: `#FFFFFF` (white)
- **Ink**: `#1C1A17` (dark)
- **Muted**: `#6B645A` (gray-brown)
- **Border**: `#E8E0D2` (light beige)
- **Accent**: `#B8812E` (gold)
- **Accent Soft**: `#F3E6CC` (light gold)
- **Success**: `#3F7D58` (green)
- **Danger**: `#B5483A` (red)

### Typography
- **Headings**: Playfair Display (serif)
- **Body/UI**: Inter (sans-serif)
- One key word per heading is highlighted in gold accent

### Components
- **Cards**: Rounded corners (16-20px), soft shadows, thin borders
- **Buttons**: Pill-shaped, primary (dark ink fill), secondary (outlined)
- **Chips**: Pill-shaped filter chips
- **Badges**: Status badges with color coding
- **Motion**: Subtle hover lift and fade transitions only

### Status Colors
- **Want to Read**: Slate (`#5B6B7A`)
- **Reading**: Gold (`#B8812E`)
- **Finished**: Success green (`#3F7D58`)

## Data Model

```javascript
Book {
  id: string (uuid)
  title: string (required)
  author: string (required)
  genre: string (optional, from GENRES list)
  status: 'want' | 'reading' | 'finished' (required)
  totalPages: number (optional, positive integer)
  currentPage: number (optional, 0 or positive, <= totalPages)
  rating: number (optional, 0-5)
  notes: string (optional, max 5000 chars)
  coverUrl: string (optional, valid URL)
  addedAt: string (ISO timestamp, required)
  finishedAt: string (ISO timestamp, optional)
}
```

## Testing

The project includes comprehensive unit tests for:
- Filter and sort utilities
- Validators
- Statistics calculations
- Cover generation
- LocalStorage repository (including corrupted data handling)

Run tests with:
```bash
npm test
```

All 67 tests pass successfully.

## Deployment

### Vercel
The project is ready for Vercel deployment. The `public/_redirects` file ensures client-side routing works correctly.

### Netlify
Similarly ready for Netlify with the same `_redirects` file.

### Environment Variables
- `VITE_STORAGE`: Set to `local` (default) or `api` to switch storage implementation

## Assumptions & Known Limitations

### Assumptions
- Users have modern browsers supporting ES6+ and CSS Grid
- LocalStorage is available and has sufficient space
- Book covers are optional; auto-generated covers are sufficient
- Single-user usage (no authentication or multi-user features)

### Known Limitations
- No backend authentication or user accounts
- No book search integration with external APIs (Google Books, Open Library, etc.)
- No social features (sharing, reviews from others, etc.)
- No reading goal tracking (books per year, etc.)
- No data synchronization across devices
- LocalStorage has a ~5MB limit (sufficient for thousands of books)

## What I'd Do Next

1. **External API Integration**: Add Google Books or Open Library API for book metadata lookup
2. **Reading Goals**: Add yearly reading goals with progress tracking
3. **Dark Mode**: Implement a dark theme toggle
4. **Backend Integration**: Add user authentication and cloud sync
5. **More Statistics**: Add reading streaks, monthly breakdowns, favorite genres
6. **Export Formats**: Add CSV and PDF export options
7. **Book Clubs**: Add features for tracking club reads and discussions
8. **Mobile App**: Build a React Native companion app

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React, Vite, and Tailwind CSS
