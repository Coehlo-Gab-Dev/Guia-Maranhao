import Servico from '../models/servico.js';
import Municipio from '../models/municipio.js';
import googleApiService from '../services/googleApiService.js';

/**
 * Controller para buscar e sincronizar serviços de uma categoria em um município específico.
 * Utiliza a API do Google Places e implementa a lógica de fallback.
 */
const sincronizarServicosPorMunicipio = async (req, res) => {
  const { municipioId } = req.params;
  const { categoria, busca } = req.query; // ex: categoria='saude', busca='hospital'

  if (!categoria || !busca) {
    return res.status(400).json({ message: 'Os parâmetros "categoria" e "busca" são obrigatórios.' });
  }

  try {
    const municipio = await Municipio.findById(municipioId);
    if (!municipio) {
      return res.status(404).json({ message: 'Município não encontrado.' });
    }

    let locaisEncontrados;
    let origemDados = 'google_places';

    try {
      // Tenta buscar os dados em tempo real no Google
      locaisEncontrados = await googleApiService.buscarLocais(busca, municipio.nome);
    } catch (error) {
      // *** ESTRATÉGIA DE FALLBACK ATIVADA ***
      console.warn(`⚠️ Falha na API do Google. Ativando fallback para o município: ${municipio.nome}`);
      console.warn(`Erro: ${error.message}`);
      
      // Se a API externa falhar, busca no nosso banco de dados local
      const servicosLocais = await Servico.find({ municipioId, categoria });
      return res.status(200).json({
        message: 'AVISO: Operando em modo de fallback. Os dados podem estar desatualizados.',
        fonte: 'banco_de_dados_local',
        data: servicosLocais,
      });
    }

    if (locaisEncontrados.length === 0) {
        return res.status(200).json({ message: 'Nenhum novo local encontrado no Google Places para a busca realizada.' });
    }

    // Processa e salva os locais encontrados no banco de dados
    const operacoes = locaisEncontrados.map(local => ({
      updateOne: {
        filter: { placeId: local.place_id },
        update: {
          $set: {
            nome: local.name,
            categoria,
            municipioId,
            endereco: {
              textoCompleto: local.formatted_address,
            },
            localizacao: {
              type: 'Point',
              coordinates: [local.geometry.location.lng, local.geometry.location.lat],
            },
            fonteDados: {
              origem: 'google_places',
              placeId: local.place_id,
              ultimaVerificacao: new Date(),
            },
          },
        },
        upsert: true,
      },
    }));

    const resultado = await Servico.bulkWrite(operacoes);

    res.status(201).json({
      message: 'Sincronização concluída com sucesso!',
      fonte: origemDados,
      summary: {
        inseridos: resultado.upsertedCount,
        atualizados: resultado.modifiedCount,
        totalEncontrado: locaisEncontrados.length,
      },
    });

  } catch (error) {
    console.error('❌ Erro ao sincronizar serviços:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
};

/**
 * Controller para listar serviços com base em filtros.
 */
const listarServicos = async (req, res) => {
    const { municipioId, categoria, busca } = req.query;
    const filtro = {};

    if (municipioId) filtro.municipioId = municipioId;
    if (categoria) filtro.categoria = categoria;
    if (busca) {
        filtro.nome = { $regex: busca, $options: 'i' }; // Busca case-insensitive
    }

    try {
        const servicos = await Servico.find(filtro).populate('municipioId', 'nome uf');
        res.status(200).json(servicos);
    } catch (error) {
        console.error('❌ Erro ao listar serviços:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
}


export { sincronizarServicosPorMunicipio, listarServicos };
