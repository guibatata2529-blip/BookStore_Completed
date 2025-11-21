import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import { books } from "@/data/books";
import heroImage from "@/assets/bookstore-hero.jpg";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const featuredBooks = books.slice(0, 4);
  const bestSellers = books.slice(4, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/60" />
        </div>
        <div className="container relative mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-5xl font-bold text-foreground">
              Descubra Seu Próximo Livro Favorito
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Explore nossa coleção cuidadosamente selecionada de livros para
              todos os gostos e idades.
            </p>
            <Link to="/categorias">
              <Button size="lg" className="gap-2">
                Explorar Categorias
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">
            Livros em Destaque
          </h2>
          <Link to="/categorias">
            <Button variant="ghost" className="gap-2">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-foreground">
              Mais Vendidos
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-lg bg-primary p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
            Cadastre-se e Ganhe 10% de Desconto
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Crie sua conta e receba ofertas exclusivas diretamente no seu email.
          </p>
          <Link to="/cadastro">
            <Button size="lg" variant="secondary">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
