import express from 'express';
import { importarMunicipios, listarMunicipios } from '../controllers/municipioController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Municípios
 * description: Endpoints para gerenciamento e consulta de municípios
 */

/**
 * @swagger
 * /api/municipios/importar:
 * post:
 * summary: Importa e atualiza os municípios do Maranhão a partir da API do IBGE.
 * tags: [Municípios]
 * description: Busca todos os municípios do Maranhão na API oficial do IBGE e os salva no banco de dados. A operação é segura para ser executada múltiplas vezes (idempotente).
 * responses:
 * 201:
 * description: Importação concluída com sucesso.
 * 500:
 * description: Erro no servidor.
 */
router.post('/importar', importarMunicipios);

/**
 * @swagger
 * /api/municipios:
 * get:
 * summary: Lista todos os municípios do Maranhão cadastrados no banco de dados.
 * tags: [Municípios]
 * responses:
 * 200:
 * description: Lista de municípios retornada com sucesso.
 * 500:
 * description: Erro no servidor.
 */
router.get('/', listarMunicipios);

export default router;
