const db = require('./_db');
const Sequelize = require('sequelize');
const Dragon = require('./dragon');

const Order = db.define('order', {
  orderDate: {
    type: Sequelize.DATE
  },
  shipDate: {
    type: Sequelize.DATE
  }
}
,{
  defaultScope: {
    include: [Dragon]
  }
}
);

// you might want to store shipping/billing address with the order --FF

// instance methods
Order.prototype.getTotal = function () {
  return this.dragons.reduce((start, dragon) => start.price + dragon.price);
};

module.exports = Order;

