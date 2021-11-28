/*********************************************************************************/
//On importe ce dont nous avons besoin.

const bcrypt = require('bcrypt'); //Bcrypt sert à Hash (et donc sécuriser) les passwords
const jwt = require('jsonwebtoken'); //jsonwebtoken genère un token (pour que nos users ne se connectent qu'une fois)
const User = require('../models/user'); //on importe le schéma pour nos utilisateurs.
const Sequelize = require('sequelize')

/*********************************************************************************/
//Pour récuperer un utilisateur

exports.oneUser = (req, res, next) => {
    try {
    User.findOne({where: { id: req.params.id },})
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
          message: "Utilisateur non trouvé !",
        });
      })
    }
      catch (error) {
          console.log(error)
      }
};

/*********************************************************************************/
//Pour update un utilisateur 

exports.updateUser = async (req, res) => {
  try {
    let id = req.params.id
    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/api/upload/${
        req.file.filename
      }` 
    }
    const user = await User.update(req.body, {where: {id: id}})
    res.status(200).send(user)  
  }
  catch(err) {
    res.status(500).send(error)
  }

}