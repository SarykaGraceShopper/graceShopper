// say our sequelize instance is create in 'db.js'
const db = require('./db');
// and our server that we already created and used as the previous entry point is 'server.js'

if (process.env.NODE_ENV === 'development') {
  require('../localSecrets'); // this will mutate the process.env object with your secrets.
}
console.log(process.env.GOOGLE_CLIENT_ID)
const app = require('./app');
const port = process.env.PORT || 3000;

// db.sync({force: true})  // sync our database
db.sync()  // sync our database
.then(function () {
        app.listen(port, function () {
            console.log(`Your server, listening on port ${port}`);
        }) // then start listening with our express server once we have synced

    })

module.exports = app;
