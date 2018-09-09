var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

router.get('/', VerifyToken, function(req, res, next) {
	res.json({message: 'Get my payments'});
});

router.post('/', VerifyToken, function(req, res, next) {
	res.json({message: 'Generate new payment'});
});

router.get('/methods/', VerifyToken, function(req, res, next) {
	res.json({message: 'Get available payment methods'});
});


module.exports = router;
