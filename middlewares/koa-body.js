var KoaBody = require('koa-body');
const { join } = require('path');

console.log('执行了', join(__dirname, '/public/upload/'))

module.exports = KoaBody({
  formidable: {
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    uploadDir: join(__dirname, '../public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    onFileBegin(){
      console.log('上传前')
    },
    onError: (err) => {
      console.log(err);
    }
  }
})