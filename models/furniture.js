import mongoose from "mongoose";

const furnitureSchema = new mongoose.Schema({
    postName: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
});

const Post = mongoose.model('Post', furnitureSchema);

export default Post;