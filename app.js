
// 需要加载一些中间件
const koa = require('koa');
const app = new koa();

// 加载中间件
let middlewares = require('./middlewares')

for(let attr in middlewares){
  middlewares[attr](app);
}

// 加载所需要的中间件
let loaders = require('./utils/loader');

// 记录root路径
app.context.rootPath = __dirname;
global.rootPath = __dirname;


let l = new loaders({
  path: __dirname + '/middlewares'
});

l.use([
  'error',
  'connect-mongo',
  'koa-bodyparser',
  'koa-static',
  'routes']).run(app);

// process.env.PORT 在window下使用set设置环境变量
let port = process.env.PORT || 3000;

app.on('error',(e,ctx) => {
  console.log('捕获到错误',e)
})

app.listen(port,() =>{
  console.log('Server is running at %d',port)
})
