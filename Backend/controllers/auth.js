/*********************************************************************************/
//On importe ce dont nous avons besoin.

const bcrypt = require('bcrypt'); //Bcrypt sert à Hash (et donc sécuriser) les passwords
const jwt = require('jsonwebtoken'); //jsonwebtoken genère un token (pour que nos users ne se connectent qu'une fois)
const User = require('../models/user'); //on importe le schéma pour nos utilisateurs.
const Sequelize = require('sequelize')


/*********************************************************************************/
//notre middleware signup, pour créer un compte

exports.signup = (req, res, next) => {
    let errors = [];

    if(!req.body.userName) {
        errors.push({text: 'Please add a Username'})
    }
    if(!req.body.email) {
        errors.push ({text: 'please add a email'})
    }
    if(!req.body.password) {
        errors.push ({text:'please add a password'})
    }
    if (errors.length > 0) {
        res.json(errors)
    }

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            isAdmin: false,
            description: 'Pas de Bio pour le moment!'
        });
    user.save()
    .then(() => {res.status(200).json({message: 'success'})})     
    .catch(error => res.status(400).json({ message : 'something went wrong ... ' + error})) //Sinon un message d'érreur (si même email)
  })
  .catch(error => res.status(500).json({ message : 'Something went wrong ... ' + error }))  //Sinon un message d'érreur (si serveur)

}


/*********************************************************************************/
//notre middleware login, pour se connecter


exports.login = ( req, res, next) => {

    User.findOne({where: {userName: req.body.userName}})
        .then(user => {
            if (!user) {
                return res.status(401).json({error : 'User not found'})
            } 
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Wrong Email or Password'})
                    }
                   res.status(200).json({
                       user: {
                            userId: user[0],
                            name: user.userName,
                       },
                    token: jwt.sign(
                        {userId: user.id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                })
            })
            .catch(error => { res.status(500).json({error})})
        })
    .catch(error => { res.status(500).json("erro4r")})
}