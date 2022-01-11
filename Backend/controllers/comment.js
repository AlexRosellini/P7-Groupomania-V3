/*********************************************************************************/
//On importe ce dont nous avons besoin.

const { Post, User, Comment } = require('../models/Index'); //Ici on importe notre index des modèles.

/*********************************************************************************/
//Middleware de création de commentaire.

exports.createComment = (req, res, next) => {
    const comment = new Comment({ //On créer un nouveau commentaire par rapport à notre modèle commentaire.
        content: req.body.content, //On récupère le contenu
        userId: req.token.userId, //le UserId de l'utilisateur qui fait la requête
        postId: req.params.id //et l'id du post 
    })
    comment.save() //Ensuite on sauvegarde le commentaire.
    .then(() => {res.status(200).json(comment)})      //Si pas d'érreur on le renvoi sur le front.
    .catch(error => res.status(400).json({ message : 'something went wrong ... ' + error})) //Sinon un message d'érreur'
}

/*********************************************************************************/
//Middleware de suppression de commentaire

exports.deleteComment = (req, res, next) => {
    Comment.findOne({where: {id: req.params.id}}) //On commence par trouver le commentaire à supprimer
    .then((comment) => { 
      if (comment.userId !== req.token.userId || req.token.isAdmin === false) { //On vérifie que l'utilisateur qui fait la requête est soit admin, soit celui qui a créer le commentaire.
        res.status(400).json({ error : 'Unauthorized'}) //Si ce n'est pas le cas, message d'érreur
      } else {
        comment.destroy({where: {id: req.params.id}}) //Sinon on supprime le commentaire.
      }
    })
    .then(() => res.status(200).json({message: 'comment deleted'})) //Si tout va bien, message de succès
    .catch((error) => res.status(500).json({ error : 'something went wrong ... ' + error}))  //Sinon un message d'érreur'
}