// say our sequelize instance is create in 'db.js'
const db = require('./db');
// and our server that we already created and used as the previous entry point is 'server.js'
const app = require('./app');
const port = process.env.PORT || 3000;

// db.sync({force: true})  // sync our database
db.sync()  // sync our database
.then(function () {
        app.listen(port, function () {
            console.log(`Your server, listening on port ${port}`);
        }) // then start listening with our express server once we have synced

    })