import { useState } from 'react';
import { Book, BookFormData } from '@/types/book';
import { useBooks, useCreateBook, useUpdateBook, useDeleteBook } from '@/hooks/useBooks';
import { Header } from '@/components/Header';
import { BookTable } from '@/components/BookTable';
import { BookForm } from '@/components/BookForm';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, BookOpen } from 'lucide-react';

const Index = () => {
  const { data: books = [], isLoading } = useBooks();

  const createBook = useCreateBook();
  const updateBook = useUpdateBook();
  const deleteBook = useDeleteBook();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    book?: Book
  }>({ open: false });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = filterBooksBySearch(books, searchQuery);

  const handleAddBook = () => {
    setEditingBook(undefined);
    setIsFormOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: BookFormData) => {
    if (editingBook) {
      updateBook.mutate(
        { id: editingBook.id, data },
        { onSuccess: () => setIsFormOpen(false) }
      );
    } else {
      createBook.mutate(data, { onSuccess: () => setIsFormOpen(false) });
    }
  };

  const handleDeleteClick = (id: string) => {
    const book = books.find((b) => b.id === id);
    setDeleteConfirm({ open: true, book });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.book) {
      deleteBook.mutate(deleteConfirm.book.id, {
        onSuccess: () => setDeleteConfirm({ open: false }),
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <HeroSection
          onAddBook={handleAddBook}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalBooks={books.length}
        />

        <StatsCards books={books} />

        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <BookTable
            books={filteredBooks}
            onEdit={handleEditBook}
            onDelete={handleDeleteClick}
            isLoading={isLoading}
          />
        </div>

        <EmptySearchState
          isLoading={isLoading}
          searchQuery={searchQuery}
          filteredBooks={filteredBooks}
          totalBooks={books.length}
        />
      </main>

      <BookFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        book={editingBook}
        isSubmitting={createBook.isPending || updateBook.isPending}
      />

      <DeleteConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false })}
        onConfirm={handleDeleteConfirm}
        title={deleteConfirm.book?.title}
        isLoading={deleteBook.isPending}
      />
    </div>
  );
};

const filterBooksBySearch = (books: Book[], searchQuery: string): Book[] => {
  if (!searchQuery) return books;

  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

const HeroSection = ({
  onAddBook,
  searchQuery,
  onSearchChange,
  totalBooks
}: {
  onAddBook: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  totalBooks: number;
}) => (
  <div className="mb-8 animate-slide-up">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Your Library
        </h2>
        <p className="text-muted-foreground">
          {totalBooks} {totalBooks === 1 ? 'book' : 'books'} in your collection
        </p>
      </div>
      <Button onClick={onAddBook} className="gap-2 shadow-soft">
        <Plus className="h-4 w-4" />
        Add Book
      </Button>
    </div>

    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by title, author, or genre..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-card border-border"
      />
    </div>
  </div>
);

const StatsCards = ({ books }: { books: Book[] }) => {
  const totalBooks = books.length;
  const uniqueAuthors = new Set(books.map((b) => b.author)).size;
  const uniqueGenres = new Set(books.map((b) => b.genre)).size;
  const totalPages = books.reduce((acc, b) => acc + b.pages, 0).toLocaleString();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        icon={<BookOpen className="h-5 w-5 text-primary" />}
        value={totalBooks.toString()}
        label="Total Books"
        color="primary"
        delay="0ms"
      />

      <StatCard
        icon={<span className="text-accent font-bold">✍️</span>}
        value={uniqueAuthors.toString()}
        label="Authors"
        color="accent"
        delay="100ms"
      />

      <StatCard
        icon={<span className="text-secondary-foreground font-bold">📖</span>}
        value={uniqueGenres.toString()}
        label="Genres"
        color="secondary"
        delay="200ms"
      />

      <StatCard
        icon={<span className="text-muted-foreground font-bold">📄</span>}
        value={totalPages}
        label="Total Pages"
        color="muted"
        delay="300ms"
      />
    </div>
  );
};

const StatCard = ({
  icon,
  value,
  label,
  color,
  delay
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
  delay: string;
}) => {
  const bgColorClass = `bg-${color}/10`;
  const textColorClass = `text-${color}`;

  return (
    <div
      className={`bg-card rounded-lg p-4 border border-border shadow-soft animate-fade-in`}
      style={{ animationDelay: delay }}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
};

const EmptySearchState = ({
  isLoading,
  searchQuery,
  filteredBooks,
  totalBooks
}: {
  isLoading: boolean;
  searchQuery: string;
  filteredBooks: Book[];
  totalBooks: number;
}) => {
  if (!isLoading && searchQuery && filteredBooks.length === 0 && totalBooks > 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No books found matching "{searchQuery}"
        </p>
      </div>
    );
  }
  return null;
};

const BookFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  book,
  isSubmitting
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookFormData) => void;
  book?: Book;
  isSubmitting: boolean;
}) => (
  <BookForm
    open={isOpen}
    onClose={onClose}
    onSubmit={onSubmit}
    book={book}
    isLoading={isSubmitting}
  />
);

export default Index;
