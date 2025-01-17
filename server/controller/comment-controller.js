import CommentModel from '../model/comment.js';

export const newComment = async (req, res) => {
    try {
        const newCommentInstance = await new CommentModel(req.body);
        await newCommentInstance.save();

        res.status(200).json('Comment added successfully');
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getComments = async (req, res) => {
    try {
        const commentsList = await CommentModel.find({ postId: req.params.id });

        res.status(200).json(commentsList);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteComment = async (req, res) => {
    try {
        const commentToDelete = await CommentModel.findById(req.params.id);
        await commentToDelete.delete();

        res.status(200).json('Comment removed successfully');
    } catch (err) {
        res.status(500).json(err);
    }
};
