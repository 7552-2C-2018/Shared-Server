var promise = require('bluebird')

var options = {
	//Initialization Options
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);
//add query functions

module.exports = {
	db : db
};
