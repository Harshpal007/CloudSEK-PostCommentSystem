const db = require('../db');

class Comment {
  static async addComment(req, res) {
    //Using Tree Structure to store comments
    const { content, userId, parentCommentId, postId } = req.body;
    try {
      let path
      const result = parentCommentId ? await db.query(
        `SELECT COUNT(*) AS num_comments FROM comments WHERE parentcommentid = $1 AND postid =${postId}`,
        [parentCommentId]
      ):
        await db.query(
          `SELECT COUNT(*) AS num_comments FROM comments WHERE parentcommentid IS NULL AND postid =${postId}`
        );
      console.log(result.rows[0].num_comments);
      const numComments = parseInt(result.rows[0].num_comments) + 1;
      console.log(numComments);
      if(parentCommentId){
        const parentResult = await db.query(
          `SELECT path FROM comments WHERE id = $1`,
          [parentCommentId]
        );
        const parentPath = parentResult.rows[0].path;
        path = `${parentPath}.${numComments}`;
      }
      else{
        path =`${numComments}`
      }
    
      //Here the path variable is ltree datatype of postgres which provides hierichal data storage
      const queryResult = await db.query(
        `INSERT INTO comments (content, userid, path, postid, parentcommentid) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [content, userId, path, postId,parentCommentId]
      );
      res.status(201).json(queryResult.rows[0]);
    } catch (err) {
      console.error('Error adding comment', err);
      res.status(500).json({ error: 'Error adding comment' });
    }
  }

  static async getCommentsForPost(req, res) {
    const { postId } = req.params;
    try {
      console.log(postId)
      const result = await db.query(
        `SELECT 
           id,
           content,
           userid,
           path
         FROM 
           comments
         WHERE 
           postid = $1
         ORDER BY 
           path;`,
        [postId]
      );
      console.log(result)
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching comments for post', err);
      res.status(500).json({ error: 'Error fetching comments for post' });
    }
  }
}

module.exports = Comment;
