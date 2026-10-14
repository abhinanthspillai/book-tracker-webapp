import React from 'react'
import { Link } from 'react-router-dom'
import { APP_CONFIG } from '../../config/app.js'
import { GENRES } from '../../config/schema.js'
import Button from '../../components/Button.jsx'

function Landing() {
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif text-ink">
            {APP_CONFIG.name}
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="text-muted hover:text-ink transition-colors"
            >
              Features
            </Link>
            <Button size="sm" onClick={() => window.location.href = '/app'}>
              Open App
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-serif text-ink leading-tight mb-6">
              Track Your <span className="text-accent">Reading</span> Journey
            </h1>
            <p className="text-xl text-muted mb-8 max-w-lg">
              A beautiful, personal book tracker for readers who love to organize their library and never lose track of what they want to read next.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => window.location.href = '/app'}>
                Start Tracking
              </Button>
              <Button variant="secondary" size="lg" onClick={scrollToHowItWorks}>
                See How It Works
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-3 gap-4 transform rotate-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-lg shadow-soft-lg"
                  style={{
                    background: `linear-gradient(${45 + i * 30}deg, 
                      hsl(${30 + i * 40}, 70%, 60%), 
                      hsl(${50 + i * 40}, 60%, 45%))`,
                    transform: `translateY(${(i % 2) * 20}px)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface rounded-card-lg p-6 shadow-soft border border-border">
            <div className="w-12 h-12 bg-accent-soft rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-serif text-ink mb-2">Three Shelves</h3>
            <p className="text-muted">
              Organize your books into Want to Read, Reading, and Finished shelves. Move them easily as you progress.
            </p>
          </div>
          <div className="bg-surface rounded-card-lg p-6 shadow-soft border border-border">
            <div className="w-12 h-12 bg-accent-soft rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-serif text-ink mb-2">Ratings & Notes</h3>
            <p className="text-muted">
              Rate your books and keep personal notes. Remember what you loved or didn't love about each read.
            </p>
          </div>
          <div className="bg-surface rounded-card-lg p-6 shadow-soft border border-border">
            <div className="w-12 h-12 bg-accent-soft rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-serif text-ink mb-2">Progress Tracking</h3>
            <p className="text-muted">
              Track your reading progress with visual gauges. See how many pages you've read and how far you've come.
            </p>
          </div>
        </div>
      </section>

      {/* Browse by Genre */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif text-ink mb-8">Browse by Genre</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GENRES.slice(0, 8).map((genre) => (
            <Link
              key={genre}
              to={`/app?genre=${encodeURIComponent(genre)}`}
              className="relative aspect-square rounded-card-lg overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-soft opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-serif text-white font-medium">{genre}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Now on the Shelf */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif text-ink mb-8">Now on the Shelf</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
            { title: '1984', author: 'George Orwell' },
            { title: 'Atomic Habits', author: 'James Clear' },
            { title: 'The Midnight Library', author: 'Matt Haig' },
          ].map((book, i) => (
            <div
              key={i}
              className="bg-surface rounded-card p-4 shadow-soft border border-border hover:shadow-soft-lg transition-shadow"
            >
              <div
                className="aspect-[2/3] rounded-lg mb-3"
                style={{
                  background: `linear-gradient(${45 + i * 30}deg, 
                    hsl(${30 + i * 40}, 70%, 60%), 
                    hsl(${50 + i * 40}, 60%, 45%))`,
                }}
              />
              <h3 className="font-serif text-ink truncate">{book.title}</h3>
              <p className="text-sm text-muted truncate">{book.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif text-ink mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-serif">
              1
            </div>
            <h3 className="text-xl font-serif text-ink mb-2">Add Books</h3>
            <p className="text-muted">
              Add books to your library by title, author, and genre. Auto-generated covers make it look beautiful.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-serif">
              2
            </div>
            <h3 className="text-xl font-serif text-ink mb-2">Track Progress</h3>
            <p className="text-muted">
              Move books between shelves as you read. Update your progress page by page.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-serif">
              3
            </div>
            <h3 className="text-xl font-serif text-ink mb-2">Rate & Review</h3>
            <p className="text-muted">
              Rate finished books and add personal notes. Build your reading history over time.
            </p>
          </div>
        </div>
      </section>

      {/* Dark Benefits Section */}
      <section className="bg-ink py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-white mb-8 text-center">Why BookShelf?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <span className="text-3xl mb-3 block">🔒</span>
              <h3 className="text-lg font-serif text-white mb-2">Private & Secure</h3>
              <p className="text-gray-400 text-sm">
                Your data stays on your device. No accounts, no tracking, no cloud storage.
              </p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-3 block">🎨</span>
              <h3 className="text-lg font-serif text-white mb-2">Beautiful Design</h3>
              <p className="text-gray-400 text-sm">
                Clean, calm interface that makes organizing your library a pleasure.
              </p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-3 block">⚡</span>
              <h3 className="text-lg font-serif text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">
                Instant load times and smooth interactions. No waiting around.
              </p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-3 block">📱</span>
              <h3 className="text-lg font-serif text-white mb-2">Responsive</h3>
              <p className="text-gray-400 text-sm">
                Works perfectly on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-serif text-ink mb-4">Ready to Start Tracking?</h2>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          Join thousands of readers who have organized their reading journey with BookShelf.
        </p>
        <Button size="lg" onClick={() => window.location.href = '/app'}>
          Get Started Free
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="text-2xl font-serif text-ink">
                {APP_CONFIG.name}
              </Link>
              <p className="text-muted mt-2 text-sm">
                Track your reading journey in style.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link to="/app" className="hover:text-accent transition-colors">Library</Link></li>
                <li><Link to="/app" className="hover:text-accent transition-colors">Features</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-accent transition-colors">Help</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-ink mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-accent transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted">
            <p>© 2024 {APP_CONFIG.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
