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

exports.updateUser = (req, res, next) => {
    try {

        let selector = {
            where: { id: req.params.id },
        }

        let values = {description: req.body.description}

        User.update(values, selector)
        .then(function(rowsUpdated) {
            res
            .status(200)
            .json(rowsUpdated)
        })
    }
    catch (error) {
        res.status(500).json({error})
    }
}