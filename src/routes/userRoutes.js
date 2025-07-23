import express from 'express';
import { addFavorito, removeFavorito, getFavoritos, getMe } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 * name: Usuários
 * description: Operações relacionadas ao usuário logado (perfil, favoritos)
 */

/**
 * @swagger
 * /api/users/me:
 * get:
 * summary: Retorna o perfil do usuário autenticado.
 * tags: [Usuários]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Perfil do usuário.
 * 401:
 * description: Não autorizado.
 */
router.get('/me', getMe);

/**
 * @swagger
 * /api/users/me/favoritos:
 * post:
 * summary: Adiciona um serviço à lista de favoritos do usuário.
 * tags: [Usuários]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * servicoId:
 * type: string
 * responses:
 * 200:
 * description: Serviço adicionado.
 * 401:
 * description: Não autorizado.
 * 404:
 * description: Serviço não encontrado.
 */
router.post('/me/favoritos', addFavorito);

/**
 * @swagger
 * /api/users/me/favoritos:
 * get:
 * summary: Lista todos os serviços favoritos do usuário.
 * tags: [Usuários]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de favoritos.
 * 401:
 * description: Não autorizado.
 */
router.get('/me/favoritos', getFavoritos);

/**
 * @swagger
 * /api/users/me/favoritos/{servicoId}:
 * delete:
 * summary: Remove um serviço da lista de favoritos do usuário.
 * tags: [Usuários]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: servicoId
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Serviço removido.
 * 401:
 * description: Não autorizado.
 */
router.delete('/me/favoritos/:servicoId', removeFavorito);


export default router;
