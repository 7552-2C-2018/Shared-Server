var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

router.post('/', VerifyToken, function(req, res, next) {
	res.json({message: 'Creates new request'});
});

router.get('/:trackingId', VerifyToken, function(req, res, next) {
	res.json({message: 'Get shipment info'});
});

module.exports = router;
