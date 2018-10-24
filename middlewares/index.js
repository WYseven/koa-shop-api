let KoaSession = require('koa-session');
const CONFIG = {
  key: 'koa:session',
  maxAge: 864000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  renew: false,
  //secure: true
}

exports.koaSession = (app) => {
  app.keys = ['wang']
  app.use(KoaSession(CONFIG, app));
}