import { useState, useEffect } from "react";
import { ordersApi, Order } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const MeusPedidos = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const data = await ordersApi.getAll();
      setOrders(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      toast.error("Erro ao carregar pedidos");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      PENDING: "secondary",
      CONFIRMED: "default",
      SHIPPED: "default",
      DELIVERED: "default",
      CANCELLED: "destructive",
    };

    const labels: Record<string, string> = {
      PENDING: "Pendente",
      CONFIRMED: "Confirmado",
      SHIPPED: "Enviado",
      DELIVERED: "Entregue",
      CANCELLED: "Cancelado",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bookshelf/10 to-warmPaper/10 p-8">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-bookshelf mb-2">
            Meus Pedidos
          </h1>
          <p className="text-muted-foreground">
            Você tem {orders.length} pedido(s)
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-lg text-muted-foreground mb-4">
                Você ainda não fez nenhum pedido.
              </p>
              <Button onClick={() => navigate("/")}>
                Começar a Comprar
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle>Pedido #{order.id}</CardTitle>
                      <CardDescription>
                        {new Date(order.orderDate).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </CardDescription>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Items */}
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.quantity}x {item.bookTitle}
                          </span>
                          <span className="font-medium">
                            R$ {item.subtotal.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t pt-4 flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Pagamento: {order.paymentMethod}
                        </p>
                        <p className="text-lg font-bold">
                          Total: R$ {order.total.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/pedido-confirmado/${order.id}`)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusPedidos;
