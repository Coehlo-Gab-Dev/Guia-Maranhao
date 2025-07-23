import axios from 'axios';

const IBGE_API_BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

/**
 * @returns {Promise<Array<{ibgeId: number, nome: string}>>}
 * @throws {Error} 
 */
const buscarMunicipiosDoMA = async () => {
  try {
    const UF_MARANHAO_CODIGO = 21;
    const url = `${IBGE_API_BASE_URL}/estados/${UF_MARANHAO_CODIGO}/municipios`;

    console.log(`Buscando municípios na API do IBGE: ${url}`);

    const response = await axios.get(url);

    if (!response.data || response.data.length === 0) {
      console.warn('A API do IBGE não retornou municípios para o Maranhão.');
      return [];
    }

    const municipios = response.data.map((municipio) => ({
      ibgeId: municipio.id,
      nome: municipio.nome,
    }));

    console.log(`${municipios.length} municípios encontrados.`);
    return municipios;
  } catch (error) {
    console.error('❌ Erro ao buscar municípios na API do IBGE:', error.message);
    throw new Error('Falha ao se comunicar com o serviço do IBGE.');
  }
};

export default {
  buscarMunicipiosDoMA,
};
