var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

router.get('/', VerifyToken, function(req, res, next) {
	res.json({message: 'Hi, this is the information of all app servers'});
});

router.post('/', VerifyToken, function(req, res, next) {
	db.db.any('insert into users (id,name) values (10, \''+req.body.user + '\')')
	.then(function (data) {

		 res.status(200).json({
			message : 'New server Created 10'
		});
});
});

router.get('/:serverId', VerifyToken, function(req, res, next) {
	res.json({message: 'Hi, get info about a server'});
});

router.put('/:serverId', VerifyToken, function(req, res, next) {
	res.json({message: 'Modify server data'});
});

router.post('/:serverId', VerifyToken, function(req, res, next) {
	res.json({message: 'Reset Tokoen'});
});

router.delete('/:serverId', VerifyToken, function(req, res, next) {
	db.db.any('delete from users where id = '+req.body.idd)
	.then(function (data) {

		 res.status(200).json({
			message : 'Server deleted 10'
		});
});

});

module.exports = router;
