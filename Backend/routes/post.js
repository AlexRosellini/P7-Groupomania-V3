/*********************************************************************************/
//On importe ce dont nous avons besoin et on créer notre router

const express = require('express')
const router = express.Router() //On annonce ce fichier comme router
const auth = require('../middleware/auth') 
const multer = require('../middleware/multer-config')
const postCtrl = require('../controllers/posts')

/*********************************************************************************/
//On créer nos routes

//Chaque route aura "Auth" qui permet d'authentifier l'utilisateur sur chaque demandes.
//router.get('/', auth, postCtrl.getAllPosts) //Tout les posts
//router.get('/:id', auth, postCtrl.getOnePost); //un post
router.post("/create", auth, multer, postCtrl.createPost);
//router.post('/:id/like', auth, postCtrl.likesDislikes)
//router.put('/:id', auth, multer, postCtrl.modifyPost); //On ajoute multer ici également, pour gêrer les modifications d'images.
//router.delete('/:id', auth, postCtrl.deletePost);

/*********************************************************************************/
//On exporte notre module.

module.exports = router
