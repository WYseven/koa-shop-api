// 加载中间件的库
const {join} = require('path');
const isAbsolute = (path) => {
  if ('/' === path[0]) return true;
  if (':' === path[1] && ('\\' === path[2] || '/' === path[2])) return true; // Windows device path
  if ('\\\\' === path.substring(0, 2)) return true; // Microsoft Azure absolute path
};

class Loader {
  constructor(options) {
    let defaults = {
      path: '',
      ...options
    }

    if (!defaults.path.trim()){
      throw new Error('path must be required!')
    }
    if (!isAbsolute(defaults.path)){
      throw new Error('path must be absolute path!')
    }
    this.middlewares = [];
    this.middlewaresPath = options.path;
  }
  use(middlewares){
    
    if (typeof middlewares === 'string') {
      this.middlewares.push(join(this.middlewaresPath, middlewares));
      return;
    }
    if (Array.isArray(middlewares)) {
      middlewares.forEach((item) => {
        this.middlewares.push(join(this.middlewaresPath, item))
      })
    }
    return this;
  }

  run(app){
    // 每一个中间件都会接受app
    for(let item of this.middlewares){
      let func = require(item);
      if(typeof func === 'function'){
        app.context.app = app;
        app.use(func)
      }
    }
  }
}

module.exports = Loader;