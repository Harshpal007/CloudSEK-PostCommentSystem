const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentController');

router.post('/addComment', CommentController.addComment);
router.get('/:postId', CommentController.getCommentsForPost);

module.exports = router;
