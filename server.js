const express = require('express');
const app = express();
const port = 3000;

// Array em memória para armazenar os filmes
let filmes = [];

// Variável para gerar IDs únicos
let proximoId = 1;

// Middleware para processar JSON nas requisições
app.use(express.json());

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API CRUD de Filmes Favoritos',
    rotas: {
      'GET /filmes': 'Listar todos os filmes',
      'GET /filmes/:id': 'Buscar filme por ID',
      'POST /filmes': 'Adicionar novo filme',
      'PUT /filmes/:id': 'Atualizar filme por ID',
      'DELETE /filmes/:id': 'Remover filme por ID'
    }
  });
});

// CREATE - Rota POST /filmes: Adicionar um novo filme
app.post('/filmes', (req, res) => {
  const { titulo, diretor, ano, genero } = req.body;
  
  // Validação dos campos obrigatórios
  if (!titulo || !diretor || !ano || !genero) {
    return res.status(400).json({ 
      erro: 'Todos os campos são obrigatórios',
      campos: ['titulo', 'diretor', 'ano', 'genero']
    });
  }

  // Validação do tipo de dados
  if (typeof ano !== 'number' || ano < 1900 || ano > new Date().getFullYear()) {
    return res.status(400).json({ 
      erro: 'Ano deve ser um número válido entre 1900 e o ano atual'
    });
  }

  const novoFilme = { 
    id: proximoId, 
    titulo, 
    diretor, 
    ano, 
    genero,
    dataCriacao: new Date().toISOString()
  };
  
  filmes.push(novoFilme);
  proximoId++;
  
  res.status(201).json({ 
    mensagem: 'Filme adicionado com sucesso', 
    filme: novoFilme
  });
});

// READ - Rota GET /filmes: Retornar todos os filmes
app.get('/filmes', (req, res) => {
  if (filmes.length === 0) {
    return res.status(200).json({ 
      mensagem: 'Nenhum filme encontrado',
      filmes: []
    });
  }
  
  res.status(200).json({
    total: filmes.length,
    filmes: filmes
  });
});

// READ - Rota GET /filmes/:id: Retornar um filme por ID
app.get('/filmes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID deve ser um número válido' });
  }
  
  const filme = filmes.find(f => f.id === id);
  
  if (!filme) {
    return res.status(404).json({ erro: 'Filme não encontrado' });
  }
  
  res.status(200).json(filme);
});

// UPDATE - Rota PUT /filmes/:id: Atualizar um filme por ID
app.put('/filmes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID deve ser um número válido' });
  }
  
  const index = filmes.findIndex(f => f.id === id);
  
  if (index === -1) {
    return res.status(404).json({ erro: 'Filme não encontrado' });
  }
  
  const { titulo, diretor, ano, genero } = req.body;
  
  // Validação dos campos obrigatórios
  if (!titulo || !diretor || !ano || !genero) {
    return res.status(400).json({ 
      erro: 'Todos os campos são obrigatórios',
      campos: ['titulo', 'diretor', 'ano', 'genero']
    });
  }

  // Validação do tipo de dados
  if (typeof ano !== 'number' || ano < 1900 || ano > new Date().getFullYear()) {
    return res.status(400).json({ 
      erro: 'Ano deve ser um número válido entre 1900 e o ano atual'
    });
  }
  
  const filmeAtualizado = { 
    id, 
    titulo, 
    diretor, 
    ano, 
    genero,
    dataCriacao: filmes[index].dataCriacao,
    dataAtualizacao: new Date().toISOString()
  };
  
  filmes[index] = filmeAtualizado;
  
  res.status(200).json({ 
    mensagem: 'Filme atualizado com sucesso',
    filme: filmeAtualizado
  });
});

// DELETE - Rota DELETE /filmes/:id: Remover um filme por ID
app.delete('/filmes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    return res.status(400).json({ erro: 'ID deve ser um número válido' });
  }
  
  const index = filmes.findIndex(f => f.id === id);
  
  if (index === -1) {
    return res.status(404).json({ erro: 'Filme não encontrado' });
  }
  
  const filmeRemovido = filmes.splice(index, 1)[0];
  
  res.status(200).json({ 
    mensagem: 'Filme removido com sucesso',
    filme: filmeRemovido
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`🎬 Servidor rodando em http://localhost:${port}`);
  console.log('🚀 API CRUD de Filmes Favoritos');
  console.log('📋 Rotas disponíveis:');
  console.log('   GET    / - Informações da API');
  console.log('   GET    /filmes - Listar todos os filmes');
  console.log('   GET    /filmes/:id - Buscar filme por ID');
  console.log('   POST   /filmes - Adicionar novo filme');
  console.log('   PUT    /filmes/:id - Atualizar filme');
  console.log('   DELETE /filmes/:id - Remover filme');
});
