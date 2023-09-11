const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller')
const createJWT = require('../middleware/authMiddleWare')

router.get('/profile', createJWT ,profileController.viewAccount)
router.post('/profile', createJWT ,profileController.addCompanyRow)
router.post('/profile/update', createJWT ,profileController.updateCompanyRow)



module.exports = router
