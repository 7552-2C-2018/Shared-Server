var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var paymentController = require('../controllers/PaymentController')
var express = require('express');
var router = express.Router();

router.get('/', VerifyToken, paymentController.getPayments, function(req, res, next) {});

router.post('/', VerifyToken, paymentController.newPayment, function(req, res, next) {});

router.get('/methods/', VerifyToken, paymentController.getPaymentMethods, function(req, res, next) {});

module.exports = router;
