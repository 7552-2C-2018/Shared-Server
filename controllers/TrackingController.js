var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();
let chai = require('chai');
let chaiHttp = require('chai-http');
var config = require('../modules/config')
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'app-server-23.herokuapp.com';

console.log("Userid:"+config.appUser);
console.log("Token:"+config.appToken);
function newShipment(req,res){
	var aShipment = req.body;
	var startTime = req.body.hasOwnProperty('start_timestamp') ? req.body.start_timestamp : '0';
	var endTime = req.body.hasOwnProperty('end_timestamp') ? req.body.end_timestamp : '0';
	var insertShipmentQuery = `insert into shipments (ownerId, start_time,
		   start_street, start_lat, start_lon,
		   end_time, end_street, end_lat, end_lon,
			 distance, currency, value)
			 values ('${aShipment.ownerId}',`+startTime+`, '${aShipment.start_street}', ${aShipment.start_lat}, ${aShipment.start_lon},
			 `+endTime+`, '${aShipment.end_street}', ${aShipment.end_lat}, ${aShipment.end_lon},
			 ${aShipment.distance}, '${aShipment.currency}', ${aShipment.value}) RETURNING id;`;
	db.db.one(insertShipmentQuery)
		.then(function (data){
				res.status(201).json({
						status: 'success',
						data : data,
						message : 'New shipment added'
				});
			}).catch(function(err) {
      res.status(400).json({
        status : 'error',
        data : [],
        message : 'Error adding shipment'
      });
	});
}

function getShipmentInfo(req,res){
var query = `select * from shipments where id = ${req.params.trackingId}`;
	console.log(query)
	db.db.one(query)
	 .then(function (data) {
			res.status(200).json({
					status: 'success',
					data : data,
					message : 'Shipments retrieved'
			});
	}).catch(function(err) {
		console.log(err)
      res.status(400).json({
        status : 'error',
        data : [],
        message : 'Error retrieving shipments'
      });
});
}


function getAllShipments(req,res){
var query = `select * from shipments`;
	console.log(query)
	db.db.any(query)
	 .then(function (data) {
			res.status(200).json({
					status: 'success',
					data : data,
					message : 'Shipments retrieved'
			});
	}).catch(function(err) {
		console.log(err)
      res.status(400).json({
        status : 'error',
        data : [],
        message : 'Error retrieving shipments'
      });
});
}

function updateShipmentState(req,res){
	var startTime = req.body.start_time;
	var endTime = req.body.end_time;
	var trackingId = req.params.trackingId;
	var newState = req.body.newState;
  var query = `update shipments set state = ${newState}, start_time = ${startTime}, end_time = ${endTime} where id=${trackingId};`
	db.db.none(query)
  .then(function(data) {
		chai.request(url)
		.put('/buys/tracking_id='+trackingId)
		.set('content-type', 'application/x-www-form-urlencoded')
    .set('UserId', config.appUser)
    .set('Token', config.appToken)
    .send({State:newState})
    .end( function(err,resNotify){
			console.log("State change notified");
			console.log(resNotify.statusCode);
    	res.status(200).json({
      	status : 'success',
      	data : [],
      	message : 'Shipment state updated!'
    	});});
  }).catch(function(err) {
  	  res.status(400).json({
        status : 'error',
        data : [],
        message : 'Error updating shipment state'
      });
});
}

module.exports = {
	newShipment : newShipment,
	getShipmentInfo : getShipmentInfo,
	updateShipmentState : updateShipmentState,
	getAllShipments : getAllShipments
}
