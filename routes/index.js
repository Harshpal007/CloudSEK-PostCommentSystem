const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const authenticate = require('../middlewares/authenticate');

router.use('/users', userRoutes);
router.use('/comments',authenticate, commentRoutes)
router.use('/posts',authenticate, postRoutes);

module.exports = router;
