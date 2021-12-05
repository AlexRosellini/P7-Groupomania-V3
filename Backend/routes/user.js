/*********************************************************************************/
//On importe ce dont nous avons besoin.

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')
const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config')


/*********************************************************************************/
//On créer nos routes.

router.get('/', auth, userCtrl.allUsers)
router.get('/:id', userCtrl.oneUser)
router.put('/:id', auth, multer, userCtrl.updateUser)

/*********************************************************************************/
//On exporte note router.

module.exports = router