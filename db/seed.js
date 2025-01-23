import mongoose from "mongoose";
import User from '../models/user.js';
import Post from '../models/furniture.js';

import dotenv from 'dotenv'
dotenv.config()

async function seed() {
    try {
        console.log('Connecting to database 🌱');
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Clearing database...');
        await mongoose.connection.db.dropDatabase();

        console.log('Seeding new user... 🌱');

        const user = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });

        const furniturePosts = [
            {
                postName: 'Wooden Chair',
                description: 'A comfortable wooden chair.',
                image: 'base64-image-string',
                user: user._id,
            },
            {
                postName: 'Dining Table',
                description: 'A spacious dining table.',
                image: 'base64-image-string',
                user: user._id,
            },
        ]
        furniturePosts.forEach((furniture) => {
            furniture.user = user;
        })

        console.log('Seeding new furniture posts... 🌱');


        const sampleImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAUA...';

       

        const newFurniturePosts = await Post.create(furniturePosts);
        console.log('Created furniture posts:', newFurniturePosts);



        console.log('Seeding complete! 🌱');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {

        await mongoose.disconnect();
    }
}


seed();

