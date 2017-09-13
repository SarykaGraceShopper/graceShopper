const db = require('./_db');
const Sequelize = require('sequelize');
const Power = require('./power');

const Dragon = db.define('dragon', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: true
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER
  },
  badness: {
    type: Sequelize.INTEGER,
    validate: {min: 0, max: 11}
  },
  image: {
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    price: function() {
      return this.getDataValue('price') / 100
    },
  },
  setterMethods: {
    price: function(value) {
      this.setDataValue('price', value * 100);
    }
  },
  defaultScope: {
    include: [ Power ]
  }
})

module.exports = Dragon;
