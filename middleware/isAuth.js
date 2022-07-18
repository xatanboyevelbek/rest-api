const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
    const token = req.get('Authorization');
    if(!token){
        const error = new Error('Not Autenticated!');
        error.statusCode = 401;
        throw error;
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'supersecretapplication');
    } catch (err){
        err.statusCode = 500;
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not Autenticated!');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next()
}