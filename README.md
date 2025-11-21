# 📚 BookStore - Sistema de Gerenciamento de Livraria

Sistema completo de gerenciamento de livraria com backend em Spring Boot e frontend em React + TypeScript.

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

## 🗄️ Banco de Dados

### Tabelas

**tb_books**
```sql
- id (BIGINT, PK, AUTO_INCREMENT)
- title (VARCHAR(255))
- synopsis (VARCHAR(255))
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

### Dados de Exemplo

O sistema inclui 10 livros pré-cadastrados:
1. 1984
2. O Senhor dos Anéis
3. Dom Casmurro
4. Harry Potter e a Pedra Filosofal
5. O Pequeno Príncipe
6. Cem Anos de Solidão
7. O Hobbit
8. A Revolução dos Bichos
9. O Código Da Vinci
10. Orgulho e Preconceito

## 🎨 Funcionalidades do Frontend

### Páginas

1. **Login/Registro** (`/login`)
   - Formulário de login
   - Formulário de registro
   - Validação de campos

2. **Livros** (`/`)
   - Lista de todos os livros
   - Botão para reservar
   - Sinopse de cada livro

3. **Minhas Reservas** (`/reservations`)
   - Lista de reservas do usuário
   - Status da reserva (Ativa, Cancelada, Concluída)
   - Botão para cancelar reserva ativa

4. **Categorias** (`/categorias`)
   - Filtro por categorias
   - Grid de livros
   - Opção de reservar

5. **Sobre Nós** (`/sobre`)
   - Informações sobre a livraria
   - História da empresa
   - Valores e missão

### Componentes Principais

**Header.tsx**
- Navegação principal
- Menu dropdown do usuário
- Campo de busca
- Botão de logout

**AuthContext.tsx**
- Gerenciamento de estado de autenticação
- Funções de login, registro e logout
- Verificação de autenticação

**api.ts**
- Configuração do Axios
- Interceptors para JWT
- Refresh token automático
- APIs organizadas (authApi, booksApi, reservationsApi)

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

1. **Inicie o backend** (porta 8081)
2. **Inicie o frontend** (porta 8080)
3. **Acesse** `http://localhost:8080`
4. **Crie uma conta** com nome, email e senha
5. **Faça login** com as credenciais criadas
6. **Navegue pelos livros** e faça reservas
7. **Veja suas reservas** em "Minhas Reservas"
8. **Teste o logout** clicando no ícone de usuário → "Sair"

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

---

**Desenvolvido com ❤️ para UNIFECAF**
