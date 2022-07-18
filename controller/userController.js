const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const User = require('../model/userModel');

exports.putSignup = (req, res, next) => {
    const {email, password, name, status} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    bcrypt.hash(password, 12).then(hashedPassword => {
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            status: status
        });
        return user.save()
    }).then(result => {
        res.status(201).json({message: 'User succesfuly signed up', user: result._id});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    })
}
exports.postLogin = (re1, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).then(user => {
        if(!user){
            const error = new Error('The user with this email could not found');
            error.statusCode = 404;
            throw error;
        }
        bcrypt.compare(password, user.password).then()
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
}