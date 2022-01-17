/*********************************************************************************/
//On importe ce dont nous avons besoin.

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth")
const multer = require('../middleware/multer-config')


/*********************************************************************************/
//On créer nos routes user.

router.get('/', adminAuth, userCtrl.allUsers);
router.get('/:id', userCtrl.oneUser);
router.put('/:id', auth, multer, userCtrl.updateUser);
router.put('/admin/:id', adminAuth, multer, userCtrl.updateUserAdmin);
router.delete('/:id', adminAuth, multer, userCtrl.deleteUser);


/*********************************************************************************/
//On exporte note router.

module.exports = router