const db = require('./_db');
const User = require('./user');
const Dragon = require('./dragon');
const Power = require('./power');

Dragon.belongsToMany(User, {
  through: 'dragon_user'
});
User.belongsToMany(Dragon, {
  through: 'dragon_user'
});
Dragon.hasMany(Power);

module.exports = db;
