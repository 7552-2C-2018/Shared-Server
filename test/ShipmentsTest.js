let chai = require('chai');
let chaiHttp = require('chai-http');
var supertest = require('supertest');

const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';
const testId= 7;

describe('GET api/tracking/', function(){
	it('should return trackings' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .get('/api/tracking/')
						 .set('x-access-token', token)
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});

describe('GET api/tracking/trackingId', function(){
	it('should return tracking info' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .get('/api/tracking/1')
						 .set('x-access-token', token)
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});

describe('POST api/tracking/', function(){
	it('should create new shipment' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .post('/api/tracking')
                         .set('x-access-token', token)
                         .send({currency:"ARS", value:10, distance:"123.12", start_time:"12.2", start_street:"Avenida Test", start_lat:"432.12", start_lon:"785.2", end_time:"42.2", end_street:"Avenida test fin", end_lat:"45.2", end_lon:"653.26", ownerId:1})
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(201);
							 done();
						 });
					});

		});
});

describe('PUT api/tracking/trackingId', function(){
	it('should update payment' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .put('/api/tracking/1')
                         .set('x-access-token', token)
                         .send({newState:10, start_time:"23.2", end_time:"54.2"})
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});
