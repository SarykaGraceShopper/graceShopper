const Promise = require('bluebird');
const {db} = require('./server/db');

const data = {
  dragon: [
    {name: 'cookie', color: 'yellow', breed: 'qt', price: '200', badness: '1'},
    {name: 'tiny', color: 'green', breed: 'qt', price: '200', badness: '1'},
    {name: 'romeo', color: 'green', breed: 'qt', price: '200', badness: '1'},
    {name: 'smore', color: 'orange', breed: 'qt', price: '200', badness: '1'},
    {name: 'daria', color: 'aqua', breed: 'qt', price: '200', badness: '1'},
    {name: 'fat cat', color: 'green', breed: 'qt', price: '200', badness: '1'},
    {name: 'ken', color: 'green', breed: 'qt', price: '200', badness: '1'},
    {name: 'rawr', color: 'green', breed: 'qt', price: '200', badness: '1'},
    {name: 'juliet', color: 'green', breed: 'qt', price: '200', badness: '1'},
    {name: 'fira', color: 'green', breed: 'snake', price: '200', badness: '1'},
    {name: 'viserion', color: 'blue', breed: 'dead', price: '2000', badness: '11'},
    {name: 'bundle deal', color: 'multi', breed: 'neopet', price: '200', badness: '0'}
  ],
  power: [
    {name: 'cookie-eating', destructiveness: '1'},
    {name: 'fire', destructiveness: '8'},
    {name: 'love', destructiveness: '5'},
    {name: 'judgement', destructiveness: '2'},
    {name: 'staring', destructiveness: '1'},
    {name: 'growling', destructiveness: '0'},
    {name: 'ice', destructiveness: '10'}
  ],
  dragon_power: [
    {dragonId: '1', powerId: '1'},
    {dragonId: '2', powerId: '2'},
    {dragonId: '3', powerId: '3'},
    {dragonId: '4', powerId: '2'},
    {dragonId: '5', powerId: '4'},
    {dragonId: '6', powerId: '5'},
    {dragonId: '6', powerId: '1'},
    {dragonId: '7', powerId: '2'},
    {dragonId: '8', powerId: '3'},
    {dragonId: '8', powerId: '6'},
    {dragonId: '9', powerId: '3'},
    {dragonId: '11', powerId: '7'}
  ]
};

db.sync({force: true})
.then(function () {
  console.log('Dropped old data, now inserting data');
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name)
      .create(item);
    });
  });
})
.then(function () {
  console.log('Finished inserting data');
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close() // uses promises but does not return a promise. https://github.com/sequelize/sequelize/pull/5776
  console.log('connection closed'); // the connection eventually closes, we just manually do so to end the process quickly
  return null; // silences bluebird warning about using non-returned promises inside of handlers.
});
