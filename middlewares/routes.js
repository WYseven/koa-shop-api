const routes = require('../routes');
const router = require('koa-router');
const {join} = require('path');
const routePath = join(__dirname,'../routes');
const rosolve = (name) => {
  return join(__dirname, '../routes',name)
}
const routesConfig = require('../routes')
const r = new router();
for (let key in routesConfig) {
  try{
    let r2 = new router();
    require(rosolve(routesConfig[key]))(r2);
    if(key === '/') key = '';
    r.use(key, r2.routes(), r2.allowedMethods())
  }catch(e){
    console.error('请检查路由配置',e);
  }
}
let isloading = false;
module.exports = async (ctx,next) => {
  // 只需要一次加载一次
  if (!isloading){
    ctx.app
      .use(r.routes())
      .use(r.allowedMethods());
    isloading = true;
  }
  
  await next();
}
