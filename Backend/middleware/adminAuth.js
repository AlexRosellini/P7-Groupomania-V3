
const {User} = require('../models/index')
const jwt = require("jsonwebtoken");

module.exports =  async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
    const userId = decodedToken.userId; 
    User.findOne({where:{id: userId}}).then((user) => {
        if (user.isAdmin === true) {
            next();
        }
        else {
            res.status(400).json({ message : 'something went wrong ... ' + error}) //Sinon un message d'érreur (si même email)
        }
    })
  } catch (error) {
    res.status(400).json({ message : 'something went wrong ... ' + error}) //Sinon un message d'érreur (si même email)
  }
};