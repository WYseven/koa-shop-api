const multer = require('koa-multer');
const upload = multer({ dest: 'uploads/' });

module.exports = (router) => {
  router.post('/upload', upload.single('file'),(ctx) => {
    ctx.body = '上传图片接口'
  })
}