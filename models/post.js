import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postName: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        fileName: { type: String, required: true },
        filePath: { type: String, required: true },
        fileType: { type: String, required: true },
        fileSize: { type: Number, required: true }
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;