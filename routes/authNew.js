var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var authController = require('../controllers/AuthController')

//Get an access Tokoen
router.post('/token', function(req, res,next) {

	 var id = !req.params.serverId ? req.body.id : req.params.serverId;
	loginInfo = authController.login(id)
	res.status(loginInfo.statusCode).json(loginInfo.jsonRes)
});

module.exports = router;
