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

mongoose.connect('')
app.listen(8080);