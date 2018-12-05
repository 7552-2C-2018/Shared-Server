var supertest = require('supertest');
var ruleEngine = require('../modules/rulesEngine')

describe('Reglas calcular costo envio', function(){
	it('should return a cost (we \'re not greedy'), function (done){
		console.log(ruleEngine.estimateDelivery(1, 2, 3,4,5))
	}
});
