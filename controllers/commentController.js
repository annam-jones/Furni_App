import express from 'express';
import Furniture from '../models/furniture.js';

const router = express.Router();

function handleError(error, res) {
    console.log(error);
    if (error.name === 'CastError') {
        res.status(400).send({ message: "Hello! This ID is not valid, please provide a valid ID!" });
    } else {
        res.status(500).send({ message: "Something went wrong. Please check your request and try again!" });
    }
}

router.post('/show/:id/comments', async function (req, res) {
    try {

        if (!req.session.user) {
            return res.status(401).send({ message: "You must be logged in to comment" });
        }
        const furniture = await Furniture.findById(req.params.id);

        if (!furniture) {
            return res.status(404).send({ message: "Furniture not found" });
        }

        const comment = {
            content: req.body.content,
            user: req.session.user._id,
        };


        furniture.comments.push(comment);
        await furniture.save();

        res.redirect(`/show/${req.params.id}`);
    } catch (error) {
        handleError(error, res);
    }
});

router.delete('/furniture/:id/comments/:commentId', async (req, res) => {
    try {
        const furniture = await Furniture.findById(req.params.id);

        if (!furniture) {
            return res.status(404).send({ message: "Furniture not found." });
        }

        const commentIndex = furniture.comments.findIndex(
            (comment) => comment._id.toString() === req.params.commentId
        );

        if (commentIndex === -1) {
            return res.status(404).send({ message: "Comment not found." });
        }

        if (furniture.comments[commentIndex].user.toString() !== req.session.user._id) {
            return res.status(403).send({ message: "You cannot delete a comment you did not post." });
        }

       
        furniture.comments.splice(commentIndex, 1);
        await furniture.save();

        res.redirect(`/show/${req.params.id}`);
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).send({ message: "An error occurred while deleting the comment." });
    }
});




export default router;
