const multer = require('koa-multer');
var storage = multer.diskStorage({
  //定义文件保存路径
  destination: function (req, file, cb) {
    cb(null, './uploads/');//路径根据具体而定。如果不存在的话会自动创建一个路径
  },                       //注意这里有个，
  //修改文件名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})

var upload = multer({ storage: storage });

module.exports = (router) => {
  // 上传图片
  router.post('/upload', upload.single('file'),(ctx) => {
    //console.log(ctx.req.body); // 存放的是form-data格式数据，由koa-multer库提供
    //console.log(ctx.requset.body); // 存放的是post发送的数据，Koa提供
    if (ctx.req.file) {
      ctx.body = 'upload success';
    } else {
      ctx.body = 'upload error';
    }
  })
}