import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    content: { type: String, required: [true, "You can't post an empty comment."] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true 
});


const furnitureSchema = new mongoose.Schema({
    postName: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [commentSchema] 
});


const Post = mongoose.model('Post', furnitureSchema);

export default Post;
