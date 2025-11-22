# 📚 BookStore - Sistema Completo de E-commerce de Livros

Sistema completo de e-commerce de livraria com carrinho de compras, gerenciamento de pedidos, autenticação JWT e interface moderna. Backend em Spring Boot e frontend em React + TypeScript.

## 🚀 Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.5.7**
- **Spring Security** com JWT
- **Spring Data JPA**
- **H2 Database** (desenvolvimento)
- **Flyway** (migrações de banco de dados)
- **Lombok**
- **Maven**

### Frontend
- **React 18**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Axios**
- **Shadcn/ui** (componentes)
- **Tailwind CSS**
- **Lucide React** (ícones)
- **Sonner** (notificações)

## 📁 Estrutura do Projeto

```
bookstore-main/                    # Backend (Spring Boot)
├── src/
│   ├── main/
│   │   ├── java/br/com/unifecaf/bookstore/
│   │   │   ├── config/           # Configurações (CORS, Security, JWT)
│   │   │   └── modules/
│   │   │       ├── books/        # Módulo de livros
│   │   │       ├── customers/    # Módulo de clientes/autenticação
│   │   │       └── reservations/ # Módulo de reservas
│   │   └── resources/
│   │       ├── application.properties
│   │       └── db/migration/     # Scripts Flyway
│   └── test/
├── pom.xml
└── mvnw / mvnw.cmd

book-store-ui-main/                # Frontend (React)
├── src/
│   ├── components/               # Componentes reutilizáveis
│   │   ├── ui/                  # Componentes Shadcn/ui
│   │   ├── Header.tsx           # Cabeçalho com navegação
│   │   └── ...
│   ├── contexts/
│   │   └── AuthContext.tsx      # Contexto de autenticação
│   ├── lib/
│   │   └── api.ts               # Configuração Axios e APIs
│   ├── pages/                   # Páginas da aplicação
│   │   ├── Login.tsx
│   │   ├── Books.tsx
│   │   ├── MyReservations.tsx
│   │   ├── Categorias.tsx
│   │   └── Sobre.tsx
│   ├── services/                # Serviços (legado)
│   ├── App.tsx                  # Rotas principais
│   └── main.tsx                 # Entry point
├── package.json
└── vite.config.ts
```

## 🔧 Configuração e Instalação

### Pré-requisitos
- **Java 17** ou superior
- **Node.js 18** ou superior
- **Maven** (incluído via wrapper)

### Backend

1. **Navegue até a pasta do backend:**
```bash
cd bookstore-main
```

2. **Execute o backend:**
```bash
# Windows
.\mvnw spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

O backend estará disponível em: `http://localhost:8081`

### Frontend

1. **Navegue até a pasta do frontend:**
```bash
cd book-store-ui-main
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o frontend:**
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:8080`

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Tokens)** para autenticação:

- **Access Token**: Expira em 15 minutos
- **Refresh Token**: Expira em 24 horas (1440 minutos)
- Refresh automático quando o access token expira

### Fluxo de Autenticação

1. Usuário faz login com email e senha
2. Backend retorna `accessToken`, `refreshToken` e dados do cliente
3. Frontend armazena tokens no `localStorage`
4. Todas as requisições incluem o `accessToken` no header `Authorization`
5. Quando o token expira (401), o sistema automaticamente usa o `refreshToken` para obter novos tokens

## 📡 API Endpoints

### Autenticação (`/auth`)
- `POST /auth/customer` - Registrar novo cliente
- `POST /auth/login` - Fazer login
- `POST /auth/refresh-token` - Renovar tokens

### Livros (`/books`)
- `GET /books` - Listar todos os livros (público)
- `GET /books/{id}` - Buscar livro por ID (público)
- `POST /books` - Criar livro (autenticado)
- `PUT /books/{id}` - Atualizar livro (autenticado)
- `DELETE /books/{id}` - Deletar livro (autenticado)

### Reservas (`/reservations`)
- `POST /reservations` - Criar reserva (autenticado)
- `GET /reservations` - Listar minhas reservas (autenticado)
- `GET /reservations/active` - Listar reservas ativas (autenticado)
- `GET /reservations/{id}` - Buscar reserva por ID (autenticado)
- `PUT /reservations/{id}/cancel` - Cancelar reserva (autenticado)

