
// 需要加载一些中间件
const koa = require('koa');
const app = new koa();
// 加载所需要的中间件
let loaders = require('koa-load-middlewares');

// 记录root路径
app.context.rootPath = __dirname;

let l = new loaders({
  path: __dirname + '/middlewares'
});

l.use(['koa-body','views','routes']).run(app);
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
const router = require('koa-router')();
router.post('/img/upload', upload.single('file'),(ctx) => {
  ctx.body = '123'
})

app.use(router.routes())
  .use(router.allowedMethods());

// process.env.PORT 在window下使用set设置环境变量
let port = process.env.PORT || 3000;

app.on('error',(e) => {
  console.log(e)
})

app.listen(port,() =>{
  console.log('Server is running at %d',port)
})
