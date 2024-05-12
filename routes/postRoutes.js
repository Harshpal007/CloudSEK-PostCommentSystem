const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

router.post('/addPost', PostController.addPost);
router.get('/', PostController.getPostById);

module.exports = router;
