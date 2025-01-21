import mongoose from "mongoose";
import User from '../models/user.js'; 
import Post from '../models/furniture.js';

async function seed() {
    try {
        console.log('Connecting to database 🌱');
        await mongoose.connect('mongodb://127.0.0.1:27017/furniture-app'); 

        console.log('Clearing database...');
        await mongoose.connection.db.dropDatabase();

        console.log('Seeding new user... 🌱');
  
        const user = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });

        furniture.forEach((furniture) => {
            furniture.user = user;
        })

        console.log('Seeding new furniture posts... 🌱');

       
        const sampleImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'; 

        const furniturePosts = [
            {
                postName: 'Yellow Lamp',
                description: 'A 70s Lamp',
                image: 'base64-image-string',
                user: user._id, 
            },
            
        ];

        const newFurniturePosts = await Post.create(furniturePosts);
        console.log('Created furniture posts:', newFurniturePosts);

        const comment = {
            content: "This lamp is amazing!",
            user: user._id,
        };

        newFurniturePosts[0].comments.push(comment);

        await newFurniturePosts[0].save();

        console.log('Post with comment:', newFurniturePosts[0]);

        console.log('Seeding complete! 🌱');
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
       
        await mongoose.disconnect();
    }
}


seed();

