const { body } = require('express-validator');
const User = require('../model/userModel');

exports.signupValidation = [
    body('email').isEmail().custom((value, {req}) => {
        return User.findOne({email: value}).then(email => {
            if(email){
                return Promise.reject('Email is already exits')
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min: 5}),
    body('name').trim().isLength({min: 5}),
    body('status').trim().isLength({min: 0})
]