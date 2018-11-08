var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var trackingController = require('../controllers/TrackingController')

router.post('/', VerifyToken, trackingController.newShipment, function(req, res, next) {});

router.put('/:trackingId', VerifyToken, trackingController.updateShipmentState, function(req, res, next) {});

router.get('/', VerifyToken, trackingController.getAllShipments, function(req, res, next) {});

router.get('/:trackingId', VerifyToken, trackingController.getShipmentInfo, function(req, res, next) {});

module.exports = router;
