import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * Gera um token JWT para um usuário.
 * @param {string} id - O ID do usuário a ser incluído no payload do token.
 * @returns {string} O token JWT gerado.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;
