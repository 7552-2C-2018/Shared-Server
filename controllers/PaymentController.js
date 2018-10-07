var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');

var router = express.Router();

function getPaymentMethods(req,res) {
  db.db.any(`select row_to_json(paymethods) as "Paymethods"
from(
select paymethod, json_agg(parameter) as Parameters from paymentmethods group by paymethod
) paymethods`)
  .then(function(data) {
    res.status(200).json({
      status : 'success',
      data : data,
      message : 'Payment methods retrieved'
    });
  }).catch(function(err) {
      res.status(400).json({
        status : 'error',
        data : [],
        message : 'Error retrieving payment methods'
      });
});
}

function getPayments(req,res){
  var query = `select transaction_id, currency, value,
  json_build_object(expiration_month, expiration_year, number, type) paymentMethod from payments;`
  db.db.any(query)
  .then(function(data) {
    res.status(200).json({
      status : 'success',
      data : data,
      message : 'Payments retrieved'
    });
  }).catch(function(err) {
  	  res.status(400).json({
        status : 'error',
        data : [],
        message : 'Error Retrieving payment'
      });
});
}

function newPayment(req, res) {
  var query = `insert into payments (payment_method, currency, value, expiration_month,
     expiration_year, number , type) values (
      '${req.body.paymentMethod.method}', '${req.body.currency}', ${req.body.value},
      '${req.body.paymentMethod.expiration_month}',
          '${req.body.paymentMethod.expiration_year}', '${req.body.paymentMethod.number}','${req.body.paymentMethod.type}')`;
  db.db.any(query)
  .then(function(data) {
    res.status(200).json({
      status : 'success',
      data : data,
      message : 'New Payment'
    });
  }).catch(function(err) {
      res.status(400).json({
        status : 'error',
        data : err,
        message : 'Error creating payment'
      });
  });
}


module.exports = {
	getPaymentMethods : getPaymentMethods,
	getPayments : getPayments,
	newPayment : newPayment
}
