/*********************************************************************************/
//On importe ce dont nous avons besoin.

const { Post, User} = require('../models/Index'); //Ici on importe notre index des modèles.

/*********************************************************************************/
//Notre middleware de récupération de tout les utilisateurs

exports.allUsers = (req, res, next) => {
  try {
    User.findAll() //On récupère tout nos utilisateurs.
      .then((users) => res.status(200).json(users)) //si tout va bien, message de succès
  }
  catch(err) { 
    res.status(404).json({error: error}) //Sinon un message d'érreur
  }
}

/*********************************************************************************/
//Notre middleware de récupération d'un seul utilisateur

exports.oneUser = (req, res, next) => {
    try {
    User.findOne({where: { id: req.params.id },}) //On récupère un utilisateur via son ID.
      .then((user) => {
        res.status(200).json(user); //si tout va bien, message de succès
      })
      .catch((error) => { //Sinon un message d'érreur
        res.status(404).json({ 
          error: error,
          message: "Utilisateur non trouvé !",
        });
      })
    }
      catch (error) { //Sinon un message d'érreur
        res.status(500).json({error: error}) //Sinon un message d'érreur
      }
};

/*********************************************************************************/
//Pour update un utilisateur 

exports.updateUser = async (req, res, next) => {
  try {
      User.findOne({where: {id: req.params.id}}) //On commence par récuperer l'utilisateur que l'on souhaite modifier
        .then((user) => {
          if (user.id === req.token.userId) { //Ensuite, on vérifie que l'utilisateur est bien le créateur du compte a modifier
          let id = req.params.id 
          let image; //on met en place nos variables
          if (req.file) { //Si on a une image...
            image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  //On s'occupe de son nom...
          }
          if (image) { 
            User.image = image //et on l'ajoute à l'utilisateur
          }
          if (req.body.isAdmin === true) { //Si il y a tentative de mettre un utilisateur en admin via ce middleware
            res.status(401).send({ message : 'Unauthorized.'}) //Message d'érreur
          }
          User.update({...req.body, image: image}, {where: {id: id}}) //Sinon, on update notre utilisateur.
          res.status(200).json(user) //si tout va bien, message de succès
        } 
      })
    }
  catch(error) {
    res.status(500).json({error: error}) //Sinon un message d'érreur
  }
}

exports.updateUserAdmin = async (req, res) => {
  try {
    let id = req.params.id
    const user = await User.update({...req.body}, {where: {id: id}})
    res.status(200).send(user)  
  }
  catch(error) {
    res.status(500).send({ message : 'something went wrong ... ' + error})
  }
}

exports.deleteUser =  (req, res) => {
  try {
    let id = req.params.id;
    User.findOne({where: {id: id}})
    .then((user) => {
      user.destroy({where: {id: req.params.id}})
    })
  }
  catch(error) {
    res.status(500).send(error)
  }
}