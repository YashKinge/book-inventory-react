import { Book, BookFormData } from '@/types/book';

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    authorEmail: 'fitzgerald@literature.com',
    authorAge: 44,
    publishedDate: '1925-04-10',
    publisher: "Charles Scribner's Sons",
    overview: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    genre: 'Literary Fiction',
    isbn: '978-0743273565',
    pages: 180,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    authorEmail: 'harper.lee@classics.com',
    authorAge: 89,
    publishedDate: '1960-07-11',
    publisher: 'J. B. Lippincott & Co.',
    overview: 'To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools.',
    genre: 'Southern Gothic',
    isbn: '978-0061120084',
    pages: 281,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    authorEmail: 'orwell@dystopia.org',
    authorAge: 46,
    publishedDate: '1949-06-08',
    publisher: 'Secker & Warburg',
    overview: '1984 is a dystopian social science fiction novel and cautionary tale by English writer George Orwell. It was published on 8 June 1949 as Orwell\'s ninth and final book completed in his lifetime.',
    genre: 'Dystopian Fiction',
    isbn: '978-0451524935',
    pages: 328,
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    authorEmail: 'jane.austen@regency.uk',
    authorAge: 41,
    publishedDate: '1813-01-28',
    publisher: 'T. Egerton, Whitehall',
    overview: 'Pride and Prejudice is an 1813 novel of manners by Jane Austen. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments.',
    genre: 'Romance',
    isbn: '978-0141439518',
    pages: 432,
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    authorEmail: 'salinger@holden.com',
    authorAge: 91,
    publishedDate: '1951-07-16',
    publisher: 'Little, Brown and Company',
    overview: 'The Catcher in the Rye is a novel by American author J. D. Salinger that was partially published in serial form in 1945–46 before being novelized in 1951. Originally published for adults, it has become popular among adolescent readers.',
    genre: 'Coming-of-age Fiction',
    isbn: '978-0316769488',
    pages: 234,
  },
  {
    id: '6',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    authorEmail: 'tolkien@middleearth.org',
    authorAge: 81,
    publishedDate: '1937-09-21',
    publisher: 'George Allen & Unwin',
    overview: 'The Hobbit, or There and Back Again is a children\'s fantasy novel by English author J. R. R. Tolkien. It was published in 1937 to wide critical acclaim, being nominated for the Carnegie Medal.',
    genre: 'Fantasy',
    isbn: '978-0547928227',
    pages: 310,
  },
];

let books: Book[] = [...mockBooks];

const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

class BookApiError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'BookApiError';
  }
}

const validateBookData = (bookData: BookFormData): void => {
  if (!bookData.title?.trim()) {
    throw new BookApiError('Book title is required', 400);
  }

  if (!bookData.author?.trim()) {
    throw new BookApiError('Book author is required', 400);
  }

  if (!bookData.genre?.trim()) {
    throw new BookApiError('Book genre is required', 400);
  }

  if (!bookData.isbn?.trim()) {
    throw new BookApiError('Book ISBN is required', 400);
  }

  if (bookData.pages <= 0) {
    throw new BookApiError('Book must have at least 1 page', 400);
  }

  if (!bookData.overview?.trim()) {
    throw new BookApiError('Book overview is required', 400);
  }

  if (bookData.overview.trim().length < 10) {
    throw new BookApiError('Book overview must be at least 10 characters', 400);
  }
};

export const bookApi = {
  async getAll(): Promise<Book[]> {
    try {
      await delay(300);
      return [...books];
    } catch (error) {
      console.error('Error retrieving all books:', error);
      throw new BookApiError('Failed to retrieve books', 500);
    }
  },

  async getById(id: string): Promise<Book | undefined> {
    try {
      if (!id) {
        throw new BookApiError('Book ID is required', 400);
      }

      await delay(200);
      const book = books.find(book => book.id === id);

      if (!book) {
        console.warn(`Book with ID ${id} not found`);
        return undefined;
      }

      return book;
    } catch (error) {
      if (error instanceof BookApiError) {
        throw error;
      }

      console.error(`Error retrieving book with ID ${id}:`, error);
      throw new BookApiError('Failed to retrieve book', 500);
    }
  },

  async create(bookData: BookFormData): Promise<Book> {
    try {
      validateBookData(bookData);

      const existingBook = books.find(book => book.isbn === bookData.isbn);
      if (existingBook) {
        throw new BookApiError(`A book with ISBN ${bookData.isbn} already exists`, 409);
      }

      await delay(300);

      const newBook: Book = {
        ...bookData,
        id: Date.now().toString(),
      };

      books.push(newBook);

      console.log(`Successfully created book: ${newBook.title}`);

      return newBook;
    } catch (error) {
      if (error instanceof BookApiError) {
        throw error;
      }

      console.error('Error creating book:', error);
      throw new BookApiError('Failed to create book', 500);
    }
  },

  async update(id: string, bookData: BookFormData): Promise<Book | undefined> {
    try {
      if (!id) {
        throw new BookApiError('Book ID is required', 400);
      }

      validateBookData(bookData);

      const bookIndex = books.findIndex(book => book.id === id);

      if (bookIndex === -1) {
        console.warn(`Attempted to update non-existent book with ID: ${id}`);
        return undefined;
      }

      if (bookData.isbn !== books[bookIndex].isbn) {
        const existingBook = books.find(book => book.isbn === bookData.isbn && book.id !== id);
        if (existingBook) {
          throw new BookApiError(`A book with ISBN ${bookData.isbn} already exists`, 409);
        }
      }

      await delay(300);

      books[bookIndex] = { ...books[bookIndex], ...bookData };

      console.log(`Successfully updated book: ${books[bookIndex].title}`);

      return books[bookIndex];
    } catch (error) {
      if (error instanceof BookApiError) {
        throw error;
      }

      console.error(`Error updating book with ID ${id}:`, error);
      throw new BookApiError('Failed to update book', 500);
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      if (!id) {
        throw new BookApiError('Book ID is required', 400);
      }

      const bookIndex = books.findIndex(book => book.id === id);

      if (bookIndex === -1) {
        console.warn(`Attempted to delete non-existent book with ID: ${id}`);
        return false;
      }

      await delay(200);

      books.splice(bookIndex, 1);

      console.log(`Successfully deleted book with ID: ${id}`);

      return true;
    } catch (error) {
      if (error instanceof BookApiError) {
        throw error;
      }

      console.error(`Error deleting book with ID ${id}:`, error);
      throw new BookApiError('Failed to delete book', 500);
    }
  },
};
