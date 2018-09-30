var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

var serverController = require ('../controllers/ServerController')

router.get('/', VerifyToken, serverController.getServersInfo, function(req, res, next) {});

router.post('/', serverController.addServer, function(req, res, next) {});

router.get('/:serverId', VerifyToken, serverController.getServerInfo, function(req, res, next) {});
/*
router.put('/:serverId', VerifyToken, serverController.modifyServer,  function(req, res, next) {});

router.post('/:serverId', VerifyToken, serverController.refreshToken, function(req, res, next) {});

router.delete('/:serverId', VerifyToken, serverController.deleteToken, function(req, res, next) {});
*/
module.exports = router;
