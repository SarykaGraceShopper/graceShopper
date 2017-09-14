const db = require('./_db');
const User = require('./user');
const Dragon = require('./dragon');
const Power = require('./power');
const Order = require('./order');
const Review = require('./review');

////////Dragon////////
Dragon.belongsToMany(Power, {
  through: 'dragon_power'
});

////////Power////////
Power.belongsToMany(Dragon, {
  through: 'dragon_power'
});

////////Order////////
Order.belongsTo(User, {as: 'pastOrder'});
Order.belongsTo(User, {as: 'cart'});
Order.belongsToMany(Dragon, {
  through: 'order_dragon'
});
Dragon.belongsToMany(Order, {
  through: 'order_dragon'
});

////////Reviews////////
Review.hasOne(Dragon);

module.exports = {db, User, Dragon, Power, Review}
