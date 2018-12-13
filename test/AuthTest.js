let chai = require('chai');
let chaiHttp = require('chai-http');
var supertest = require('supertest');

const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';
const testId = 7;

describe('POST api/auth/token with valid id', function(){
	it('should return a token for app server' , function (done){
		chai.request(url)
			 .post('/api/auth/token')
			 .send({id:testId})
			 .end( function(err,res){
				 console.log(res.body);
				expect(res).to.have.status(201);
				done();
					});
		});
});


describe('POST api/auth/token with invalid id', function(){
	it('should not return a token for app server' , function (done){
		chai.request(url)
			 .post('/api/auth/token')
			 .send({id:52})
			 .end( function(err,res){
				 console.log(res.body);
				expect(res).to.have.status(400);
				done();
					});
		});
});

describe('GET api/payments/methods/list with token', function(){
	it('should allow access to route' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .get('/api/payments/methods/list')
						 .set('x-access-token', token)
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});


describe('POST /api/deliveries/estimate without token', function(){
	it('should not allow access to route' , function (done){
		chai.request(url)
			 .post('/api/deliveries/estimate/')
			 .end( function(err,res){
				 console.log(res.body)
				expect(res).to.have.status(403);
				done();
					});
		});
});

describe('POST /api/deliveries/estimate with invalid token', function(){
	it('should not allow access to route' , function (done){
		chai.request(url)
			 .post('/api/deliveries/estimate/')
			 .set('x-access-token', 'invalid')
			 .end( function(err,res){
				 console.log(res.body)
				expect(res).to.have.status(500);
				done();
					});
		});
});

describe('POST /api/deliveries/estimate with invalid token', function(){
	it('should not allow access to route' , function (done){
		chai.request(url)
			 .post('/api/deliveries/estimate/')
			 .set('x-access-token', 'invalid')
			 .end( function(err,res){
				 console.log(res.body)
				expect(res).to.have.status(500);
				done();
					});
		});
});
