const crypto = require('crypto');
const _ = require('lodash');
const db = require('./_db');
const Sequelize = require('sequelize');

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {min: 0, max: 5}
  },
  blurb: {
    type: Sequelize.STRING,
  },
  reviewDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
  }
});

module.exports = Review;
