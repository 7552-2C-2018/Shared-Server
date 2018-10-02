var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');

var router = express.Router();

function addServer(req,res){
  db.db.one('select Add_App Server (\''+req.body.name + '\',\''+req.body.url+'\') as Id')
	 .then(function (data) {
		  res.status(200).json({
          status: 'success',
          data : data,
			    message : 'New server Created'
		  });
  });
}

function getPaymentMethods(req,res) {
  db.db.any('select description from paymentMethods')
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
  db.db.any('select * from payments')
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
      '${req.body.payment_method}', '${req.body.currency}', ${req.body.value},
      '${req.body.expiration_month}',
          '${req.body.expiration_year}', '${req.body.number}','${req.body.type}')`;
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
