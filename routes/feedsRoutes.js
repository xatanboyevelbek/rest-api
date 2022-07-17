const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const feedsController = require('../controller/feedsController');

router.get('/posts', feedsController.getPosts);
router.post('/post', [
    body('title').isLength({min: 5}),
    body('content').isLength({min: 5})
] ,feedsController.postPost);
router.get('/post/:postId',  feedsController.getPost);
router.put('/post/:postId', [
    body('title').isLength({min: 5}),
    body('content').isLength({min: 5})
],feedsController.putPost);
router.delete('/post/:postId', feedsController.deletePost);

module.exports = router;