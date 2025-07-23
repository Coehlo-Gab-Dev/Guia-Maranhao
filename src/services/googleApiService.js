import axios from 'axios';
import 'dotenv/config';

const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/**
 * @param {string} textoBusca 
 * @param {string} nomeMunicipio 
 * @returns {Promise<Array<Object>>} 
 * @throws {Error} 
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
      timeout: 5000, 
    });

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      throw new Error(`A API do Google Places retornou o status: ${response.data.status}`);
    }

    return response.data.results || [];

  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.error('❌ Timeout ao chamar a API do Google Places.');
      throw new Error('Timeout: A API do Google demorou muito para responder.');
    }
    console.error('❌ Erro ao buscar locais na API do Google Places:', error.message);
    throw new Error('Falha ao se comunicar com a API do Google Places.');
  }
};


export default {
  buscarLocais,
};
