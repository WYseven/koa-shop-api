let PostModel = require('../database/posts');

class PostService {
  async addPost(option) {
    let post = new PostModel(option);
    await post.save();
    return {
      msg: '文章已存储',
      success: true
    }
  }
  async getPost(option) {
    let posts = await PostModel.find({ user_id: option.user_id });
    return {
      msg: '文章获取成功',
      success: true,
      posts
    }
  }
  async updatePost(option) {
    let posts = await PostModel.findByIdAndUpdate(
      option.post_id,
      {
        $set: { title: option.title, content: option.content }
      },
      {
        new: true
      }
    );
    return {
      msg: '文章获取成功',
      success: true,
      posts
    }
  }
  async deletePost(option) {
    let posts = await PostModel.findByIdAndDelete(option.post_id);
    return {
      msg: '文章删除成功',
      success: true,
      posts
    }
  }
}

module.exports = new PostService;