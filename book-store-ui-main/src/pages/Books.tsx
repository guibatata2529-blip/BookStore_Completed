// src/pages/Books.tsx
import { useState, useEffect } from 'react';
import { booksApi, reservationsApi, Book } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      const data = await booksApi.getAll();
      setBooks(data);
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
      toast.error('Erro ao carregar livros');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReserve = async (bookId: number) => {
    if (!isAuthenticated) {
      toast.error('Você precisa estar logado para fazer reservas');
      return;
    }

    try {
      await reservationsApi.create(bookId);
      toast.success('Livro reservado com sucesso!');
    } catch (error: any) {
      const message = error.response?.data || 'Erro ao reservar livro';
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando livros...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bookshelf/10 to-warmPaper/10 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-bookshelf mb-2">
            Catálogo de Livros
          </h1>
          <p className="text-muted-foreground">
            Encontrados {books.length} livros
          </p>
        </div>

        {books.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                Nenhum livro encontrado no momento.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{book.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {book.synopsis}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => handleReserve(book.id)}
                    className="w-full"
                    disabled={!isAuthenticated}
                  >
                    {isAuthenticated ? 'Reservar' : 'Faça login para reservar'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}