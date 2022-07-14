const {validationResult} = require('express-validator')

exports.getPosts = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            message: "Validation failed. You entered incorrect data",
            error: errors.array()
        })
    }
    res.status(200).json({
        posts: [{title: 'First post', content: 'This is the first post'}]
    })
}
exports.postPosts = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        title: title,
        content: content,
        author: {name : 'Elbek'},
        createdAt: new Date()
    })
}