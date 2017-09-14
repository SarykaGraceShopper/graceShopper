const crypto = require('crypto');
const _ = require('lodash');
const db = require('./_db');
const Sequelize = require('sequelize');
const Dragon = require('./dragon');
const Order = require('./order');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    isEmail: true,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  },
  shippingAddress: {
    type: Sequelize.STRING,    
  },
  isAdmin: {
    type: Sequelize.BOOLEAN
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: Sequelize.STRING
}, {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
    },

    defaultScope: {
      include: [Dragon]
    }
  })
// instance methods
User.prototype.correctPassword = function (candidatePassword) {
  return User.encryptPassword(candidatePassword, this.salt) === this.password;
};

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.prototype.getPastOrders = function() {
  return Order.findAll({
    where: {
      pastOrderId: this.id
    }
  })
}

User.prototype.getCart = function() {
  return Order.findOne({
    where: {
      cartId: this.id
    }
  })
}

module.exports = User;
