/*********************************************************************************/
//On importe ce dont nous avons besoin.

const bcrypt = require('bcrypt'); //Bcrypt sert à Hash (et donc sécuriser) les passwords
const jwt = require('jsonwebtoken'); //jsonwebtoken genère un token (pour que nos users ne se connectent qu'une fois)
const Post = require('../models/post'); //on importe le schéma pour nos utilisateurs.
const Sequelize = require('sequelize')


/*********************************************************************************/
//notre middleware creation, pour créer un post

exports.createPost = (req, res) => {
    let image
    if (req.body.title === null || !req.body.title) {
        res.status(400).json({message: 'Votre post doit avoir un titre!'})
    }
    if (req.body.textContent === null || !req.body.textContent) {
        res.status(400).json({message: 'Votre post ne doit pas être vide!'})
    }
    else {
    
    if (req.file) {
        image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  
    }
    const post = new Post({
        title: req.body.title,
        textContent: req.body.textContent,
        author: req.body.author,
        image: image
    })
    post.save()
    .then(() => {res.status(200).json({message: 'success'})})     
    .catch(error => res.status(400).json({ message : 'something went wrong ... ' + error})) //Sinon un message d'érreur (si même email)
    }

}
