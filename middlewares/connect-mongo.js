const {db} = require('../config');
const dbUrl = `${db.url}:${db.port}/${db.dbname}`
var mongoose = require('mongoose');

module.exports = (() => {
  mongoose.connect(dbUrl, { useNewUrlParser: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, '123connection error:'));
  db.once('open', async function () {
    console.log(`we're connected!`);
  });
  return null;
})()
