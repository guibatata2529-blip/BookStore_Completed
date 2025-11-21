# Comandos cURL para BookController API

Base URL: `http://localhost:8080/books`

## 1. GET - Listar todos os livros

```bash
curl -X GET http://localhost:8080/books \
  -H "Content-Type: application/json"
```

## 2. GET - Buscar livro por ID

```bash
curl -X GET http://localhost:8080/books/1 \
  -H "Content-Type: application/json"
```

**Exemplo com ID diferente:**
```bash
curl -X GET http://localhost:8080/books/2 \
  -H "Content-Type: application/json"
```

## 3. POST - Criar novo livro

```bash
curl -X POST http://localhost:8080/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "O Senhor dos Anéis",
    "synopsis": "Uma trilogia épica de fantasia sobre a Terra Média"
  }'
```

**Exemplo alternativo:**
```bash
curl -X POST http://localhost:8080/books \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"1984\",\"synopsis\":\"Romance distópico de George Orwell\"}"
```

## 4. PUT - Atualizar livro por ID

```bash
curl -X PUT http://localhost:8080/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "O Senhor dos Anéis - Edição Especial",
    "synopsis": "Uma trilogia épica de fantasia sobre a Terra Média - Edição revisada"
  }'
```

**Exemplo alternativo:**
```bash
curl -X PUT http://localhost:8080/books/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"1984\",\"synopsis\":\"Romance distópico clássico\"}"
```

## 5. DELETE - Deletar livro por ID

```bash
curl -X DELETE http://localhost:8080/books/1 \
  -H "Content-Type: application/json"
```

**Exemplo com ID diferente:**
```bash
curl -X DELETE http://localhost:8080/books/2 \
  -H "Content-Type: application/json"
```

---

## Exemplos de uso no PowerShell (Windows)

### POST - Criar livro
```powershell
curl.exe -X POST http://localhost:8080/books `
  -H "Content-Type: application/json" `
  -d '{\"title\":\"O Senhor dos Anéis\",\"synopsis\":\"Uma trilogia épica de fantasia\"}'
```

### PUT - Atualizar livro
```powershell
curl.exe -X PUT http://localhost:8080/books/1 `
  -H "Content-Type: application/json" `
  -d '{\"title\":\"O Senhor dos Anéis - Edição Especial\",\"synopsis\":\"Edição revisada\"}'
```

---

## Respostas esperadas

### GET /books (sucesso)
```json
[
  {
    "id": 1,
    "title": "O Senhor dos Anéis",
    "synopsis": "Uma trilogia épica de fantasia sobre a Terra Média"
  }
]
```

### GET /books/{id} (sucesso)
```json
{
  "id": 1,
  "title": "O Senhor dos Anéis",
  "synopsis": "Uma trilogia épica de fantasia sobre a Terra Média"
}
```

### GET /books/{id} (não encontrado)
```
Book not found.
```

### POST /books (sucesso)
```json
{
  "id": 1,
  "title": "O Senhor dos Anéis",
  "synopsis": "Uma trilogia épica de fantasia sobre a Terra Média"
}
```

### PUT /books/{id} (sucesso)
```json
{
  "id": 1,
  "title": "O Senhor dos Anéis - Edição Especial",
  "synopsis": "Uma trilogia épica de fantasia sobre a Terra Média - Edição revisada"
}
```

### PUT /books/{id} (não encontrado)
```
Book not found.
```

### DELETE /books/{id} (sucesso)
```
Book deleted successfully.
```

### DELETE /books/{id} (não encontrado)
```
Book not found.
```

---

# Comandos cURL para CustomerController API (Autenticação)

Base URL: `http://localhost:8080/auth`

## 1. POST - Registrar novo cliente

```bash
curl -X POST http://localhost:8080/auth/customer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Exemplo alternativo:**
```bash
curl -X POST http://localhost:8080/auth/customer \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Maria Santos\",\"email\":\"maria@example.com\",\"password\":\"senha456\"}"
```

## 2. POST - Login (Autenticar cliente)

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Exemplo alternativo:**
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"maria@example.com\",\"password\":\"senha456\"}"
```

## 3. POST - Renovar token (Refresh Token)

```bash
curl -X POST http://localhost:8080/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "seu_refresh_token_aqui"
  }'
```

**Exemplo alternativo:**
```bash
curl -X POST http://localhost:8080/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\":\"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example\"}"
```

---

## Exemplos de uso no PowerShell (Windows)

