// Função para validar CPF
function validateCPF(cpf) {
    // Aqui você pode implementar uma validação mais complexa se necessário.
    return cpf.length === 11;
  }
  
  // Função para validar email
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  module.exports = { validateCPF, validateEmail };
  