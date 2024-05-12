// Define User model and database operations
const db = require('../db');
const bcrypt = require('bcryptjs');

class User {
    
  static async createUser(username, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING *';
    const result = await db.query(query, [username, hashedPassword, name]);
    return result
  }

  static async findUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await db.query(query, [username]);
    return result.rows[0];
  }

  static async comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
  //Method for getting all the posts and comments of a user
  static async getUserPostsAndComments(userId) {
    try {
      const postsQuery = 'SELECT * FROM posts WHERE userid = $1';
      const postsResult = await db.query(postsQuery, [userId]);
      const posts = postsResult.rows;

      const commentsQuery = 'SELECT * FROM comments WHERE userid = $1 ORDER BY path';
      const commentsResult = await db.query(commentsQuery, [userId]);
      const comments = commentsResult.rows;

      return { posts, comments };
    } catch (error) {
      console.error('Error fetching user posts and comments:', error);
      throw error;
    }
  }
}

module.exports = User;
