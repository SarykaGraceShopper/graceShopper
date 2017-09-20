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
  badnessRange: {
    type: Sequelize.VIRTUAL,
    get: function () {
      if (this.badness === 0 ) return '0';
      else if (this.badness <= 5) return '1-5';
      else if (this.badness <= 10) return '6-10';
      else return '11';
    }
  },
  image: {
    type: Sequelize.STRING,
    validate: {isUrl: true}
  }
}, {
  defaultScope: {
    include: [ Power ]
  }
})

module.exports = Dragon;
