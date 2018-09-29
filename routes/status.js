var express = require('express');
var router = express.Router();

//var db = require('../queries');

//router.get('/api/test', db.test);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({"message": "Server up!"});
});



module.exports = router;
