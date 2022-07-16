const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const feedsRoutes = require('./routes/feedsRoutes')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
})

app.use('/feeds',feedsRoutes);
app.use((error, req, res, next) => {
    const message = error.message;
    const status = error.statusCode || 500;
    res.status(status).json({message: message});
})

mongoose.connect('mongodb+srv://Elbek:27092001Elbek@cluster0.zvcfv.mongodb.net/main').then(() => {
    app.listen(8080);
}).catch(err => {
    console.log(err);
})