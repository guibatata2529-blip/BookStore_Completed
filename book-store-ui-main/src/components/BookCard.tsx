import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground">{book.author}</p>
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold text-primary">
            R$ {book.price.toFixed(2)}
          </span>
          <Button size="sm" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
