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
	test: test
};

function test(req,res,next) {
	db.any('select 23')
	.then(function (data) {
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved query'
		});
	})
	.catch(function(err){
		return next(err);
	});
}
