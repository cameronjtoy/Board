const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller')

router.get('/profile', profileController.viewAccount)
router.post('/profile', profileController.addCompanyRow)



module.exports = router
