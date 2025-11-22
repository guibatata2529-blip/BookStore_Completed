import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { ordersApi } from "@/lib/api";
import { toast } from "sonner";

const Pagamento = () => {
  const { items, getSubtotal, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const shipping = 10.00;
  const total = getTotal();

  const handlePayment = async () => {
    if (items.length === 0) {
      toast.error("Carrinho vazio");
      return;
    }

    setIsProcessing(true);

    try {
      const orderItems = items.map(item => ({
        bookId: item.id,
        quantity: item.quantity,
        unitPrice: item.price || 0,
        subtotal: (item.price || 0) * item.quantity,
      }));

      const order = await ordersApi.create(orderItems, paymentMethod);
      
      toast.success("Pedido realizado com sucesso!");
      clearCart();
      navigate(`/pedido-confirmado/${order.id}`);
    } catch (error: any) {
      console.error("Erro ao processar pedido:", error);
      toast.error(error.response?.data || "Erro ao processar pedido");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="py-16 text-center">
            <p className="mb-4 text-lg text-muted-foreground">
              Seu carrinho está vazio
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
      <div className="container mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-bookshelf">Pagamento</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="cursor-pointer">
                      Cartão de Crédito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit" className="cursor-pointer">
                      Cartão de Débito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="cursor-pointer">
                      PIX
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Card Details */}
            {(paymentMethod === "credit" || paymentMethod === "debit") && (
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Cartão</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input
                      id="cardName"
                      placeholder="Nome como está no cartão"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" maxLength={3} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* PIX Instructions */}
            {paymentMethod === "pix" && (
              <Card>
                <CardHeader>
                  <CardTitle>Pagamento via PIX</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Após confirmar o pedido, você receberá um QR Code para realizar o pagamento.
                  </p>
                  <div className="bg-muted p-4 rounded text-center">
                    <p className="text-sm text-muted-foreground">
                      O QR Code será gerado após a confirmação
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span>R$ {shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Desconto</span>
                    <span>-</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processando..." : "Pagar"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/carrinho")}
                  disabled={isProcessing}
                >
                  Voltar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagamento;
