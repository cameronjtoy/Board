const express = require('express');
const router = express.Router();
const profileController = require('../Controllers/profileController')

router.get('/profile', profileController.viewAccount)
router.post('/profile', profileController.updateAccount)


module.exports = router