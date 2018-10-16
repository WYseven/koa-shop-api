var views = require('koa-views');
const {join} = require('path');


module.exports = views(join(__dirname, '..', 'views'), {
  extension: 'ejs'
})