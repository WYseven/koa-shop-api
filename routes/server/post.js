const postService = require(global.rootPath + '/service/post')
module.exports = (router) => {
  // 发表文章
  router
    .post('/', async (ctx) => {
      let { body } = ctx.request;
      let data = await postService.addPost(body);
      ctx.body = {
        code: 0,
        msg: '发表成功'
      }
    })
    .get('/', async (ctx) => {
      let { query } = ctx.request;
      let data = await postService.getPost(query);
      ctx.body = {
        code: 0,
        posts: data.posts
      }
    })
    .put('/', async (ctx) => {
      let { query } = ctx.request;
      let data = await postService.updatePost(query);
      ctx.body = {
        code: 0,
        msg: '更新完成',
        data
      }
    })
    .delete('/', async (ctx) => {
      let { query } = ctx.request;
      let data = await postService.deletePost(query);
      ctx.body = {
        code: 0,
        msg: '删除完成',
        data
      }
    })
}