let chai = require('chai');
let chaiHttp = require('chai-http');
var supertest = require('supertest');

const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000/api/auth/';

describe('POST api/auth/login/ with valid id', function(){
	it('should return a token for app server' , function (done){
		chai.request(url)
			 .post('/login/')
			 .send({id:10})
			 .end( function(err,res){
				 console.log(res.body)
				expect(res).to.have.status(200);
				done();
					});
		});
});


describe('POST api/auth/login/ with invalid id', function(){
	it('should not return a token for app server' , function (done){
		chai.request(url)
			 .post('/login/')
			 .send({id:52})
			 .end( function(err,res){
				 console.log(res.body)
				expect(res).to.have.status(400);
				done();
					});
		});
});
