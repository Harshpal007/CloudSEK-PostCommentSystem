const db = require('../db');

class Post {
  static async addPost(req, res) {
    const { title, content, userId } = req.body;
    try {
      const result = await db.query(
        `INSERT INTO posts (title, content, userid) VALUES ($1, $2, $3) RETURNING *`,
        [title, content, userId]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error adding post', err);
      res.status(500).json({ error: 'Error adding post' });
    }
  }

  static async getPostById(req, res) {
    const { userId, postId } = req.body;
    try {
      const mainPostResult = await db.query('SELECT * FROM posts WHERE id = $1 AND userid = $2', [postId, userId]);
      if (mainPostResult.rows.length === 0) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        const mainPost = mainPostResult.rows[0];
        const commentsResult = await db.query('SELECT * FROM comments WHERE postid = $1 AND userid =$2 ORDER BY path', [postId,userId]);
        const comments = commentsResult.rows;
        res.json({ mainPost, comments });
      }
    } catch (err) {
      console.error('Error fetching post', err);
      res.status(500).json({ error: 'Error fetching post' });
    }
  }
}

module.exports = Post;
