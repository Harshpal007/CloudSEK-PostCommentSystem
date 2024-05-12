const Post = require('../models/postModel');

class PostController {
  static async addPost(req, res) {
    await Post.addPost(req, res);
  }

  static async getPostById(req, res) {
    await Post.getPostById(req, res);
  }

}

module.exports = PostController;
