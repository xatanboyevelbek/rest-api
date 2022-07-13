const express = require('express');
const router = express.Router()
const feedsController = require('../controller/feedsController');

router.get('/posts', feedsController.getPosts);

module.exports = router;