var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../modules/config');
var db = require('../modules/databaseManager');

router.post('/login/', function(req, res,next) {
	db.db.one('select * from users where id ='+req.body.id)
	.then(function (data) {
		 // create a token
    var token = jwt.sign({ id: data.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

		 res.status(200).json({
			auth: true, token: token
		});
}).catch(function(err) {
		res.status(400).send();
		});
});


module.exports = router;
