import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * @param {string} id 
 * @returns {string}
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;
