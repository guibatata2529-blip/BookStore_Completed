import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros e refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for 401 e não for uma tentativa de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se o refresh falhar, limpa os tokens e redireciona para login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Types
export interface Book {
  id: number;
  title: string;
  author?: string;
  synopsis?: string;
  price?: number;
}

export interface Reservation {
  id: number;
  bookId: number;
  customerId: number;
  reservationDate: string;
  expirationDate: string;
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'COMPLETED';
  bookTitle?: string;
  bookAuthor?: string;
}

// Auth API
export const authApi = {
  async login(data: { email: string; password: string }) {
    const response = await api.post('/auth/login', data);
    const { accessToken, refreshToken, customer } = response.data;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    // Retorna os dados do cliente
    return {
      id: customer?.id,
      name: customer?.name,
      email: customer?.email,
    };
  },

  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post('/auth/customer', data);
    return response.data;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },
};

// Books API
export const booksApi = {
  async getAll(): Promise<Book[]> {
    const response = await api.get('/books');
    return response.data;
  },

  async getById(id: number): Promise<Book> {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  async create(book: Omit<Book, 'id'>): Promise<Book> {
    const response = await api.post('/books', book);
    return response.data;
  },

  async update(id: number, book: Partial<Book>): Promise<Book> {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/books/${id}`);
  },
};

// Reservations API
export const reservationsApi = {
  async create(bookId: number): Promise<Reservation> {
    const response = await api.post('/reservations', { bookId });
    return response.data;
  },

  async getAll(): Promise<Reservation[]> {
    const response = await api.get('/reservations');
    return response.data;
  },

  async getActive(): Promise<Reservation[]> {
    const response = await api.get('/reservations/active');
    return response.data;
  },

  async getById(id: number): Promise<Reservation> {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  async cancel(id: number): Promise<Reservation> {
    const response = await api.put(`/reservations/${id}/cancel`);
    return response.data;
  },
};

// Orders API
export interface OrderItem {
  bookId: number;
  bookTitle?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  orderDate: string;
  status: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  items: OrderItem[];
}

export const ordersApi = {
  async create(items: OrderItem[], paymentMethod: string): Promise<Order> {
    const response = await api.post('/orders', { items, paymentMethod });
    return response.data;
  },

  async getAll(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data;
  },

  async getById(id: number): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

export default api;
