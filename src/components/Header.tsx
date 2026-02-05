import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">
              Book Inventory
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Manage your collection
            </p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden md:inline">
            Your personal library manager
          </span>
        </nav>
      </div>
    </header>
  );
};
