const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const userController = require('../controller/userController');
const User = require('../model/userModel');

router.put('/signup', [
    body('email').isEmail().withMessage('Please enter valid email').custom((value, {req}) => {
        return User.findOne({email: value}).then(email => {
            if(email){
                return Promise.reject('Email is already exits')
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min: 5}),
    body('name').trim().isLength({min: 5}),
    body('status').trim().isLength({min: 0})
] ,userController.putSignup);
router.post('/login', userController.postLogin);

module.exports = router;