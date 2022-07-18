const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const {getPosts, postPost, getPost, putPost, deletePost} = require('../controller/feedsController');
const {isAuth} = require('../middleware/isAuth');

router.get('/posts', isAuth, getPosts);
router.post('/post', [
    body('title').isLength({min: 5}),
    body('content').isLength({min: 5})
] ,postPost);
router.get('/post/:postId', isAuth, getPost);
router.put('/post/:postId', [
    body('title').isLength({min: 5}),
    body('content').isLength({min: 5})
],putPost);
router.delete('/post/:postId', deletePost);

module.exports = router;