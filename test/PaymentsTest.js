let chai = require('chai');
let chaiHttp = require('chai-http');
var supertest = require('supertest');

const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';
const testId= 7;

describe('GET api/payments/methods/list', function(){
	it('should return payment methods' , function (done){
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

describe('GET api/payments/', function(){
	it('should return payments' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .get('/api/payments/')
						 .set('x-access-token', token)
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});

describe('GET api/payments/paymentId', function(){
	it('should return payment info' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .get('/api/payments/1')
						 .set('x-access-token', token)
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});

describe('POST /api/payments/', function(){
	it('should create new payment' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .post('/api/payments')
                         .set('x-access-token', token)
                         .send({currency:"ARS", value:10, expiration_month:"08", expiration_year:"2019",number:"4755884466889999", type:"Credit Card", ownerId:2})
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(201);
							 done();
						 });
					});

		});
});

describe('PUT api/payments/paymentId', function(){
	it('should update payment' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .put('/api/payments/1')
                         .set('x-access-token', token)
                         .send({newState:8})
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});
