import Municipio from '../models/municipio.js';
import ibgeService from '../services/ibgeService.js';

/**
 * Controller para importar municípios da API do IBGE para o banco de dados.
 * Esta operação é idempotente: atualiza municípios existentes e insere novos.
 */
const importarMunicipios = async (req, res) => {
  try {
    // 1. Busca os dados na API do IBGE através do nosso serviço
    const municipiosDaApi = await ibgeService.buscarMunicipiosDoMA();

    if (!municipiosDaApi || municipiosDaApi.length === 0) {
      return res.status(404).json({ message: 'Nenhum município encontrado na API do IBGE para importar.' });
    }

    // 2. Prepara as operações para o banco de dados em lote (bulk write)
    const operacoes = municipiosDaApi.map((municipio) => ({
      updateOne: {
        filter: { ibgeId: municipio.ibgeId }, // Critério para encontrar o documento
        update: { $set: municipio }, // Dados para atualizar ou inserir
        upsert: true, // Se não encontrar, insere um novo documento
      },
    }));

    // 3. Executa as operações em lote no banco de dados
    const resultado = await Municipio.bulkWrite(operacoes);

    // 4. Envia a resposta com o resumo da operação
    res.status(201).json({
      message: 'Importação de municípios concluída com sucesso!',
      summary: {
        inseridos: resultado.upsertedCount,
        atualizados: resultado.modifiedCount,
        totalNaAPI: municipiosDaApi.length,
      },
    });
  } catch (error) {
    console.error('❌ Erro no processo de importação de municípios:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao importar municípios.', error: error.message });
  }
};

/**
 * Controller para listar todos os municípios armazenados no banco de dados.
 */
const listarMunicipios = async (req, res) => {
  try {
    // Busca todos os documentos na coleção 'municipios', ordenados por nome
    const municipios = await Municipio.find().sort({ nome: 'asc' });
    res.status(200).json(municipios);
  } catch (error) {
    console.error('❌ Erro ao listar municípios:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao listar municípios.' });
  }
};

export { importarMunicipios, listarMunicipios };
