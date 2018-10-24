const {db} = require('../config');
const dbUrl = `${db.url}:${db.port}/${db.dbname}`
var mongoose = require('mongoose');
let glob = require('glob');
let {join} = require('path');

module.exports = (() => {
  mongoose.connect(dbUrl, { 
    useNewUrlParser: true, 
    useCreateIndex:true 
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async function () {
    glob.sync(join(__dirname, '../database/*.js')).forEach(require);
    console.log(`we're connected!,加载所有的schemas`);
  });
  return null;
})();
