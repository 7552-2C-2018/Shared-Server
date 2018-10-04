var VerifyToken = require('../modules/VerifyToken');
var db = require('../modules/databaseManager');
var express = require('express');
var router = express.Router();

function newShipment(req,res){
	db.db.one('select Add_App Server (\''+req.body.name + '\',\''+req.body.url+'\') as Id')
	 .then(function (data) {
			res.status(200).json({
					status: 'success',
					data : data,
					message : 'New server Created'
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
	)),'timestamp', end_time) as "End", distance, (select
		json_agg(route) as route from ( select * from shipmentsteps where shipmentid = '${req.params.trackingId}' ) route),
		json_build_object('currency', currency, 'value', "value") as "Cost"  from shipments where id = '${req.params.trackingId}') trips`
	db.db.one(query)
	 .then(function (data) {
			res.status(200).json({
					status: 'success',
					data : data,
					message : 'New server Created'
			});
	}).catch(function(err) {
      res.status(400).json({
        status : 'error',
        data : [],
        message : 'Error retrieving payment methods'
      });
});
}

module.exports = {
	newShipment : newShipment,
	getShipmentInfo : getShipmentInfo
}
