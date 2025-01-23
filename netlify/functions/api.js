import express from 'express'

import mongoose from 'mongoose'
import userController from '../../controllers/userController.js';
import commentController from '../../controllers/commentController.js';
import postController from '../../controllers/postController.js';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import serverless from 'serverless-http'
import methodOverride from 'method-override'
import path from 'path';

import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGODB_URI)

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
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
    }),
}))

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next ();
});

app.use(express.json())


app.use(express.static("public"));


app.set('views', path.join(process.cwd(), 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.use('/', userController);

app.use('/', postController);

app.use("/", commentController);

export const handler = serverless(app)

