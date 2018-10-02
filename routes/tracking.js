var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();
var trackingController = require('../controllers/TrackingController')

router.post('/', VerifyToken, trackingController.newShipment, function(req, res, next) {});

router.get('/:trackingId', VerifyToken, trackingController.getShipmentInfo, function(req, res, next) {});

module.exports = router;
