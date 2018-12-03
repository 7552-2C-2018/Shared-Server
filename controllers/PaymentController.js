var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');

var router = express.Router();

function getPaymentMethods(req,res) {
  var query = `select row_to_json(paymethods) as "Paymethods"
from(
select paymethod, json_agg(parameter) as Parameters from paymentmethods group by paymethod
) paymethods;`;
  db.db.any(query)
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
  expiration_month, expiration_year, number, type, state, ownerId from payments;`
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
        message : 'Error Retrieving payments'
      });
});
}

function getPaymentInfo(req,res){
  var query = `select transaction_id, currency, value,
  expiration_month, expiration_year, number, type, state, ownerId from payments where transaction_id = ${req.params.transactionId};`
  db.db.any(query)
  .then(function(data) {
    res.status(200).json({
      status : 'success',
      data : data,
      message : 'Payment retrieved'
    });
  }).catch(function(err) {
  	  res.status(400).json({
        status : 'error',
        data : [],
        message : 'Error Retrieving payment'
      });
});
}

function updatePaymentState(req,res){
  var query = `update payments set state = ${req.body.newState} where transaction_id=${req.params.transactionId};`
  db.db.any(query)
  .then(function(data) {
    res.status(200).json({
      status : 'success',
      data : data,
      message : 'Payment state updated!'
    });
  }).catch(function(err) {
  	  res.status(400).json({
        status : 'error',
        data : [],
        message : 'Error updating payment state'
      });
});
}

function newPayment(req, res) {
  var query = `insert into payments (currency, value, expiration_month,
     expiration_year, number , type, ownerId) values (
      '${req.body.currency}', ${req.body.value},
      '${req.body.expiration_month}',
          '${req.body.expiration_year}', '${req.body.number}','${req.body.type}', '${req.body.ownerId}') RETURNING transaction_id`;
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
  getPaymentInfo : getPaymentInfo,
	newPayment : newPayment,
  updatePaymentState : updatePaymentState
}
