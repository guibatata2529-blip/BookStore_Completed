import { useState, useEffect } from "react";
import { booksApi, reservationsApi, Book } from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Categorias = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  // Categorias baseadas nos livros disponíveis
  const categories = ["Ficção", "Romance", "Fantasia", "Clássicos", "Aventura"];

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
      <div className="container mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-bookshelf">Categorias</h1>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "Todos" ? "default" : "outline"}
            onClick={() => setSelectedCategory("Todos")}
          >
            Todos ({books.length})
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                >
                  Reservar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {books.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              Nenhum livro encontrado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categorias;
