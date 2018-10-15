module.exports = (router) => {
  console.log('执行了')
  router.get('/hello', (ctx) => {
    ctx.body = 'hello'
  });

  
  router.get('*', (ctx) => {
    ctx.body = '404'
  })
}