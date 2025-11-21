import api from '@/lib/api';

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publicationYear: number;
  availableCopies: number;
  totalCopies: number;
}

export const bookService = {
  async getBooks(): Promise<Book[]> {
    const response = await api.get('/books');
    return response.data;
  },

  async getBookById(id: number): Promise<Book> {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  async createBook(book: Omit<Book, 'id'>): Promise<Book> {
    const response = await api.post('/books', book);
    return response.data;
  },

  async updateBook(id: number, book: Partial<Book>): Promise<Book> {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  },

  async deleteBook(id: number): Promise<void> {
    await api.delete(`/books/${id}`);
  },
};
