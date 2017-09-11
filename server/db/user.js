const db = require('./_db');
const Sequelize = require('sequelize');
const Dragon = require('./dragon');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN
  }
}, {
  defaultScope: {
    include: [ Dragon ]
  }
})

module.exports = User;
