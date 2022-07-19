const express = require('express');
const router = express.Router();
const {putSignup, postLogin} = require('../controller/userController');
const {signupValidation} = require('../validation/userValidation');

router.put('/signup', signupValidation, putSignup);
router.post('/login', postLogin);

module.exports = router;