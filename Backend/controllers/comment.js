const { Post, User, Comment } = require('../models/Index');

exports.createComment = (req, res, next) => {
    const comment = new Comment({
        content: req.body.content,
        userId: req.token.userId,
        postId: req.params.id
    })
    comment.save()
    .then(() => {res.status(200).json({message: 'success'})})     
    .catch(error => res.status(400).json({ message : 'something went wrong ... ' + error}))
}