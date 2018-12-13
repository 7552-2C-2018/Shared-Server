let chai = require('chai');
let chaiHttp = require('chai-http');
var supertest = require('supertest');

const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';
const testId= 7;

describe('POST api/deliveries/estimate with token', function(){
	it('should allow access to route' , function (done){
		var token;
		chai.request(url)
			 .post('/api/auth/token/')
			 .send({id:testId})
			 .end( function(err,res){
				 token = res.body.token;
				 chai.request(url)
						 .post('/api/deliveries/estimate/')
						 .set('x-access-token', token)
						 .send({userId:1, points:20,price:200, distanc:2323,userMail:"prueba@gmail.com"})
						 .end( (err,res) =>{
							 console.log(res.body);
							 expect(res).to.have.status(200);
							 done();
						 });
					});

		});
});
