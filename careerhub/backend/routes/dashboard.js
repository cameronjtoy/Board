const express = require('express');
const router = express.Router();
const dashboardController = require('../Controllers/dashboard_controller')

router.get('/companies', dashboardController.getCompanies)
// router.post('/companies', dashboardController.addCompanies)

module.exports = router