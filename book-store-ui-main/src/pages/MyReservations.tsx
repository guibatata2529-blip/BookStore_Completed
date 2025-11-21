// src/pages/MyReservations.tsx
import { useState, useEffect } from 'react';
import { reservationsApi, Reservation } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function MyReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setIsLoading(true);
      const data = await reservationsApi.getAll();
      setReservations(data);
    } catch (error) {
      console.error('Erro ao carregar reservas:', error);
      toast.error('Erro ao carregar suas reservas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await reservationsApi.cancel(id);
      toast.success('Reserva cancelada com sucesso!');
      loadReservations(); // Recarregar lista
    } catch (error: any) {
      const message = error.response?.data || 'Erro ao cancelar reserva';
      toast.error(message);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      ACTIVE: 'default',
      CANCELLED: 'destructive',
      COMPLETED: 'secondary',
    } as const;

    const labels = {
      ACTIVE: 'Ativa',
      CANCELLED: 'Cancelada',
      COMPLETED: 'Concluída',
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando suas reservas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bookshelf/10 to-warmPaper/10 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-bookshelf mb-2">
            Minhas Reservas
          </h1>
          <p className="text-muted-foreground">
            Você tem {reservations.length} reserva(s)
          </p>
        </div>

        {reservations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                Você ainda não fez nenhuma reserva.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle>{reservation.bookTitle}</CardTitle>
                      <CardDescription>
                        Reservado em {format(new Date(reservation.reservationDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </CardDescription>
                    </div>
                    {getStatusBadge(reservation.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Reserva #{reservation.id}
                    </div>
                    {reservation.status === 'ACTIVE' && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleCancel(reservation.id)}
                      >
                        Cancelar Reserva
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}