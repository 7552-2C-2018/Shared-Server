var db = require('../modules/databaseManager');
var ruleEngine = require('../modules/rulesEngine')

function estimateDelivery(req, res) {
	ruleEngine.estimateDelivery(req.body.userId, req.body.points, req.body.price, req.body.distance, req.body.userMail, res)
}
module.exports = {
	estimateDelivery :estimateDelivery
};
