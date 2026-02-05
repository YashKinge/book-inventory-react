import { useParams, useNavigate } from 'react-router-dom';
import { useBook } from '@/hooks/useBooks';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Building, Book, Hash, Mail, User } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading } = useBook(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 bg-muted rounded" />
            <div className="h-12 w-2/3 bg-muted rounded" />
            <div className="h-6 w-1/3 bg-muted rounded" />
            <div className="h-40 bg-muted rounded" />
          </div>
        </main>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="font-display text-2xl text-foreground mb-2">Book Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Library
        </Button>

        {/* Book Header */}
        <div className="animate-slide-up">
          <Badge variant="secondary" className="mb-4">
            {book.genre}
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {book.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            by <span className="text-foreground font-medium">{book.author}</span>
          </p>
        </div>

        {/* Book Details Grid */}
        <div className="grid md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-card rounded-lg p-6 border border-border shadow-soft">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {book.overview}
              </p>
            </div>

            {/* Author Information */}
            <div className="bg-card rounded-lg p-6 border border-border shadow-soft">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Author Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{book.author}</p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <Mail className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{book.authorEmail}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-medium">{book.authorAge}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{book.authorAge} years old</p>
                    <p className="text-sm text-muted-foreground">Age</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border shadow-soft">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Book Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="font-medium text-foreground">{formatDate(book.publishedDate)}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Publisher</p>
                    <p className="font-medium text-foreground">{book.publisher}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Book className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pages</p>
                    <p className="font-medium text-foreground">{book.pages} pages</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <Hash className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">ISBN</p>
                    <p className="font-medium text-foreground font-mono text-sm">{book.isbn}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-secondary/50 rounded-lg p-6 border border-border">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-card rounded-lg">
                  <p className="text-2xl font-display font-bold text-primary">{book.pages}</p>
                  <p className="text-xs text-muted-foreground">Pages</p>
                </div>
                <div className="text-center p-3 bg-card rounded-lg">
                  <p className="text-2xl font-display font-bold text-accent">
                    {new Date().getFullYear() - new Date(book.publishedDate).getFullYear()}
                  </p>
                  <p className="text-xs text-muted-foreground">Years Old</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;
