
let notFound = require('./404');
const fs = require('fs');

module.exports = (router) => {
  router.get('/', (ctx) => {
    ctx.body = 'index'
  })

  router.get('/upload', async (ctx) => {
    ctx.response.type = 'html';
    ctx.body = fs.createReadStream(ctx.rootPath+'/views/upload.html');
  })

  //notFound(router);
}