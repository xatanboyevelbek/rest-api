const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')
const User = require('../model/userModel');

exports.putSignup = (req, res, next) => {
    const {email, password, name, status} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Something went wrong');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    bcrypt.hash(password, 12).then(hashedPassword => {
        
    })
}