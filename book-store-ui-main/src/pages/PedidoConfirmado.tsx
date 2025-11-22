import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { ordersApi, Order } from "@/lib/api";
import { toast } from "sonner";

const PedidoConfirmado = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrder(parseInt(orderId));
    }
  }, [orderId]);

  const loadOrder = async (id: number) => {
    try {
      const data = await ordersApi.getById(id);
      setOrder(data);
    } catch (error) {
      console.error("Erro ao carregar pedido:", error);
      toast.error("Erro ao carregar pedido");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando pedido...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="py-16 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              Pedido não encontrado
            </p>
            <Button onClick={() => navigate("/")}>
              Voltar para Livros
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bookshelf/10 to-warmPaper/10 p-8">
      <div className="container mx-auto max-w-3xl">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl">Pedido Confirmado!</CardTitle>
            <p className="text-muted-foreground mt-2">
              Pedido #{order.id} realizado com sucesso
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Detalhes do Pedido</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span>{new Date(order.orderDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-green-600">{order.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Forma de Pagamento:</span>
                  <span>{order.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Itens do Pedido</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.bookTitle}</p>
                      <p className="text-muted-foreground">
                        {item.quantity}x R$ {item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold">
                      R$ {item.subtotal.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>R$ {order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frete</span>
                  <span>R$ {order.shippingFee.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span>- R$ {order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <Button
                className="flex-1"
                onClick={() => navigate("/")}
              >
                Continuar Comprando
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/meus-pedidos")}
              >
                Ver Meus Pedidos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PedidoConfirmado;
