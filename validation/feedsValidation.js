const { body } = require('express-validator');

exports.feedsValidation = [
    body('title').isLength({ min: 5 }),
    body('content').isLength({ min: 5 })
]