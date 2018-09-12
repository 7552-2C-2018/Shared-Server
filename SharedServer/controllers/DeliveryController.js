var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

router.post('/estimate/', VerifyToken, function(req, res, next) {
	res.json({message: 'Estimate time'});
});

module.exports = router;