### Pedidos (`/orders`) 🆕
- `POST /orders` - Criar pedido/finalizar compra (autenticado)
- `GET /orders` - Listar meus pedidos (autenticado)
- `GET /orders/{id}` - Buscar pedido por ID (autenticado)

## 🗄️ Banco de Dados

### Tabelas

**tb_books**
```sql
- id (BIGINT, PK, AUTO_INCREMENT)
- title (VARCHAR(255))
- synopsis (VARCHAR(255))
- author (VARCHAR(255))
- price (DECIMAL(10, 2))
```

**tb_customers**
```sql
- id (BIGINT, PK, AUTO_INCREMENT)
- name (VARCHAR(255))
- email (VARCHAR(255), UNIQUE)
- password (VARCHAR(255))
- refresh_token (VARCHAR(500))
```

**tb_reservations**
```sql
- id (BIGINT, PK, AUTO_INCREMENT)
- book_id (BIGINT, FK)
- customer_id (BIGINT, FK)
- reservation_date (TIMESTAMP)
- status (VARCHAR(50))
```

**tb_orders** 🆕
```sql
- id (BIGINT, PK, AUTO_INCREMENT)
- customer_id (BIGINT, FK)
- order_date (TIMESTAMP)
- status (VARCHAR(50))
- subtotal (DECIMAL(10, 2))
- shipping_fee (DECIMAL(10, 2))
- discount (DECIMAL(10, 2))
- total (DECIMAL(10, 2))
- payment_method (VARCHAR(50))
```

**tb_order_items** 🆕
```sql
- id (BIGINT, PK, AUTO_INCREMENT)
- order_id (BIGINT, FK)
- book_id (BIGINT, FK)
- quantity (INT)
- unit_price (DECIMAL(10, 2))
- subtotal (DECIMAL(10, 2))
```

### Dados de Exemplo

O sistema inclui **30 livros pré-cadastrados** com preços variados:

**Clássicos Brasileiros:**
1. Dom Casmurro - Machado de Assis (R$ 35,00)
2. Memórias Póstumas de Brás Cubas - Machado de Assis (R$ 31,90)
3. O Cortiço - Aluísio Azevedo (R$ 28,90)
4. Capitães da Areia - Jorge Amado (R$ 36,90)
5. Vidas Secas - Graciliano Ramos (R$ 30,90)
6. Grande Sertão: Veredas - Guimarães Rosa (R$ 54,90)
7. A Hora da Estrela - Clarice Lispector (R$ 28,90)
8. Iracema - José de Alencar (R$ 26,90)
9. O Guarani - José de Alencar (R$ 33,90)
10. A Moreninha - Joaquim Manuel de Macedo (R$ 24,90)

**Literatura Internacional:**
11. 1984 - George Orwell (R$ 45,90)
12. O Senhor dos Anéis - J.R.R. Tolkien (R$ 89,90)
13. Harry Potter e a Pedra Filosofal - J.K. Rowling (R$ 55,90)
14. O Pequeno Príncipe - Antoine de Saint-Exupéry (R$ 29,90)
15. Cem Anos de Solidão - Gabriel García Márquez (R$ 52,90)
16. O Hobbit - J.R.R. Tolkien (R$ 48,90)
17. A Revolução dos Bichos - George Orwell (R$ 38,90)
18. O Código Da Vinci - Dan Brown (R$ 42,90)
19. Orgulho e Preconceito - Jane Austen (R$ 39,90)
20. A Metamorfose - Franz Kafka (R$ 25,90)

**E mais 10 títulos incluindo:**
- O Alquimista - Paulo Coelho
- A Culpa é das Estrelas - John Green
- O Auto da Compadecida - Ariano Suassuna
- Ensaio sobre a Cegueira - José Saramago
- O Nome da Rosa - Umberto Eco
- E outros...

## 🎨 Funcionalidades do Frontend

### Páginas

1. **Login/Registro** (`/login`)
   - Formulário de login
   - Formulário de registro
   - Validação de campos

2. **Livros** (`/`)
   - Lista de todos os livros com preços
   - Botão "Comprar" para adicionar ao carrinho
   - Botão "Reservar" para fazer reserva
   - Exibição de autor e sinopse

