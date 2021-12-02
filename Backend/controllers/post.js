const Post = require('../models/post'); //on importe le schéma pour nos utilisateurs.

exports.getAllPosts = async (req, res, next) => {
    try {
        Post.findAll() 
        .then(posts => {
            res.json(posts)
        })
    }
    catch (err) {
        return res.status(500).send({
            error: " erreur ",
          })
    }
}
