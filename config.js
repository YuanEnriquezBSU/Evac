const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('evacuation_center_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
