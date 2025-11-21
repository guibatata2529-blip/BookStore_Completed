import api from '@/lib/api';

export interface Reservation {
  id: number;
  bookId: number;
  customerId: number;
  reservationDate: string;
  expirationDate: string;
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  bookTitle?: string;
  bookAuthor?: string;
}

export interface CreateReservationData {
  bookId: number;
}

export const reservationService = {
  async createReservation(data: CreateReservationData): Promise<Reservation> {
    const response = await api.post('/reservations', data);
    return response.data;
  },

  async getMyReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations');
    return response.data;
  },

  async getMyActiveReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations/active');
    return response.data;
  },

  async getReservationById(id: number): Promise<Reservation> {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  async cancelReservation(id: number): Promise<Reservation> {
    const response = await api.put(`/reservations/${id}/cancel`);
    return response.data;
  },
};
