import Municipio from '../models/municipio.js';
import ibgeService from '../services/ibgeService.js';


const importarMunicipios = async (req, res) => {
  try {
    const municipiosDaApi = await ibgeService.buscarMunicipiosDoMA();

    if (!municipiosDaApi || municipiosDaApi.length === 0) {
      return res.status(404).json({ message: 'Nenhum município encontrado na API do IBGE para importar.' });
    }

    const operacoes = municipiosDaApi.map((municipio) => ({
      updateOne: {
        filter: { ibgeId: municipio.ibgeId }, 
        update: { $set: municipio }, 
        upsert: true, 
      },
    }));

    const resultado = await Municipio.bulkWrite(operacoes);

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


const listarMunicipios = async (req, res) => {
  try {
    const municipios = await Municipio.find().sort({ nome: 'asc' });
    res.status(200).json(municipios);
  } catch (error) {
    console.error('❌ Erro ao listar municípios:', error);
    res.status(500).json({ message: 'Erro interno no servidor ao listar municípios.' });
  }
};

export { importarMunicipios, listarMunicipios };
