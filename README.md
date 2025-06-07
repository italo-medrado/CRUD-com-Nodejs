# CRUD de Filmes Favoritos - Node.js

## 📝 Descrição do Projeto

Este projeto implementa um CRUD (Create, Read, Update, Delete) simples utilizando Node.js e Express.js para gerenciar uma lista de filmes favoritos. Os dados são armazenados em memória (array) sem necessidade de banco de dados.

## 🎯 Tema Escolhido

**Lista de Filmes Favoritos** - Uma API para gerenciar sua coleção pessoal de filmes.

## 📊 Estrutura dos Dados

Cada filme contém os seguintes campos:
- **id**: Número único identificador (gerado automaticamente)
- **titulo**: Nome do filme (string, obrigatório)
- **diretor**: Nome do diretor (string, obrigatório)
- **ano**: Ano de lançamento (number, obrigatório, entre 1900 e ano atual)
- **genero**: Gênero do filme (string, obrigatório)
- **dataCriacao**: Data de criação do registro (ISO string, automático)
- **dataAtualizacao**: Data da última atualização (ISO string, automático)

## 🚀 Como Executar

1. Instalar dependências:
```bash
npm install
```

2. Iniciar o servidor:
```bash
node server.js
```

3. O servidor estará rodando em: `http://localhost:3000`

## 📋 Rotas da API

### 1. **GET /** - Informações da API
**Descrição**: Retorna informações gerais sobre a API e suas rotas disponíveis.

**Resposta**:
```json
{
  "mensagem": "API CRUD de Filmes Favoritos",
  "rotas": {
    "GET /filmes": "Listar todos os filmes",
    "GET /filmes/:id": "Buscar filme por ID",
    "POST /filmes": "Adicionar novo filme",
    "PUT /filmes/:id": "Atualizar filme por ID",
    "DELETE /filmes/:id": "Remover filme por ID"
  }
}
```

### 2. **CREATE - POST /filmes** - Adicionar Filme
**Descrição**: Adiciona um novo filme à lista.

**Body (JSON)**:
```json
{
  "titulo": "Inception",
  "diretor": "Christopher Nolan",
  "ano": 2010,
  "genero": "Ficção Científica"
}
```

**Resposta de Sucesso (201)**:
```json
{
  "mensagem": "Filme adicionado com sucesso",
  "filme": {
    "id": 1,
    "titulo": "Inception",
    "diretor": "Christopher Nolan",
    "ano": 2010,
    "genero": "Ficção Científica",
    "dataCriacao": "2025-06-06T10:30:00.000Z"
  }
}
```

### 3. **READ - GET /filmes** - Listar Todos os Filmes
**Descrição**: Retorna todos os filmes cadastrados.

**Resposta de Sucesso (200)**:
```json
{
  "total": 2,
  "filmes": [
    {
      "id": 1,
      "titulo": "Inception",
      "diretor": "Christopher Nolan",
      "ano": 2010,
      "genero": "Ficção Científica",
      "dataCriacao": "2025-06-06T10:30:00.000Z"
    },
    {
      "id": 2,
      "titulo": "The Matrix",
      "diretor": "Lana Wachowski",
      "ano": 1999,
      "genero": "Ação",
      "dataCriacao": "2025-06-06T10:32:00.000Z"
    }
  ]
}
```

### 4. **READ - GET /filmes/:id** - Buscar Filme por ID
**Descrição**: Retorna um filme específico pelo seu ID.

**Exemplo**: `GET /filmes/1`

**Resposta de Sucesso (200)**:
```json
{
  "id": 1,
  "titulo": "Inception",
  "diretor": "Christopher Nolan",
  "ano": 2010,
  "genero": "Ficção Científica",
  "dataCriacao": "2025-06-06T10:30:00.000Z"
}
```

### 5. **UPDATE - PUT /filmes/:id** - Atualizar Filme
**Descrição**: Atualiza todos os dados de um filme existente.

**Exemplo**: `PUT /filmes/1`

**Body (JSON)**:
```json
{
  "titulo": "Inception",
  "diretor": "Christopher Nolan",
  "ano": 2010,
  "genero": "Drama"
}
```

**Resposta de Sucesso (200)**:
```json
{
  "mensagem": "Filme atualizado com sucesso",
  "filme": {
    "id": 1,
    "titulo": "Inception",
    "diretor": "Christopher Nolan",
    "ano": 2010,
    "genero": "Drama",
    "dataCriacao": "2025-06-06T10:30:00.000Z",
    "dataAtualizacao": "2025-06-06T10:35:00.000Z"
  }
}
```

### 6. **DELETE - DELETE /filmes/:id** - Remover Filme
**Descrição**: Remove um filme da lista pelo seu ID.

**Exemplo**: `DELETE /filmes/1`

**Resposta de Sucesso (200)**:
```json
{
  "mensagem": "Filme removido com sucesso",
  "filme": {
    "id": 1,
    "titulo": "Inception",
    "diretor": "Christopher Nolan",
    "ano": 2010,
    "genero": "Drama",
    "dataCriacao": "2025-06-06T10:30:00.000Z"
  }
}
```

## ❌ Respostas de Erro

### Campos Obrigatórios (400)
```json
{
  "erro": "Todos os campos são obrigatórios",
  "campos": ["titulo", "diretor", "ano", "genero"]
}
```

### Filme Não Encontrado (404)
```json
{
  "erro": "Filme não encontrado"
}
```

### Ano Inválido (400)
```json
{
  "erro": "Ano deve ser um número válido entre 1900 e o ano atual"
}
```

### ID Inválido (400)
```json
{
  "erro": "ID deve ser um número válido"
}
```

## 🧪 Testando com Postman/Insomnia

### Sequência de Testes Recomendada:

1. **GET /** - Verificar se a API está funcionando
2. **POST /filmes** - Adicionar alguns filmes
3. **GET /filmes** - Listar todos os filmes
4. **GET /filmes/1** - Buscar um filme específico
5. **PUT /filmes/1** - Atualizar um filme
6. **DELETE /filmes/1** - Remover um filme

### Exemplos de Filmes para Teste:

```json
{
  "titulo": "The Matrix",
  "diretor": "Lana Wachowski",
  "ano": 1999,
  "genero": "Ação"
}
```

```json
{
  "titulo": "Interstellar",
  "diretor": "Christopher Nolan",
  "ano": 2014,
  "genero": "Ficção Científica"
}
```

```json
{
  "titulo": "Parasite",
  "diretor": "Bong Joon-ho",
  "ano": 2019,
  "genero": "Thriller"
}
```


---

**Desenvolvido como parte da atividade de Networking Projects - CRUD com Node.js**
