let koaStatic = require('koa-static');
module.exports = async (ctx,next) => {
  // 设置静态目录
  ctx.app.use(koaStatic(ctx.rootPath + '/public'));
  ctx.app.use(koaStatic(ctx.rootPath + '/uploads'));
  
  await next();
}