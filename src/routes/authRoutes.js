import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Autenticação
 * description: Endpoints para registro e login de usuários
 */

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Registra um novo usuário na plataforma.
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 201:
 * description: Usuário registrado com sucesso.
 * 400:
 * description: Email já em uso ou dados inválidos.
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Autentica um usuário e retorna um token JWT.
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: Login bem-sucedido.
 * 401:
 * description: Credenciais inválidas.
 */
router.post('/login', login);

export default router;
