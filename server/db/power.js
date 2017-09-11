const db = require('./_db');
const Sequelize = require('sequelize');

const Power = db.define('power', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  destructiveness: {
    type: Sequelize.INTEGER,
    validate: {min: -10, max: 10}
  }
})

module.exports = Power;
