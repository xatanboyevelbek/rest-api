const {validationResult} = require('express-validator');
const Post = require('../model/postModel');

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
        const error = new Error('Validation failed. Entered data is incorrect');
        error.statusCode(422);
        throw error;
    }
    const post = new Post({
        title: title,
        imageUrl: './duck.jpg',
        content: content,
        creator: {
            name: 'Elbek'
        }
    })
    post.save().then(result => {
        res.status(201).json({
            message: "Post successfuly created",
            post: result
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}