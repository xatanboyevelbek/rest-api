const {validationResult} = require('express-validator');
const Post = require('../model/postModel');

exports.getPosts = (req, res, next) => {
    Post.find().then(posts => {
        res.status(200).json({message: 'Fetched posts successfuly', posts: posts});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.postPost = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.file.path.replace('\\', '/');
    const content = req.body.content;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed. Entered data is incorrect');
        error.statusCode(422);
        throw error;
    }
    const post = new Post({
        title: title,
        imageUrl: imageUrl,
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
exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId).then(post => {
        if(!post){
            const error = new Error('Could not find post');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message: 'Post fetched', post: post});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    })
}