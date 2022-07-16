const {validationResult} = require('express-validator');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: 1,
                title: 'first title',
                content: 'This is the first post',
                creator: {
                    name: "Elbek"
                },
                createdAt: new Date()
            }
        ]
    })
}
exports.postPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({
            message: "Validation failed. Entered data is incorrect",
            error: errors.array()
        })
    }
    res.status(201).json({
        message: "Post created successfuly",
        post: { id: 2, 
                title: title, 
                content: content,
                creator: {
                    name: "Elbek"
                },
                createdAt: new Date()
            }
    })
}