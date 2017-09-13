const db = require('./_db');
const User = require('./user');
const Dragon = require('./dragon');
const Power = require('./power');
const Order = require('./order');

Dragon.belongsToMany(Power, {
  through: 'dragon_power'
});
Power.belongsToMany(Dragon, {
  through: 'dragon_power'
});

Order.belongsTo(User, {as: 'pastOrder'});
Order.belongsTo(User, {as: 'cart'});
Order.belongsToMany(Dragon, {
  through: 'order_dragon'
});
Dragon.belongsToMany(Order, {
  through: 'order_dragon'
});

module.exports = db;
