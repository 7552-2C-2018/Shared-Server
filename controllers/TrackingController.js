var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

function newShipment(req,res){
	var aShipment = req.body;
	var insertShipmentQuery = `insert into shipments (ownerId, start_time,
		   start_street, start_lat, start_lon,
		   end_time, end_street, end_lat, end_lon,
			 distance, currency, value)
			 values ('${aShipment.ownerid}',${aShipment.start.timestamp}, '${aShipment.start.address.street}', ${aShipment.start.address.location.lat}, ${aShipment.start.address.location.lon},
			 ${aShipment.end.timestamp}, '${aShipment.end.address.street}', ${aShipment.end.address.location.lat}, ${aShipment.end.address.location.lon},
			 ${aShipment.distance}, '${aShipment.cost.currency}', ${aShipment.cost.value}) RETURNING id;`;

	db.db.one(insertShipmentQuery)
	 .then(function (id) {
		 var insertStepsQuery = "";
		 console.log("Entro");
		 for (var i in aShipment.route){
			 var step = aShipment.route[i];
			 insertStepsQuery = insertStepsQuery +
			 `insert into shipmentsteps (lat,lon, timestamp, shipmentId)		values (
				 ${step.step.location.lat}, ${step.step.location.lon},${step.step.timestamp}, '${id.id}');`
		 }
		 console.log(insertStepsQuery);
			db.db.none(insertStepsQuery)
			.then(function (data){
				res.status(200).json({
						status: 'success',
						data : id,
						message : 'New shipment added'
				});
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
var query = `select row_to_json(trips) as trips
	from (select id, ownerId, json_build_object('address', json_build_object('street', start_street, 'location', json_build_object(
		'lat', start_lat, 'lon', start_lon
	)),'timestamp', start_time) as "Start",
	json_build_object('address', json_build_object('street', end_street, 'location', json_build_object(
		'lat', end_lat, 'lon', end_lon
	)),'timestamp', end_time) as "End", distance, state as "State",(select
		json_agg(route) as route from ( select json_build_object('location', json_build_object('lat',lat, 'lon',lon) ,'timestamp', "timestamp") as Step
		 from shipmentsteps where shipmentid = '${req.params.trackingId}' ) route),
		json_build_object('currency', currency, 'value', "value") as "Cost"  from shipments where id = '${req.params.trackingId}') trips`;
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


function updateShipmentState(req,res){
  var query = `update shipments set state = ${req.body.newState} where id=${req.params.trackingId};`
  db.db.any(query)
  .then(function(data) {
    res.status(200).json({
      status : 'success',
      data : data,
      message : 'Shipment state updated!'
    });
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
	updateShipmentState : updateShipmentState
}
