const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const Post = require('../model/postModel');
const User = require('../model/userModel');

exports.getPosts = async (req, res, next) => {
    const queryPage = req.query.page;
    const perPage = 2;
    try {
        const count = await Post.find().countDocuments();
        const posts = await Post.find().populate('creator', 'name').skip((queryPage - 1) * perPage).limit(perPage);
        res.status(200).json({ message: 'Fetched posts successfuly', posts: posts, totalItem: count });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.postPost = async (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.file.path.replace('\\', '/');
    const content = req.body.content;
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed. Entered data is incorrect');
            error.statusCode = 422;
            throw error;
        }
        const post = new Post({
            title: title,
            imageUrl: imageUrl,
            content: content,
            creator: req.userId
        });
        await post.save();
        const user = await User.findById(req.userId);
        user.posts.push(post);
        await user.save();
        res.status(201).json({message: "Post successfuly created", post: post});
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.getPost = async (req, res, next) => {
    const postId = req.params.postId;
    try{
        const post = await Post.findById(postId);
        if (!post) {
            const error = new Error('Could not find post');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Post fetched', post: post });
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
}
exports.putPost = async (req, res, next) => {
    const postId = req.params.postId;

    const title = req.body.title;
    const imageUrl = req.file.path.replace('\\', '/');
    const content = req.body.content;
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validatio failed. Entered data is incorrect');
            error.statusCode(422);
            throw error;
        }
        const post = await Post.findById(postId);
        if (!post) {
            const error = new Error('Page not found');
            error.statusCode(404);
            throw error;
        }
        if (post.creator.toString() !== req.userId) {
            const error = new Error('Forbidden error.');
            error.statusCode = 404;
            throw error;
        }
        if (imageUrl !== post.imageUrl) {
            clearImage(post.imageUrl);
        }
        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        await post.save();
        res.status(200).json({ message: 'Post updated!'});
    } catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

const clearImage = (pathImage) => {
    const lastpath = path.join(process.cwd(), pathImage);
    fs.unlink(lastpath, (err) => console.log(err));
}

exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    try{
        const post = await Post.findById(postId);
        if (!post) {
            const error = new Error('Page not found.');
            error.statusCode = 404;
            throw error;
        }
        if (post.creator.toString() !== req.userId) {
            const error = new Error('Forbidden error.');
            error.statusCode = 404;
            throw error;
        }
        clearImage(post.imageUrl);
        await Post.findByIdAndRemove(postId);
        const user = await User.findById(req.userId);
        user.posts.pull(postId);
        await user.save();
        res.status(200).json({ message: 'Successfuly deleted' });
    } catch(err){
        if (err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}