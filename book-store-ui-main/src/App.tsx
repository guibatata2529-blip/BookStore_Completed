// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/sonner';
import Login from '@/pages/Login';
import Books from '@/pages/Books';      
import MyReservations from '@/pages/MyReservations';
import Categorias from '@/pages/Categorias';
import Sobre from '@/pages/Sobre';
import Carrinho from '@/pages/Carrinho';
import Pagamento from '@/pages/Pagamento';
import PedidoConfirmado from '@/pages/PedidoConfirmado';
import MeusPedidos from '@/pages/MeusPedidos';
import Navbar from '@/components/Header';

// Componente para proteger rotas que precisam de autenticação
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {isAuthenticated && <Navbar />}
      
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } 
        />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/reservations" 
          element={
            <ProtectedRoute>
              <MyReservations />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/categorias" 
          element={
            <ProtectedRoute>
              <Categorias />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/sobre" 
          element={
            <ProtectedRoute>
              <Sobre />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/carrinho" 
          element={
            <ProtectedRoute>
              <Carrinho />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/pagamento" 
          element={
            <ProtectedRoute>
              <Pagamento />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/pedido-confirmado/:orderId" 
          element={
            <ProtectedRoute>
              <PedidoConfirmado />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/meus-pedidos" 
          element={
            <ProtectedRoute>
              <MeusPedidos />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <Toaster position="top-right" />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;