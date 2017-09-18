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
    type: Sequelize.VIRTUAL,
    get: function () {
      return `/img/dragons/${this.id}.jpg`
    }
  }
}, {
  defaultScope: {
    include: [ Power ]
  }
})

// another option for image URL would be storing an actual URL to an image online --OB
// defaultScope and include: Power in your server files are redundant --FF

module.exports = Dragon;
