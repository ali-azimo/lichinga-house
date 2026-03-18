import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
// Rotas
import userRouter from './routes/user.route.js';
import cadRouter from './routes/cad.route.js';
import imoRouter from './routes/imo.route.js';
import agriRouter from './routes/agri.route.js';
import diverRouter from './routes/diver.route.js';
import saudeRouter from './routes/saude.route.js';
import mininRouter from './routes/minin.route.js';
import semRoutes from './routes/sem.route.js';

dotenv.config();

// Conexão MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('✅ Conectado ao MongoDB!'))
  .catch((err) => console.log('❌ Erro:', err));

// Configuração do __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rotas da API
app.use('/api/user', userRouter);
app.use('/api/auth', cadRouter);
app.use('/api/imo', imoRouter);
app.use('/api/agri', agriRouter);
app.use('/api/diver', diverRouter);
app.use('/api/saude', saudeRouter);
app.use('/api/minin', mininRouter);
app.use('/api/sem', semRoutes);

// Rota de teste
app.get('/api/status', (req, res) => {
  res.json({ success: true, message: 'API BGS online' });
});

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, '../client/dist')));

// ✅ ROTA CURINGA CORRIGIDA - com nome obrigatório para path-to-regexp
app.get('*catchAll', (req, res) => {
  // Ignora rotas da API (retorna 404 para APIs não encontradas)
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ 
      success: false, 
      message: 'Rota da API não encontrada' 
    });
  }
  
  // Para todas as outras rotas, serve o index.html do React
  // Isso permite que o React Router lide com rotas como:
  // /imo/69a46d795f97914d88ad969b
  // /agri/qualquer-coisa
  // /dashboard/configuracoes
  // Qualquer rota que não seja da API
  console.log(`🌐 Rota React capturada: ${req.path}`); // Log opcional para debug
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Middleware de erro
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}!`);
});