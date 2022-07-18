const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');
const Post = require('../model/postModel');

exports.getPosts = (req, res, next) => {
    const queryPage = req.query.page;
    const perPage = 2;
    let totalItem;
    Post.find().countDocuments().then(count => {
        totalItem = count
        return Post.find().skip((queryPage - 1)*perPage).limit(perPage);
    }).then(posts => {
        res.status(200).json({message: 'Fetched posts successfuly', posts: posts, totalItem: totalItem});
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
exports.putPost = (req, res, next) => {
    const postId = req.params.postId;

    const title = req.body.title;
    const imageUrl = req.file.path.replace('\\', '/');
    const content = req.body.content;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validatio failed. Entered data is incorrect');
        error.statusCode(422);
        throw error;
    }

    Post.findById(postId).then(post => {
        if(!post){
            const error = new Error('Page not found');
            error.statusCode(404);
            throw error;
        }
        if(imageUrl !== post.imageUrl){
            clearImage(post.imageUrl);
        }

        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        return post.save();
    }).then(result => {
        res.status(200).json({message: 'Post updated!', post: result});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

const clearImage = (pathImage) => {
    const lastpath = path.join(process.cwd(), pathImage);
    fs.unlink(lastpath, (err) => console.log(err));
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId).then(post => {
        if(!post){
            const error = new Error('Page not found.');
            error.statusCode = 404;
            throw error;
        }
        //check logged in user
        clearImage(post.imageUrl);
        return Post.findByIdAndRemove(postId)
    }).then(() => {
        res.status(200).json({message: 'Successfuly deleted'});
    }).catch(err => {
        if(err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    });
}