
const {User} = require('../models/index')
const jwt = require("jsonwebtoken");

module.exports =  async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //on split le header de la requête pour n'avoir que le token.
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //On décode le token via notre clef secrête
    const userId = decodedToken.userId; //on met le token dans une constante pour vérification.
    User.findOne({id: decodedToken.userId});
    if (isAdmin == true) {
        next();
    } else {
        res.status(401).json({error: error});
    }
  } catch (error) {
    res.status(400).json({ message : 'something went wrong ... ' + error}) //Sinon un message d'érreur (si même email)
  }
};