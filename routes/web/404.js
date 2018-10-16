module.exports = (router) => {
  router.get('/404', (ctx) => {
    ctx.body = '404'
  })
}