/*********************************************************************************/
//On importe ce dont nous avons besoin.

const jwt = require("jsonwebtoken"); //JWT pour vérifier l'user

/*********************************************************************************/
//notre middleware qui vérifie l'utilisateur.


module.exports = (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1]; //On récupère le token
      req.token = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //et on le traduit.
      next(); //si tout va bien, next.
  } catch (error) {
      res.status(401).json({ error: error | 'Requête non authentifiée !'}); //Sinon un message d'érreur
  }
};