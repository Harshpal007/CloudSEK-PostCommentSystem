const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/posts-comments/:userId',authenticate, UserController.getUserPostsAndComments);

module.exports = router;