3. **Carrinho de Compras** (`/carrinho`) 🆕
   - Visualização de itens no carrinho
   - Ajuste de quantidade (+/-)
   - Remoção de itens
   - Cálculo automático de subtotal e total
   - Frete fixo de R$ 10,00
   - Botão para finalizar compra

4. **Pagamento** (`/pagamento`) 🆕
   - Seleção de forma de pagamento:
     - Cartão de Crédito
     - Cartão de Débito
     - PIX
   - Formulário de dados do cartão
   - Resumo do pedido
   - Confirmação de compra

5. **Pedido Confirmado** (`/pedido-confirmado/:id`) 🆕
   - Confirmação visual com ícone de sucesso
   - Detalhes completos do pedido
   - Lista de itens comprados
   - Valores (subtotal, frete, total)
   - Botões para continuar comprando ou ver pedidos

6. **Meus Pedidos** (`/meus-pedidos`) 🆕
   - Histórico completo de compras
   - Status de cada pedido
   - Detalhes de itens e valores
   - Data e hora do pedido
   - Forma de pagamento utilizada

7. **Minhas Reservas** (`/reservations`)
   - Lista de reservas do usuário
   - Status da reserva (Ativa, Cancelada, Concluída)
   - Botão para cancelar reserva ativa

8. **Categorias** (`/categorias`)
   - Filtro por categorias
   - Grid de livros com preços
   - Botões de comprar e reservar

9. **Sobre Nós** (`/sobre`)
   - Informações sobre a livraria
   - História da empresa
   - Valores e missão

### Componentes Principais

**Header.tsx**
- Navegação principal
- Menu dropdown do usuário
- Campo de busca
- Ícone do carrinho com contador de itens 🆕
- Botão de logout

**AuthContext.tsx**
- Gerenciamento de estado de autenticação
- Funções de login, registro e logout
- Verificação de autenticação

**CartContext.tsx** 🆕
- Gerenciamento global do carrinho
- Adicionar/remover itens
- Atualizar quantidades
- Cálculo de totais
- Persistência no localStorage

**api.ts**
- Configuração do Axios
- Interceptors para JWT
- Refresh token automático
- APIs organizadas:
  - `authApi` - Autenticação
  - `booksApi` - Livros
  - `reservationsApi` - Reservas
  - `ordersApi` - Pedidos 🆕

## 🔒 Segurança

### Backend
- **CORS** configurado para aceitar requisições do frontend
- **CSRF** desabilitado (API stateless)
- **Senhas** criptografadas com BCrypt
- **JWT** para autenticação stateless
- **Endpoints públicos**: `/auth/**`, `GET /books/**`
- **Endpoints protegidos**: Todos os outros requerem autenticação

### Frontend
- Tokens armazenados no `localStorage`
- Rotas protegidas com `ProtectedRoute`
- Redirecionamento automático para login se não autenticado
- Logout limpa todos os dados de autenticação

## 🚦 CORS

O backend está configurado para aceitar requisições de:
- `http://localhost:8080` (Frontend Vite)
- `http://localhost:5173` (Vite dev server alternativo)
- `http://localhost:3000` (Create React App)

## 📝 Variáveis de Ambiente

### Backend (`application.properties`)
```properties
server.port=8081
spring.datasource.url=jdbc:h2:~/test
jwt.secret-key=6/ABsIPLhA1u9aGzoU1Wq9tryYKKSdFt8ECgiWPYxy4=
jwt.access-token.expiration=15
jwt.refresh-token.expiration=1440
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:8081
```

## 🧪 Testando a Aplicação

### Fluxo Completo de Compra

1. **Inicie o backend** (porta 8081)
2. **Inicie o frontend** (porta 8080)
3. **Acesse** `http://localhost:8080`
4. **Crie uma conta** com nome, email e senha
5. **Faça login** com as credenciais criadas
6. **Navegue pelos livros** (30 livros disponíveis com preços)
7. **Adicione livros ao carrinho** clicando em "Comprar"
8. **Veja o contador** no ícone do carrinho aumentar
9. **Acesse o carrinho** clicando no ícone
10. **Ajuste quantidades** ou remova itens
11. **Clique em "Finalizar Compra"**
12. **Escolha a forma de pagamento** (Crédito, Débito ou PIX)
13. **Preencha os dados** (se cartão)
14. **Confirme o pedido**
15. **Veja a confirmação** com todos os detalhes
16. **Acesse "Meus Pedidos"** para ver o histórico

