export interface Book {
  id: string;
  title: string;
  author: string;
  authorEmail: string;
  authorAge: number;
  publishedDate: string;
  publisher: string;
  overview: string;
  genre: string;
  isbn: string;
  pages: number;
  coverImage?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  authorEmail: string;
  authorAge: number;
  publishedDate: string;
  publisher: string;
  overview: string;
  genre: string;
  isbn: string;
  pages: number;
}
