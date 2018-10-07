var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post('/estimate/', VerifyToken, function(req, res, next) {
	res.json({message: 'Estimate time'});
});

module.exports = router;
