const express = require('express');
const {body} = require('express-validator')
const router = express.Router()
const feedsController = require('../controller/feedsController');

router.get('/posts', [
    body('title').isLength({min: 5}),
    body('content').isLength({min: 10})
], feedsController.getPosts);
router.post('/posts', feedsController.postPosts);

module.exports = router;