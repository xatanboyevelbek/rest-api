const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const cors = require('cors');
const app = express();
const feedsRoutes = require('./routes/feedsRoutes');
const userRoutes = require('./routes/userRoutes');

const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '.' + file.mimetype.split('/')[1]);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Authorization'],
    credentials: true,
}

app.use(express.json());
app.use(multer({storage: filestorage, fileFilter: fileFilter}).single('image'));
app.use(express.static(path.join(__dirname, 'images')));
app.use(cors(corsOptions));

app.use('/feeds',feedsRoutes);
app.use('/auth', userRoutes);
app.use((error, req, res, next) => {
    const message = error.message;
    const status = error.statusCode || 500;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

mongoose.connect('mongodb+srv://Elbek:27092001Elbek@cluster0.zvcfv.mongodb.net/main').then(() => {
    app.listen(8080);
}).catch(err => {
    console.log(err);
});