### Outras Funcionalidades

- **Fazer reservas** de livros (botão "Reservar")
- **Ver reservas** em "Minhas Reservas"
- **Cancelar reservas** ativas
- **Explorar categorias** de livros
- **Buscar livros** (campo de busca no header)
- **Fazer logout** (menu do usuário → "Sair")

## 🐛 Troubleshooting

### Backend não inicia
- Verifique se a porta 8081 está disponível
- Verifique se o Java 17+ está instalado
- Delete o arquivo `~/test.mv.db` se houver erro de banco bloqueado

### Frontend não conecta ao backend
- Verifique se o backend está rodando
- Verifique o arquivo `.env` com a URL correta
- Verifique o console do navegador para erros de CORS

### Erro 401 ao fazer requisições
- Verifique se o token está sendo enviado
- Tente fazer logout e login novamente
- Limpe o `localStorage` do navegador

## ✨ Funcionalidades Implementadas

### Backend
- ✅ Autenticação JWT com refresh token
- ✅ CRUD completo de livros
- ✅ Sistema de reservas
- ✅ Sistema de pedidos/compras 🆕
- ✅ Cálculo automático de totais
- ✅ Múltiplas formas de pagamento
- ✅ Histórico de pedidos
- ✅ 30 livros pré-cadastrados com preços

### Frontend
- ✅ Interface moderna com Tailwind CSS
- ✅ Autenticação completa
- ✅ Carrinho de compras funcional 🆕
- ✅ Checkout com múltiplas formas de pagamento 🆕
- ✅ Confirmação de pedido 🆕
- ✅ Histórico de compras 🆕
- ✅ Contador de itens no carrinho 🆕
- ✅ Persistência do carrinho no localStorage
- ✅ Sistema de reservas
- ✅ Navegação completa
- ✅ Responsivo para mobile

## 💰 Sistema de Preços

Os livros possuem preços variados de **R$ 24,90** a **R$ 89,90**:
- Livros clássicos: R$ 24,90 - R$ 35,00
- Livros populares: R$ 35,00 - R$ 50,00
- Edições especiais: R$ 50,00 - R$ 89,90

**Frete fixo**: R$ 10,00 para todos os pedidos

## 📦 Build para Produção

### Backend
```bash
cd bookstore-main
.\mvnw clean package
java -jar target/bookstore-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd book-store-ui-main
npm run build
# Os arquivos estarão em dist/
```

## 👥 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais - UNIFECAF.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## 🎯 Tecnologias e Padrões Utilizados

### Backend
- **Spring Boot 3.5.7** - Framework principal
- **Spring Security** - Autenticação e autorização
- **JWT** - Tokens de acesso e refresh
- **Spring Data JPA** - Persistência de dados
- **Flyway** - Versionamento de banco de dados
- **H2 Database** - Banco de dados em memória
- **Lombok** - Redução de boilerplate
- **Maven** - Gerenciamento de dependências

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **Context API** - Gerenciamento de estado
- **Shadcn/ui** - Componentes UI
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Sonner** - Notificações toast

### Padrões de Projeto
- **Repository Pattern** - Acesso a dados
- **DTO Pattern** - Transferência de dados
- **Service Layer** - Lógica de negócio
- **Context Pattern** - Estado global (React)
- **Interceptor Pattern** - Requisições HTTP

## 📈 Melhorias Futuras

- [ ] Sistema de avaliações e comentários
- [ ] Filtros avançados de busca
- [ ] Wishlist (lista de desejos)
- [ ] Cupons de desconto
- [ ] Rastreamento de pedidos
- [ ] Notificações por email
- [ ] Painel administrativo
- [ ] Relatórios de vendas
- [ ] Integração com gateway de pagamento real
- [ ] Sistema de recomendações

---

**Desenvolvido com ❤️ para UNIFECAF**

**Versão**: 2.0.0 - Sistema Completo de E-commerce
