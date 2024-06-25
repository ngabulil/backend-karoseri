const { Sequelize } = require('sequelize');

const db = new Sequelize('karoseri_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = db;
