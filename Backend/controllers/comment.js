const { Post, User, Comment } = require('../models/Index');

exports.modifyComment = async (req, res, next) => {
    try {
        Comment.findOne({where: {id: req.params.id}})
        .then((comment) => {
            if (comment.userId === req.token.userId || req.token.isAdmin === true) {
                Comment.update({...req.body}, {where: {id: req.params.id}})
                .then((comment) => {res.status(200).json(comment)})     
                .catch(error => res.status(400).json({ message : 'something went wrong ... ' + error}))    
            }
        }) 
    }
    catch (error) {
        res.status(400).json({ message : 'something went wrong ... ' + error})    }
}

exports.createComment = (req, res, next) => {
    const comment = new Comment({
        content: req.body.content,
        userId: req.token.userId,
        postId: req.params.id
    })
    comment.save()
    .then(() => {res.status(200).json(comment)})     
    .catch(error => res.status(400).json({ message : 'something went wrong ... ' + error}))
}

exports.deleteComment = (req, res, next) => {
    Comment.findOne({where: {id: req.params.id}})
    .then((comment) => {
      if (comment.userId !== req.token.userId || req.token.isAdmin === true) {
        ({ message : 'Unauthorized ' + error}) 
      }
      comment.destroy({where: {id: req.params.id}})
    })
    .then(() => res.status(200).json({message: 'comment deleted'}))
    .catch((error) => ({ message : 'something went wrong ... ' + error})) 
}