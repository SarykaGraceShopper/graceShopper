const Promise = require('bluebird');
const {db} = require('./server/db');

const data = {
  dragon: [
    {name: 'cookie', color: 'yellow', breed: 'sweettooth', price: '2000', badness: '4', image: 'https://i.imgur.com/H2S1ppG.jpg'},
    {name: 'tiny', color: 'green', breed: 'qt', price: '3000', badness: '7', image: 'https://i.pinimg.com/736x/01/d6/e5/01d6e5915c3c0186dcd28b19b9de4b8b--cute-animal-drawings-kawaii-drawings.jpg'},
    {name: 'romeo', color: 'green', breed: 'dreamer', price: '1000', badness: '0', image: 'https://i.pinimg.com/originals/d3/b3/e0/d3b3e08174ad956b7456005ed0dea438.jpg'},
    {name: 'smore', color: 'orange', breed: 'camper', price: '1500', badness: '2', image: 'https://i.pinimg.com/originals/23/c8/01/23c8011e2def136d2b247cefae9216f6.jpg'},
    {name: 'too sweet', color: 'pink', breed: 'qt', price: '3500', badness: '6', image: 'https://i.pinimg.com/736x/cd/93/28/cd93289c1b3f1ba51b1d172cb7a1d285--fire-dragon-baby-dragon.jpg'},
    {name: 'fat cat', color: 'aqua', breed: 'sweettooth', price: '1000', badness: '8', image: 'https://orig00.deviantart.net/2042/f/2011/069/b/e/be45657d2e7180d69b85eae35af7d38a-d3bbg3d.jpg'},
    {name: 'baby', color: 'green', breed: 'qt', price: '200', badness: '9', image: 'https://i.pinimg.com/736x/6c/12/9c/6c129cf7a0d84871beb221995e7cf170--dragon-party-baby-dragon.jpg'},
    {name: 'rawr', color: 'green', breed: 'dreamer', price: '500', badness: '1', image: 'https://t1.rbxcdn.com/f50a8ce5e0e5b22e17a3f82c5bc2cba8'},
    {name: 'juliet', color: 'green', breed: 'dreamer', price: '5000', badness: '0', image: 'http://1.bp.blogspot.com/_oWhe6DqAFZk/TIfscH1PliI/AAAAAAAAAC0/lqtD5BDC88I/s1600/dino.jpg'},
    {name: 'fira', color: 'green', breed: 'snake', price: '4000', badness: '3', image: 'https://i.pinimg.com/originals/af/d8/ba/afd8ba4a9c103669e8f6d1321c7b874a.jpg'},
    {name: 'viserion', color: 'blue', breed: 'dead', price: '7500', badness: '11', image: 'https://assets.wired.com/photos/w_1440/wp-content/uploads/2016/06/Drogon-1.jpg'},
    {name: 'bundle deal', color: 'multi', breed: 'neopet', price: '2500', badness: '0', image: 'https://www.fluffybooru.org/_images/db804cdf1c3802dce222e74292ce7577/10003%20-%20adorable%20artist%3Ablack-dragon-blood%20cute%20fluffy_foals%20original_art%20safe.png'}
  ],
  power: [
    {name: 'crunching', destructiveness: '3'},
    {name: 'breathing fire', destructiveness: '8'},
    {name: 'crushing', destructiveness: '-5'},
    {name: 'sulking', destructiveness: '-3'},
    {name: 'staring', destructiveness: '1'},
    {name: 'growling', destructiveness: '1'},
    {name: 'breathing ice', destructiveness: '10'},
    {name: 'hissing', destructiveness: '3'},
    {name: 'not so much', destructiveness: '-10'},
    {name: 'munching', destructiveness: '2'}
  ],
  dragon_power: [
    {dragonId: '1', powerId: '1'},
    {dragonId: '1', powerId: '10'},
    {dragonId: '2', powerId: '2'},
    {dragonId: '3', powerId: '3'},
    {dragonId: '4', powerId: '2'},
    {dragonId: '5', powerId: '4'},
    {dragonId: '6', powerId: '5'},
    {dragonId: '6', powerId: '10'},
    {dragonId: '7', powerId: '2'},
    {dragonId: '8', powerId: '3'},
    {dragonId: '8', powerId: '6'},
    {dragonId: '9', powerId: '3'},
    {dragonId: '10', powerId: '8'},
    {dragonId: '11', powerId: '7'},
    {dragonId: '12', powerId: '9'}
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
