/*********************************************************************************/
//On importe ce dont nous avons besoin et on créer notre router

const express = require('express')
const router = express.Router() //On annonce ce fichier comme router
const auth = require('../middleware/auth') 
const multer = require('../middleware/multer-config')
const commentCtrl = require('../controllers/comment')

/*********************************************************************************/
//On créer nos routes

router.post("/:id", auth, multer, commentCtrl.createComment);
router.put('/:id', auth, multer, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

/*********************************************************************************/
//On exporte notre module.

module.exports = router