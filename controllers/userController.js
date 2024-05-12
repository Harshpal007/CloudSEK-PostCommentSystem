const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

class UserController {
  static async register(req, res) {
    const { username, password, name } = req.body;
    try {
        const user = await User.findUserByUsername(username);
      if (user) {
            return res.status(401).json({error: 'Username already exists' });
        }
      const result = await User.createUser(username, password, name);
      
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error registering user', err);
      res.status(500).json({ error: 'Error registering user' });
    }
  }

  //login for a user it is needed to get jwt token which is used as a auth key for other apis
  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const isPasswordValid = await User.comparePasswords(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Error logging in user', err);
      res.status(500).json({ error: 'Error logging in user' });
    }
  }

  static async getUserPostsAndComments(req, res) {
    const userId = req.params.userId;
    try {
      const { posts, comments } = await User.getUserPostsAndComments(userId);
      res.json({ posts, comments });
    } catch (error) {
      console.error('Error fetching user posts and comments:', error);
      res.status(500).json({ error: 'Error fetching user posts and comments' });
    }
  }

}

module.exports = UserController;
