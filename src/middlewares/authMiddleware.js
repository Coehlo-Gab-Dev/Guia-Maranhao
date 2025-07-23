import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import 'dotenv/config';


const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Não autorizado, usuário não encontrado.' });
      }

      next();
    } catch (error) {
      console.error('❌ Erro na verificação do token:', error);
      res.status(401).json({ message: 'Não autorizado, token inválido.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
  }
};

export { protect };
