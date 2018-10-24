module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = 500;
    ctx.body = {
      code: 0,
      msg: '内部错误，稍后重试'
    }
    // 通知给error事件
    ctx.app.emit('error', err, ctx);
  }
}