import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Carrinho = () => {
  const { items, updateQuantity, removeFromCart, getSubtotal, getTotal } = useCart();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const shipping = 10.00;
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <h1 className="mb-8 text-4xl font-bold text-foreground">
            Carrinho de Compras
          </h1>
          <Card>
            <CardContent className="py-16 text-center">
              <p className="mb-4 text-lg text-muted-foreground">
                Seu carrinho está vazio
              </p>
              <Link to="/categorias">
                <Button>Continuar Comprando</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Carrinho de Compras
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="h-32 w-24 rounded bg-muted flex items-center justify-center">
                        <span className="text-4xl">📚</span>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.author || 'Autor desconhecido'}
                          </p>
                          <p className="mt-2 font-bold text-primary">
                            R$ {(item.price || 0).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  Resumo do Pedido
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span>R$ {shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="mt-6 w-full" 
                  size="lg"
                  onClick={() => navigate('/pagamento')}
                >
                  Finalizar Compra
                </Button>
                <Link to="/categorias">
                  <Button variant="outline" className="mt-2 w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
