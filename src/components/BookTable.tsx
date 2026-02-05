import { Book } from '@/types/book';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const BookTable = ({ books, onEdit, onDelete, isLoading }: BookTableProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-muted-foreground">Loading books...</div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="font-display text-xl text-foreground mb-2">No books yet</h3>
        <p className="text-muted-foreground">Add your first book to get started!</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden shadow-soft">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="font-display font-semibold text-foreground">Title</TableHead>
              <TableHead className="font-display font-semibold text-foreground">Author</TableHead>
              <TableHead className="font-display font-semibold text-foreground hidden md:table-cell">Genre</TableHead>
              <TableHead className="font-display font-semibold text-foreground hidden lg:table-cell">Publisher</TableHead>
              <TableHead className="font-display font-semibold text-foreground hidden sm:table-cell">Pages</TableHead>
              <TableHead className="font-display font-semibold text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book, index) => (
              <TableRow 
                key={book.id} 
                className="group transition-colors hover:bg-secondary/30 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell className="font-medium max-w-[200px]">
                  <span className="line-clamp-1">{book.title}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="line-clamp-1">{book.author}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="secondary" className="font-normal">
                    {book.genre}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground hidden lg:table-cell">
                  <span className="line-clamp-1">{book.publisher}</span>
                </TableCell>
                <TableCell className="text-muted-foreground hidden sm:table-cell">
                  {book.pages}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/book/${book.id}`)}
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(book)}
                      className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10"
                      title="Edit book"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(book.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      title="Delete book"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
