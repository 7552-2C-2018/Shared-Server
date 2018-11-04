var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var paymentController = require('../controllers/PaymentController')
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', VerifyToken, paymentController.getPayments, function(req, res, next) {});

router.post('/', VerifyToken, paymentController.newPayment, function(req, res, next) {});

router.put('/:transactionId', VerifyToken, paymentController.updatePaymentState, function(req, res, next) {});

router.get('/methods/', VerifyToken, paymentController.getPaymentMethods, function(req, res, next) {});

module.exports = router;
