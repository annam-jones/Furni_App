import express from 'express'

import mongoose from 'mongoose'
import Furniture from './models/furniture.js'
import userController from './controllers/userController.js';
import commentController from './controllers/commentController.js'
import postController from './controllers/postController.js';
import session from 'express-session'
import methodOverride from 'method-override'
import path from 'path';

const app = express()

app.use(methodOverride('_method'));

app.use(session({

    secret: 'correcthorsebatterystaplefruitcake',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, 
    }
}))

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next ();
});

app.use(express.json())


app.use(express.static(path.join(process.cwd(), 'public'))); 


app.set('views', path.join(process.cwd(), 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.use('/', userController);

app.use('/', postController);

app.use("/", commentController);

app.listen(3000, () => {
    console.log('Server is running on port 3000!')
})

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'furniture-db'
mongoose.connect(`${url}${dbname}`)


