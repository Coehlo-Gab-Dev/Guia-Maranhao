import axios from 'axios';
import 'dotenv/config';

// URL base para a API do Google Places
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/**
 * Busca locais na API do Google Places com base em um texto de busca e na localização de um município.
 * @param {string} textoBusca - O texto para buscar (ex: "hospital", "escola pública").
 * @param {string} nomeMunicipio - O nome do município para refinar a busca (ex: "São Luís").
 * @returns {Promise<Array<Object>>} Uma promessa que resolve para um array de locais encontrados.
 * @throws {Error} Lança um erro se a chave da API não estiver configurada ou se a busca falhar.
 */
const buscarLocais = async (textoBusca, nomeMunicipio) => {
  if (!API_KEY) {
    console.error('❌ Chave da API do Google Maps não configurada. Verifique o arquivo .env');
    throw new Error('Chave da API do Google Maps não configurada.');
  }

  const query = `${textoBusca} em ${nomeMunicipio}, Maranhão`;

  try {
    const response = await axios.get(`${PLACES_API_URL}/textsearch/json`, {
      params: {
        query: query,
        key: API_KEY,
        language: 'pt-BR',
      },
      // Define um timeout para a requisição, crucial para a estratégia de fallback
      timeout: 5000, // 5 segundos
    });

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      throw new Error(`A API do Google Places retornou o status: ${response.data.status}`);
    }

    return response.data.results || [];

  } catch (error) {
    // Loga o erro e o propaga para ser tratado pelo controller
    if (error.code === 'ECONNABORTED') {
      console.error('❌ Timeout ao chamar a API do Google Places.');
      throw new Error('Timeout: A API do Google demorou muito para responder.');
    }
    console.error('❌ Erro ao buscar locais na API do Google Places:', error.message);
    throw new Error('Falha ao se comunicar com a API do Google Places.');
  }
};

// Futuramente, adicionaremos a função para buscar rotas aqui.

export default {
  buscarLocais,
};