### POST - Registrar cliente
```powershell
curl.exe -X POST http://localhost:8080/auth/customer `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"João Silva\",\"email\":\"joao@example.com\",\"password\":\"senha123\"}'
```

### POST - Login
```powershell
curl.exe -X POST http://localhost:8080/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"joao@example.com\",\"password\":\"senha123\"}'
```

### POST - Refresh Token
```powershell
curl.exe -X POST http://localhost:8080/auth/refresh-token `
  -H "Content-Type: application/json" `
  -d '{\"refreshToken\":\"seu_refresh_token_aqui\"}'
```

---

## Respostas esperadas

### POST /auth/customer (sucesso - 201 Created)
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@example.com"
}
```

### POST /auth/customer (erro - email já existe - 401 Unauthorized)
```
Customer already exists with this email
```

### POST /auth/login (sucesso - 200 OK)
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example"
}
```

### POST /auth/login (erro - credenciais inválidas - 401 Unauthorized)
```
Wrong credentials
```

### POST /auth/refresh-token (sucesso - 200 OK)
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.new_token",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.new_refresh_token"
}
```

### POST /auth/refresh-token (erro - token inválido - 401 Unauthorized)
```
Invalid refresh token
```

---

## Como usar no Postman

### 1. Registrar Cliente
- **Método:** POST
- **URL:** `http://localhost:8080/auth/customer`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

### 2. Login
- **Método:** POST
- **URL:** `http://localhost:8080/auth/login`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

### 3. Refresh Token
- **Método:** POST
- **URL:** `http://localhost:8080/auth/refresh-token`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "refreshToken": "cole_aqui_o_refresh_token_recebido_no_login"
}
```

### 4. Usar Access Token em requisições protegidas

Após fazer login, você receberá um `accessToken`. Use este token no header `Authorization` para acessar rotas protegidas:

- **Headers:**
  - `Authorization: Bearer seu_access_token_aqui`
  - `Content-Type: application/json`

**Exemplo:** Acessar rotas de livros com autenticação:
- **Método:** GET
- **URL:** `http://localhost:8080/books`
- **Headers:**
  - `Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example`
  - `Content-Type: application/json`

---

# Comandos cURL para ReservationController API (Reservas)

Base URL: `http://localhost:8080/reservations`

**⚠️ IMPORTANTE:** Todas as rotas de reservas requerem autenticação. Você precisa incluir o header `Authorization: Bearer {seu_access_token}` em todas as requisições.

## 1. POST - Criar nova reserva

```bash
curl -X POST http://localhost:8080/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_access_token_aqui" \
  -d '{
    "bookId": 1
  }'
```

**Exemplo alternativo:**
```bash
curl -X POST http://localhost:8080/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example" \
  -d "{\"bookId\":2}"
```

## 2. GET - Listar todas as minhas reservas

```bash
curl -X GET http://localhost:8080/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_access_token_aqui"
```

**Exemplo alternativo:**
```bash
curl -X GET http://localhost:8080/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example"
```

## 3. GET - Listar apenas reservas ativas

```bash
curl -X GET http://localhost:8080/reservations/active \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_access_token_aqui"
```

**Exemplo alternativo:**
```bash
curl -X GET http://localhost:8080/reservations/active \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example"
```

## 4. GET - Buscar reserva por ID

```bash
curl -X GET http://localhost:8080/reservations/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_access_token_aqui"
```

**Exemplo com ID diferente:**
```bash
curl -X GET http://localhost:8080/reservations/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_access_token_aqui"
```

## 5. PUT - Cancelar reserva

```bash
curl -X PUT http://localhost:8080/reservations/1/cancel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_access_token_aqui"
```

**Exemplo com ID diferente:**
```bash
curl -X PUT http://localhost:8080/reservations/2/cancel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_access_token_aqui"
```

---

## Exemplos de uso no PowerShell (Windows)

### POST - Criar reserva
```powershell
curl.exe -X POST http://localhost:8080/reservations `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer seu_access_token_aqui" `
  -d '{\"bookId\":1}'
