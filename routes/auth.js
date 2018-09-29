var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var authController = require('../controllers/AuthController')

//Get an access Tokoen
router.post('/token', function(req, res,next) {
  console.log('id:' + req.body.id);
	authController.login(req, res)
});

module.exports = router;
