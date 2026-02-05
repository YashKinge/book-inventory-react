import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookApi } from '@/services/bookApi';
import { BookFormData } from '@/types/book';
import { toast } from 'sonner';

export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: bookApi.getAll,
  });
};

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => bookApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookData: BookFormData) => bookApi.create(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book added successfully!');
    },
    onError: (error) => {
      console.error('Error creating book:', error);
      toast.error('Failed to add book');
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, bookData }: { id: string; bookData: BookFormData }) =>
      bookApi.update(id, bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating book:', error);
      toast.error('Failed to update book');
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookId: string) => bookApi.delete(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    },
  });
};
