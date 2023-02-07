const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('schooldb', 'root', 'mysql.1218', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false,
});

module.exports = sequelize;
