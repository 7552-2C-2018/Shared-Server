var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.json({"message": "Server up!"});
});

module.exports = router;
