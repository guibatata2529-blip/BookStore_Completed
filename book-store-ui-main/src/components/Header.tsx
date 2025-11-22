import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, BookOpen, Search, BookMarked, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const cartItemCount = getItemCount();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implementar busca futuramente
      console.log("Buscar:", searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">BookStore</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Livros
          </Link>
          <Link
            to="/reservations"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Minhas Reservas
          </Link>
          <Link
            to="/categorias"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Categorias
          </Link>
          <Link
            to="/sobre"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Sobre Nós
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2">
            <Input
              type="search"
              placeholder="Buscar livros..."
              className="w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="icon" variant="secondary">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <Button 
            size="icon" 
            variant="ghost"
            onClick={() => navigate("/carrinho")}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                variant="destructive"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/reservations")}>
                <BookMarked className="mr-2 h-4 w-4" />
                Minhas Reservas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/meus-pedidos")}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Meus Pedidos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
