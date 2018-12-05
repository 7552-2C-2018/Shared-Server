var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var deliveryController = require('../controllers/DeliveryController');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post('/estimate/', VerifyToken, deliveryController.estimateDelivery, function(req, res, next) {});
module.exports = router;
