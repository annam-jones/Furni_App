import express from 'express'

import mongoose from 'mongoose'
import userController from './controllers/userController.js';
import commentController from './controllers/commentController.js'
import postController from './controllers/postController.js';
import multer from 'multer';
import path from 'path';

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 
    },
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

app.use('/', userController);

app.use('/', postController);

app.use("/", commentController);

app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'artists-db'
mongoose.connect(`${url}${dbname}`)


export default upload;