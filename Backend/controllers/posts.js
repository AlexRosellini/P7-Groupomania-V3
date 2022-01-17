/*********************************************************************************/
//On importe ce dont nous avons besoin.

const { Post, User, Comment } = require('../models/Index'); //Ici on importe notre index des modèles.

/*********************************************************************************/
//Notre middleware pour avoir tout nos posts

exports.getAllPosts = (req, res, next) => {
  try {
    Post.findAll({ //On recherche tout les posts de nos commentaires
      order: [["createdAt", "DESC"]], 
      include: [ //On récupère nos relations, soit les Utilisateurs et les commentaires des posts.
        {
          model: User,
        },
        {
          model: Comment,
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: User,
            },
          ],
        },
      ],
  }) 
      .then((post) => res.status(200).json(post)) //si tout va bien, message de succès
  }
  catch(error) {
    res.status(400).json({message: 'error :' + error}) //Sinon un message d'érreur
  }
}

/*********************************************************************************/
//Notre middleware pour avoir un post

exports.getOnePost = (req, res, next) => {
    try {
    Post.findOne({ // On recherche un seul post via l'ID
      where: { id: req.params.id }, //Celle ci est dans nos paramètres, soit l'URL de la requête 
      order: [["createdAt", "DESC"]], 
      include: [ //On récupère nos relations, soit l'utilisateur et les commentaires sur le post.
        {
          model: User,
        },
        {
          model: Comment,
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    })
      .then((post) => {
        res.status(200).json(post); //si tout va bien, message de succès
      })
      .catch((error) => {
        res.status(404).json({ message : 'something went wrong ... ' + error}) //Sinon un message d'érreur
      })
    }
    catch (error) {
        res.status(500).json({ message : 'something went wrong ... ' + error}) //Sinon un message d'érreur
    }
};

/*********************************************************************************/
//Notre middleware pour modifier un post

exports.modifyPost = async (req, res, next) => {
  try {
      Post.findOne({where: {id: req.params.id}}) //On commence par récuperer le post via son ID.
        .then((post) => { 
          if (post.userId === req.token.userId || req.token.isAdmin === true) { //On vérifie que celui qui modifie le post soit bien son créateur ou un administrateur.
          let id = req.params.id
          let image; //On met en place nos variables.
          if (req.file) { //Si une image est présente...
            image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //On gêre son nom... 
          }
          if (image) { 
            Post.image = image //et on l'ajoute au post
          }
          Post.update({...req.body, image: image}, {where: {id: id}}) //On update notre post avec les nouvelles données du front.
          res.status(200).json(post) //si tout va bien, message de succès
        } 
      })
    }
  catch(error) {
    res.status(500).send(error) //Sinon message d'érreur
  }
}

/*********************************************************************************/
//Notre middleware pour créer un post

exports.createPost = (req, res) => {
    let image //On met en place notre variable image.
    if (req.body.title === null || !req.body.title) { //Si le post n'a pas de titre...
        res.status(400).json({message: 'Votre post doit avoir un titre!'}) //...un message d'érreur.
    }
    if (req.body.textContent === null || !req.body.textContent) { //Si le post n'a pas de text...
        res.status(400).json({message: 'Votre post ne doit pas être vide!'}) //...un message d'érreur
    }
    else {
        if (req.file) { //Sinon si il y a une image...
            image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  //...On gêre son nom.
        }
        const post = new Post({ //Ensuite, on créer un nouveau post avec les données de la requête.
            title: req.body.title,
            textContent: req.body.textContent,
            image: image,
            userId: req.token.userId
        })
        post.save() // et on sauvegarde notre poste.
        .then(() => {res.status(200).json({message: 'success'})}) //si tout va bien, message de succès
        .catch(error => res.status(400).json({ message : 'something went wrong ... ' + error})) //Sinon un message d'érreur
    }
}

/*********************************************************************************/
//Notre middleware pour supprimer un post

exports.deletePost = (req, res) => {
  Post.findOne({where: {id: req.params.id}}) //On commence par trouver le post via son Id.
    .then((post) => {
      if (post.userId === req.token.userId || req.token.isAdmin === true) { //On vérifie ensuite si la requête est bien du créateur du post ou d'un administrateur.
      post.destroy({where: {id: req.params.id}}) //si c'est le cas, on supprime le post.
      }
      else {
        res.status(401).json({ message : 'Unauthorized ' + error}) //Sinon, message d'érreur.
      }
    })
    .then(() => res.status(200).json({message: 'Post deleted'})) //si tout va bien, message de succès
    .catch((error) => res.status(400).json({ message : 'something went wrong ... ' + error})) //Sinon message d'érreur.
}