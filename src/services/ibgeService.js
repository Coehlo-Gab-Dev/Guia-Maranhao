import axios from 'axios';

// URL base da API de localidades do IBGE
const IBGE_API_BASE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

/**
 * Busca todos os municípios do estado do Maranhão (UF código 21) na API do IBGE.
 * @returns {Promise<Array<{ibgeId: number, nome: string}>>} Uma promessa que resolve para um array de objetos de municípios.
 * @throws {Error} Lança um erro se a requisição à API falhar.
 */
const buscarMunicipiosDoMA = async () => {
  try {
    // O código da UF para o Maranhão é 21
    const UF_MARANHAO_CODIGO = 21;
    const url = `${IBGE_API_BASE_URL}/estados/${UF_MARANHAO_CODIGO}/municipios`;

    console.log(`Buscando municípios na API do IBGE: ${url}`);

    // Faz a requisição GET para a API
    const response = await axios.get(url);

    // Verifica se a resposta contém dados
    if (!response.data || response.data.length === 0) {
      console.warn('A API do IBGE não retornou municípios para o Maranhão.');
      return [];
    }

    // Mapeia a resposta para o formato que precisamos (ibgeId, nome)
    const municipios = response.data.map((municipio) => ({
      ibgeId: municipio.id,
      nome: municipio.nome,
    }));

    console.log(`${municipios.length} municípios encontrados.`);
    return municipios;
  } catch (error) {
    console.error('❌ Erro ao buscar municípios na API do IBGE:', error.message);
    // Propaga o erro para que o controller possa tratá-lo
    throw new Error('Falha ao se comunicar com o serviço do IBGE.');
  }
};

export default {
  buscarMunicipiosDoMA,
};
