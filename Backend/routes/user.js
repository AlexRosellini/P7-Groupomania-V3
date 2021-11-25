/*********************************************************************************/
//On importe ce dont nous avons besoin.

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')
const auth = require("../middleware/auth");
const ValPassword = require('../middleware/validatorPassword'); //Notre middleware de validation
const ValEmail = require('../middleware/validatorEmail');

/*********************************************************************************/
//On créer nos routes post.

router.post('/signup', ValEmail, ValPassword, userCtrl.signup) //Le middleware de validation vérifie le mot de passe et passe au signup.
router.post('/login',  userCtrl.login)
router.get('/:id', userCtrl.oneUser)
//router.get('/', auth, userCtrl.getAllUsers)
//router.delete('/:id', auth, userCtrl.delete)
router.put('/:id', auth, userCtrl.updateUser)

/*********************************************************************************/
//On exporte note router.

module.exports = router