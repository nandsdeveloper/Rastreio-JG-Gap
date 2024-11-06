const axios = require('axios');

async function trackPackage(trackingNumber, carrier) {
  // Exemplo de integração com API fictícia de rastreamento
  try {
    const response = await axios.get(`https://api.exemplo.com/track/${carrier}/${trackingNumber}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao rastrear pacote:', error);
    throw new Error('Erro ao rastrear pacote');
  }
}

module.exports = { trackPackage };
