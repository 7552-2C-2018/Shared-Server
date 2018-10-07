var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var serverController = require ('../controllers/ServerController')

router.get('/', VerifyToken, serverController.getServersInfo, function(req, res, next) {});

router.post('/', serverController.addServer, function(req, res, next) {});

router.get('/:serverId', VerifyToken, serverController.getServerInfo, function(req, res, next) {});

router.put('/:serverId', VerifyToken, serverController.modifyServer,  function(req, res, next) {});

router.post('/:serverId', VerifyToken, serverController.refreshToken, function(req, res, next) {});

router.delete('/:serverId', VerifyToken, serverController.deleteServer, function(req, res, next) {});

module.exports = router;
