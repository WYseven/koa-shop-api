const multer = require('koa-multer');
const userService = require(global.rootPath+'/service/user')
var storage = multer.diskStorage({
  //定义文件保存路径
  destination: function (req, file, cb) {
    cb(null, './uploads/');// 路径根据具体而定。如果不存在的话会自动创建一个路径
  }, // 注意这里有个，
  // 修改文件名
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

  // 注册

  router.post('/register', async (ctx) => {
    let { body } = ctx.request;
    let data = await userService.register(body);
    let resData = {
      msg: '注册成功',
      code: 0,
      info: data.info
    }

    if (data.isNameExit) {
      resData = {
        ...resData,
        msg: '用户名已存在',
        code: 1
      }
    }
    ctx.body = resData;
  })

  // 登录

  router.post('/login', async (ctx) => {
    let { body } = ctx.request;
    
    let data = await userService.login(body);
    let resData = {
      msg: '登录成功',
      code: 0
    };

    if (!data.isExit || !data.isCompare){
      resData = {
        msg: '用户名或密码出现错误',
        code: 1
      }
    }

    // 存入session中
    ctx.session.user = data.name;

    ctx.body = resData;
  })

}