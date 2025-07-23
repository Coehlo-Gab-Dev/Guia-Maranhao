import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';

import municipioRoutes from './routes/municipioRoutes.js';
import servicoRoutes from './routes/servicoRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('API Guia Maranhão no ar!');
});

app.use('/api/municipios', municipioRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/auth', authRoutes); 
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});

export default app;
