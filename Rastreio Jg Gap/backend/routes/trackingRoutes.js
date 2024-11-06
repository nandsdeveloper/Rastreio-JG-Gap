const express = require('express');
const trackingController = require('../controllers/trackingController');
const router = express.Router();

router.get('/track/:trackingNumber/:carrier', trackingController.trackPackage);

module.exports = router;
