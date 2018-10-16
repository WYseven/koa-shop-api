const {db} = require('../config');
const dbUrl = `${db.url}:${db.port}/${db.dbname}`
var mongoose = require('mongoose');
mongoose.connect(dbUrl, { useNewUrlParser: true });

module.exports = (ctx,next) => {
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async function () {
    // we're connected!
    console.log(`we're connected!`)
    await next();
  });
}
