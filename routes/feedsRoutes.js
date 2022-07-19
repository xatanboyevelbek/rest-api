const express = require('express');
const router = express.Router();
const {getPosts, postPost, getPost, putPost, deletePost} = require('../controller/feedsController');
const {isAuth} = require('../middleware/isAuth');
const {feedsValidation} = require('../validation/feedsValidation')

router.get('/posts', isAuth, getPosts);
router.post('/post', isAuth, feedsValidation ,postPost);
router.get('/post/:postId', isAuth, getPost);
router.put('/post/:postId', isAuth, feedsValidation ,putPost);
router.delete('/post/:postId', isAuth, deletePost);

module.exports = router;