import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Book, BookFormData } from '@/types/book';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import * as React from 'react';

const bookSchema = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),

  author: z.string()
    .trim()
    .min(1, 'Author name is required')
    .max(100, 'Author name must be less than 100 characters'),

  authorEmail: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),

  authorAge: z.coerce
    .number()
    .int('Age must be a whole number')
    .min(1, 'Age must be at least 1')
    .max(150, 'Age must be less than 150'),

  publishedDate: z.string().min(1, 'Published date is required'),

  publisher: z.string()
    .trim()
    .min(1, 'Publisher is required')
    .max(150, 'Publisher name must be less than 150 characters'),

  overview: z.string()
    .trim()
    .min(10, 'Overview must be at least 10 characters')
    .max(2000, 'Overview must be less than 2000 characters'),

  genre: z.string()
    .trim()
    .min(1, 'Genre is required')
    .max(50, 'Genre must be less than 50 characters'),

  isbn: z.string()
    .trim()
    .min(10, 'ISBN must be at least 10 characters')
    .max(20, 'ISBN must be less than 20 characters'),

  pages: z.coerce
    .number()
    .int('Pages must be a whole number')
    .min(1, 'Must have at least 1 page')
    .max(10000, 'Pages must be less than 10000'),
});

interface BookFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BookFormData) => void;
  book?: Book;
  isLoading?: boolean;
}

export const BookForm = ({
  open,
  onClose,
  onSubmit,
  book,
  isLoading
}: BookFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      authorEmail: '',
      authorAge: 0,
      publishedDate: '',
      publisher: '',
      overview: '',
      genre: '',
      isbn: '',
      pages: 0,
    },
  });

  React.useEffect(() => {
    if (open) {
      reset(book || {
        title: '',
        author: '',
        authorEmail: '',
        authorAge: 0,
        publishedDate: '',
        publisher: '',
        overview: '',
        genre: '',
        isbn: '',
        pages: 0,
      });
    }
  }, [open, book, reset]);

  const handleFormSubmit = (data: BookFormData) => {
    onSubmit(data);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="font-display text-2xl">
            {book ? 'Edit Book' : 'Add New Book'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldContainer colSpan="md:col-span-2">
              <FieldLabel htmlFor="title" isRequired={true}>
                Title
              </FieldLabel>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter book title"
                className="bg-background"
              />
              <FieldError error={errors.title?.message} />
            </FormFieldContainer>

            <FormFieldContainer>
              <FieldLabel htmlFor="author" isRequired={true}>
                Author
              </FieldLabel>
              <Input
                id="author"
                {...register('author')}
                placeholder="Author name"
                className="bg-background"
              />
              <FieldError error={errors.author?.message} />
            </FormFieldContainer>

            <FormFieldContainer>
              <FieldLabel htmlFor="authorEmail" isRequired={true}>
                Author Email
              </FieldLabel>
              <Input
                id="authorEmail"
                type="email"
                {...register('authorEmail')}
                placeholder="author@example.com"
                className="bg-background"
              />
              <FieldError error={errors.authorEmail?.message} />
            </FormFieldContainer>

            <FormFieldContainer>
              <FieldLabel htmlFor="authorAge" isRequired={true}>
                Author Age
              </FieldLabel>
              <Input
                id="authorAge"
                type="number"
                {...register('authorAge')}
                placeholder="Age (must be a number)"
                className="bg-background"
              />
              <FieldError error={errors.authorAge?.message} />
            </FormFieldContainer>

            <FormFieldContainer>
              <FieldLabel htmlFor="publishedDate" isRequired={true}>
                Published Date
              </FieldLabel>
              <Input
                id="publishedDate"
                type="date"
                {...register('publishedDate')}
                className="bg-background"
              />
              <FieldError error={errors.publishedDate?.message} />
            </FormFieldContainer>

            <FormFieldContainer>
              <FieldLabel htmlFor="publisher" isRequired={true}>
                Publisher
              </FieldLabel>
              <Input
                id="publisher"
                {...register('publisher')}
                placeholder="Publisher name"
                className="bg-background"
              />
              <FieldError error={errors.publisher?.message} />
            </FormFieldContainer>

            <FormFieldContainer>
              <FieldLabel htmlFor="genre" isRequired={true}>
                Genre
              </FieldLabel>
              <Input
                id="genre"
                {...register('genre')}
                placeholder="e.g., Fiction, Non-fiction"
                className="bg-background"
              />
              <FieldError error={errors.genre?.message} />
            </FormFieldContainer>

            <FormFieldContainer>
              <FieldLabel htmlFor="isbn" isRequired={true}>
                ISBN
              </FieldLabel>
              <Input
                id="isbn"
                {...register('isbn')}
                placeholder="978-0000000000"
                className="bg-background"
              />
              <FieldError error={errors.isbn?.message} />
            </FormFieldContainer>

            <FormFieldContainer>
              <FieldLabel htmlFor="pages" isRequired={true}>
                Pages
              </FieldLabel>
              <Input
                id="pages"
                type="number"
                {...register('pages')}
                placeholder="Number of pages"
                className="bg-background"
              />
              <FieldError error={errors.pages?.message} />
            </FormFieldContainer>

            <FormFieldContainer colSpan="md:col-span-2">
              <FieldLabel htmlFor="overview" isRequired={true}>
                Overview
              </FieldLabel>
              <Textarea
                id="overview"
                {...register('overview')}
                placeholder="Brief description of the book..."
                rows={4}
                className="bg-background resize-none"
              />
              <FieldError error={errors.overview?.message} />
            </FormFieldContainer>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : book ? 'Update Book' : 'Add Book'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FormFieldContainer = ({
  children,
  colSpan = ""
}: {
  children: React.ReactNode;
  colSpan?: string;
}) => (
  <div className={`space-y-2 ${colSpan}`}>
    {children}
  </div>
);

const FieldLabel = ({
  htmlFor,
  children,
  isRequired = false
}: {
  htmlFor: string;
  children: React.ReactNode;
  isRequired?: boolean;
}) => (
  <Label htmlFor={htmlFor} className="font-medium">
    {children}
    {isRequired && <span className="text-destructive"> *</span>}
  </Label>
);

const FieldError = ({ error }: { error?: string }) => (
  <>
    {error && (
      <p className="text-sm text-destructive">{error}</p>
    )}
  </>
);
