import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import 'dotenv/config';

/**
 * Middleware para proteger rotas que exigem autenticação.
 * Verifica o token JWT fornecido no cabeçalho da requisição.
 */
const protect = async (req, res, next) => {
  let token;

  // Verifica se o token está no cabeçalho 'Authorization' e começa com 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Extrai o token do cabeçalho (formato: "Bearer TOKEN")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verifica e decodifica o token usando o segredo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Busca o usuário pelo ID contido no token e anexa ao objeto 'req'
      // Isso torna os dados do usuário logado disponíveis para os próximos controllers
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Não autorizado, usuário não encontrado.' });
      }

      // 4. Continua para a próxima função de middleware ou controller
      next();
    } catch (error) {
      console.error('❌ Erro na verificação do token:', error);
      res.status(401).json({ message: 'Não autorizado, token inválido.' });
    }
  }

  // Se não houver token no cabeçalho
  if (!token) {
    res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
  }
};

export { protect };
