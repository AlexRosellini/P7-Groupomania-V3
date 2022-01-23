/*********************************************************************************/
//On importe ce dont nous avons besoin.

const {User} = require('../models/index') //modèle d'utilisateur
const jwt = require("jsonwebtoken"); //JWT pour récuperer le status de l'user.

/*********************************************************************************/
//notre middleware qui vérifie l'utilisateur.

module.exports =  async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //On commence par récuperer le token de la requête.
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //Et on traduit le JWT.
    const userId = decodedToken.userId;  
    User.findOne({where:{id: userId}}).then((user) => {
        if (user.isAdmin === true) { //On vérifie ensuite si l'user est admin
            next(); //Si tout va bien, next.
        }
        else {
            res.status(400).json({ message : 'something went wrong ... '}) //Sinon un message d'érreur
        }
    })
  } catch (error) {
    res.status(400).json({ message : 'something went wrong ... ' + error}) //Sinon un message d'érreur
  }
};