/*********************************************************************************/
//On importe ce dont nous avons besoin.

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')
const auth = require("../middleware/auth");
const ValPassword = require('../middleware/validatorPassword'); //Notre middleware de validation
const ValEmail = require('../middleware/validatorEmail');

/*********************************************************************************/
//On créer nos routes.

router.get('/:id', userCtrl.oneUser)
router.put('/:id', auth, userCtrl.updateUser)

/*********************************************************************************/
//On exporte note router.

module.exports = router