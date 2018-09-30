var express = require('express');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../modules/config');
var db = require('../modules/databaseManager');

function login(req, res){
	db.db.one('select * from users where loginId ='+req.body.id)
	.then(function (data) {
		var duration = 86400
		var expirationTimestamp = new Date();
		expirationTimestamp.setDate(expirationTimestamp.getDate() + 1);
		console.log(expirationTimestamp)
		 // create a token
    var token = jwt.sign({ id: data.id }, config.secret, {
      expiresIn: duration
    });

		 res.status(201).json({
			expiresAt: Math.floor(expirationTimestamp / 1000), token: token
		});
}).catch(function(err) {
		console.log(err)
		res.status(400).send();
		});
}

module.exports = {
	login : login
}