```

### GET - Listar minhas reservas
```powershell
curl.exe -X GET http://localhost:8080/reservations `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer seu_access_token_aqui"
```

### GET - Listar reservas ativas
```powershell
curl.exe -X GET http://localhost:8080/reservations/active `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer seu_access_token_aqui"
```

### PUT - Cancelar reserva
```powershell
curl.exe -X PUT http://localhost:8080/reservations/1/cancel `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer seu_access_token_aqui"
```

---

## Respostas esperadas

### POST /reservations (sucesso - 201 Created)
```json
{
  "id": 1,
  "customerId": 1,
  "customerName": "João Silva",
  "bookId": 1,
  "bookTitle": "O Senhor dos Anéis",
  "reservationDate": "2024-01-15T10:30:00",
  "status": "ACTIVE"
}
```

### POST /reservations (erro - livro não encontrado - 400 Bad Request)
```
Book not found
```

### POST /reservations (erro - cliente não encontrado - 400 Bad Request)
```
Customer not found
```

### GET /reservations (sucesso)
```json
[
  {
    "id": 1,
    "customerId": 1,
    "customerName": "João Silva",
    "bookId": 1,
    "bookTitle": "O Senhor dos Anéis",
    "reservationDate": "2024-01-15T10:30:00",
    "status": "ACTIVE"
  },
  {
    "id": 2,
    "customerId": 1,
    "customerName": "João Silva",
    "bookId": 2,
    "bookTitle": "1984",
    "reservationDate": "2024-01-16T14:20:00",
    "status": "CANCELLED"
  }
]
```

### GET /reservations/active (sucesso)
```json
[
  {
    "id": 1,
    "customerId": 1,
    "customerName": "João Silva",
    "bookId": 1,
    "bookTitle": "O Senhor dos Anéis",
    "reservationDate": "2024-01-15T10:30:00",
    "status": "ACTIVE"
  }
]
```

### GET /reservations/{id} (sucesso)
```json
{
  "id": 1,
  "customerId": 1,
  "customerName": "João Silva",
  "bookId": 1,
  "bookTitle": "O Senhor dos Anéis",
  "reservationDate": "2024-01-15T10:30:00",
  "status": "ACTIVE"
}
```

### GET /reservations/{id} (não encontrado - 404 Not Found)
```
Reservation not found.
```

### PUT /reservations/{id}/cancel (sucesso)
```json
{
  "id": 1,
  "customerId": 1,
  "customerName": "João Silva",
  "bookId": 1,
  "bookTitle": "O Senhor dos Anéis",
  "reservationDate": "2024-01-15T10:30:00",
  "status": "CANCELLED"
}
```

### PUT /reservations/{id}/cancel (erro - reserva não encontrada - 400 Bad Request)
```
Reservation not found
```

### PUT /reservations/{id}/cancel (erro - reserva não pertence ao cliente - 400 Bad Request)
```
Reservation does not belong to this customer
```

### PUT /reservations/{id}/cancel (erro - apenas reservas ativas podem ser canceladas - 400 Bad Request)
```
Only active reservations can be cancelled
```

---

## Como usar no Postman

### 1. Criar Reserva
- **Método:** POST
- **URL:** `http://localhost:8080/reservations`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer seu_access_token_aqui`
- **Body (raw JSON):**
```json
{
  "bookId": 1
}
```

### 2. Listar Minhas Reservas
- **Método:** GET
- **URL:** `http://localhost:8080/reservations`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer seu_access_token_aqui`

### 3. Listar Reservas Ativas
- **Método:** GET
- **URL:** `http://localhost:8080/reservations/active`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer seu_access_token_aqui`

### 4. Buscar Reserva por ID
- **Método:** GET
- **URL:** `http://localhost:8080/reservations/1`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer seu_access_token_aqui`

### 5. Cancelar Reserva
- **Método:** PUT
- **URL:** `http://localhost:8080/reservations/1/cancel`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer seu_access_token_aqui`

---

## Fluxo completo de exemplo

### Passo 1: Registrar cliente
```bash
curl -X POST http://localhost:8080/auth/customer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### Passo 2: Fazer login e obter token
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Resposta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example",
  "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example"
}
```

### Passo 3: Criar reserva (usando o accessToken do passo 2)
```bash
curl -X POST http://localhost:8080/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example" \
  -d '{
    "bookId": 1
  }'
```

### Passo 4: Listar minhas reservas
```bash
curl -X GET http://localhost:8080/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example"
```

### Passo 5: Cancelar reserva
```bash
curl -X PUT http://localhost:8080/reservations/1/cancel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2FvQGV4YW1wbGUuY29tIn0.example"
```

---

## Status de Reserva

As reservas podem ter os seguintes status:

- **ACTIVE**: Reserva ativa (padrão ao criar)
- **CANCELLED**: Reserva cancelada pelo cliente
- **COMPLETED**: Reserva completada (para uso futuro)

---
