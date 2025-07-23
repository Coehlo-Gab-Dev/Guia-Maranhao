import express from 'express';
import { sincronizarServicosPorMunicipio, listarServicos } from '../controllers/servicoController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Serviços
 * description: Endpoints para consulta e gerenciamento de serviços públicos
 */

/**
 * @swagger
 * /api/servicos/sincronizar/{municipioId}:
 * post:
 * summary: Busca serviços no Google Places e salva no banco de dados.
 * tags: [Serviços]
 * description: Para um dado município, busca por um termo (ex: 'hospital') na API do Google, e salva/atualiza os resultados no banco de dados local. Implementa fallback.
 * parameters:
 * - in: path
 * name: municipioId
 * required: true
 * schema:
 * type: string
 * - in: query
 * name: categoria
 * required: true
 * schema:
 * type: string
 * enum: [saude, educacao, cultura, social]
 * - in: query
 * name: busca
 * required: true
 * schema:
 * type: string
 * responses:
 * 201:
 * description: Sincronização bem-sucedida.
 * 200:
 * description: Operando em modo fallback com dados locais.
 * 400:
 * description: Parâmetros faltando.
 * 404:
 * description: Município não encontrado.
 * 500:
 * description: Erro interno.
 */
router.post('/sincronizar/:municipioId', sincronizarServicosPorMunicipio);

/**
 * @swagger
 * /api/servicos:
 * get:
 * summary: Lista os serviços cadastrados no banco de dados com filtros.
 * tags: [Serviços]
 * parameters:
 * - in: query
 * name: municipioId
 * schema:
 * type: string
 * - in: query
 * name: categoria
 * schema:
 * type: string
 * enum: [saude, educacao, cultura, social]
 * - in: query
 * name: busca
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Lista de serviços.
 * 500:
 * description: Erro interno.
 */
router.get('/', listarServicos);

export default router;
