/*********************************************************************************/
//On importe ce dont nous avons besoin.

const bcrypt = require('bcrypt'); //Bcrypt sert à Hash (et donc sécuriser) les passwords
const jwt = require('jsonwebtoken'); //jsonwebtoken genère un token (pour que nos users ne se connectent qu'une fois)
const User = require('../models/user'); //on importe le schéma pour nos utilisateurs.



/*********************************************************************************/
//notre middleware signup, pour créer un compte

exports.signup = (req, res, next) => {
    User.findOne({where: {email: req.body.email}}) //On commence par rechercher un utilisateur
    .then(user =>{ 
        if (user) { //Si on en trouve un...
            return res.status(403).json({error: 'Vous êtes déjà inscrit!'}) //alors l'utilisateur est déjà inscrit
        } else { 
            if (req.body.userName === '') { //Sinon, si l'utilisateur n'a pas entrer de nom d'utilisateur...
                return res.status(500).json({error: 'votre nom ne doit pas être vide'}) //En ce cas, en envoie une érreur au front.
            } else { //Sinon on procède à l'inscription
            bcrypt.hash(req.body.password, 10) //On hash le password avec un salt de 10.
            .then(hash => {
                const user = new User({ //Et on créer un nouvelle utilisateur dans la DB.
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash,
                    isAdmin: false, //Par défault, les utilisateurs ne sont pas admin...
                    description: 'Pas de Bio pour le moment!',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' //Et utilise un placeholder en avatar.       
                })
                user.save() //On sauvegarde ensuite notre user
            })
            .then(() => {res.status(200).json({message: 'Vous pouvez maintenant vous connecter!'})})  //et si tout va bien, un message de succès.
            .catch(error => res.status(400).json({ error : 'something went wrong ... ' + error})) //Sinon un message d'érreur    
            }
        }
    })
    .catch(error => res.status(500).json({ error : 'something went wrong ... ' + error}))  //Sinon un message d'érreur (si serveur)
}

/*********************************************************************************/
//notre middleware login, pour se connecter


exports.login = ( req, res, next) => {
    User.findOne({where: {userName: req.body.userName}}) //On recherche un utilisateur
        .then(user => { 
            if (!user) { 
                return res.status(401).json({error : 'Utilisateur non trouvé'}) //Si on en trouve aucun, alors on envoie au front une érreur.
            } 
            bcrypt.compare(req.body.password, user.password) //Ensuite on utilise Bcrypt pour comparer les mots de passes
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'mauvais mot de passe'}) //Si mauvais de passe, une érreur.
                    }
                   res.status(200).json({ //Sinon on renvoie l'utilisateur au front.
                       user: {
                            userId: user[0],
                            name: user.userName,
                       },
                    token: jwt.sign( //Et on signe le Token avec l'userId, l'userName, et si l'utilisateur est admin ou non.
                        {
                            userId: user.id,
                            userName: user.userName,
                            isAdmin: user.isAdmin
                        },
                        'RANDOM_TOKEN_SECRET', //En passage prod, on remplacera par un code plus complex, cela traduit notre token.
                        {expiresIn: '24h'} 
                    )
                })
            })
            .catch(error => { res.status(500).json({error})})  //Sinon un message d'érreur
        })
    .catch(error => { res.status(500).json(error)})  //Sinon un message d'érreur
}