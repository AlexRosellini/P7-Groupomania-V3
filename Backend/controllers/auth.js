/*********************************************************************************/
//On importe ce dont nous avons besoin.

const bcrypt = require('bcrypt'); //Bcrypt sert à Hash (et donc sécuriser) les passwords
const jwt = require('jsonwebtoken'); //jsonwebtoken genère un token (pour que nos users ne se connectent qu'une fois)
const User = require('../models/user'); //on importe le schéma pour nos utilisateurs.



/*********************************************************************************/
//notre middleware signup, pour créer un compte
exports.signup = (req, res, next) => {
    User.findOne({where: {email: req.body.email}})
    .then(user =>{
        if (user) {
            return res.status(403).json({error: 'Vous êtes déjà inscrit!'})
        } else {
            if (req.body.userName === '') {
                return res.status(400).json({error: 'votre nom ne doit pas être vide'})
            } else {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash,
                    isAdmin: false,
                    description: 'Pas de Bio pour le moment!',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'         
                })
                user.save()
            })
            .then(() => {res.status(200).json({message: 'Vous pouvez maintenant vous connecter!'})})     
            .catch(error => res.status(400).json({ error : 'something went wrong ... ' + error})) //Sinon un message d'érreur (si même email)        
            }
        }
    })
    .catch(error => res.status(500).json({ error : 'something went wrong ... ' + error}))  //Sinon un message d'érreur (si serveur)
}


/*********************************************************************************/
//notre middleware login, pour se connecter


exports.login = ( req, res, next) => {
    User.findOne({where: {userName: req.body.userName}})
        .then(user => {
            if (!user) {
                return res.status(401).json({error : 'Utilisateur non trouvé'})
            } 
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'mauvais mot de passe'})
                    }
                   res.status(200).json({
                       user: {
                            userId: user[0],
                            name: user.userName,
                       },
                    token: jwt.sign(
                        {
                            userId: user.id,
                            userName: user.userName,
                            isAdmin: user.isAdmin
                        },
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                })
            })
            .catch(error => { res.status(500).json({error})})
        })
    .catch(error => { res.status(500).json(error)})
}