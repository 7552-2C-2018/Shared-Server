let chai = require('chai');
let chaiHttp = require('chai-http');
var supertest = require('supertest');

const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';
const testId= 7;

describe('GET api/servers/', function(){
	it('should return servers' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .get('/api/servers/')
						 .set('x-access-token', token)
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});

describe('GET api/servers/serverId', function(){
	it('should return server info' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .get('/api/servers/6')
						 .set('x-access-token', token)
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});

describe('POST api/servers/6', function(){
	it('should reset server token' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .post('/api/servers/7')
                         .set('x-access-token', token)
                         .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(201);
							 done();
						 });
					});

		});
});
