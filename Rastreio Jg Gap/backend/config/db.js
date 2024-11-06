const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Conexão com banco de dados bem-sucedida.'))
  .catch(error => console.error('Erro ao conectar com banco de dados:', error));

module.exports = sequelize;
