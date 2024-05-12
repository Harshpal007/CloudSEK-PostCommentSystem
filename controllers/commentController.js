const Comment = require('../models/commentModel');

class CommentController {
  static async addComment(req, res) {
    await Comment.addComment(req, res);
  }

  static async getCommentsForPost(req, res) {
    await Comment.getCommentsForPost(req, res);
  }
}

module.exports = CommentController;
