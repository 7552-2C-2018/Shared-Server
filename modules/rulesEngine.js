var RuleEngine = require("node-rules");
var db = require('../modules/databaseManager');

/* Creating Rule Engine instance */
var R = new RuleEngine();
var cost = 0
function estimateDelivery(userId, points, price, distance, userMail, res) {
    /* rules */
    var rule_NegativePoints = {
        "priority" : 20,
        "condition": function (R) {
            R.when(this.points < 0);
        },
        "consequence": function (R) {
            cost = -1
            this.reason = "The delivery was not allowed, because the user has negative points.";
            R.stop();
        }
    };

    var rule_MinAmount = {
      "priority" : 19,
        "condition": function (R) {
            R.when(this.price < 50);
        },
        "consequence": function (R) {
            cost = -1;
            this.reason = "The delivery was not allowed, because buying price is less than 50 ARS.";
            R.stop();
        }
    };

    var rule_FreeDeliveryWithDomainMail = {
      "priority" : 18,
        "condition": function (R) {
            R.when(this.userMail.indexOf("@comprame.com") > -1);
        },
        "consequence": function (R) {
            cost = -2;
            this.reason = "The delivery is free, because the user has a mail with domain @comprame.com-";
            R.stop();
        }
    };

    var rule_PricePerKM = {
      "priority" : 17,
        "condition": function (R) {
            R.when(true);
        },
        "consequence": function (R) {
            cost = this.distance * 15;
            R.next();
        }
    };

    var rule_DiscountWednesday = {
        "priority" : 16,
        "condition": function (R) {
            var d = new Date();
            R.when(d.getDay() == 3 && d.getHours() >= 16 && d.getHours() < 19);
        },
        "consequence": function (R) {
            cost = cost * 0.95;
            R.next();
        }
    };

    var rule_SurchargeBusinessDays = {
        "priority" : 14,
        "condition": function (R) {
            var d = new Date();
            R.when(d.getDay() >= 1 && d.getDay() <= 5 && d.getHours() >= 17 && d.getHours() < 19);
        },
        "consequence": function (R) {
            cost = cost * 1.10;
            R.next();
        }
    };

    var rule_DiscountFirstTrip = {
        "priority" : 15,
        "condition": function (R) {
            var amountOfShipments = 0;
            db.db.any(`select coalesce((select count(ownerId) amountOfShipments from shipments where ownerId = '${userId}' and state <> 10  group by ownerId), 0) amountOfShipments;`)
            .then(function(data) { amountOfShipments = data; R.when(amountOfShipments == 0);});
        },
        "consequence": function (R) {
            cost = cost -100;
            if (cost < 0){
                cost = 0;
            }
            R.next();
        }
    };


    var rule_SurchargeMoreThan10TripsInLast30Min = {
        "priority" : 13,
        "condition": function (R) {
            var amountOfShipments = 0;
            db.db.any(`select coalesce((select count(*) amountOfShipments from shipments where state <> 10 and start_time >= extract(epoch from now() + INTERVAL '-30 minute')), 0) amountOfShipments;`).then(function(data) { amountOfShipments = data;R.when(amountOfShipments > 10);});
        },
        "consequence": function (R) {
            cost = cost * 1.15;
            R.next();
        }
    };

    var rule_DiscountMoreThan10Buys = {
        "priority" : 12,
        "condition": function (R) {
            var amountOfPayments = 0;
            db.db.any(`select coalesce((select count(*) amountOfPayments from payments where ownerId = '${userId}' and state = 8 group by ownerId), 0) amountOfPayments `).then(function(data) { amountOfPayments = data; R.when(amountOfPayments >= 10);});
        },
        "consequence": function (R) {
            cost = cost * 0.95;
            R.next();
        }
    };

    /* Register Rules */
    R.register(rule_NegativePoints);
    R.register(rule_MinAmount);
    R.register(rule_FreeDeliveryWithDomainMail);
    R.register(rule_PricePerKM);
    R.register(rule_DiscountWednesday);
    R.register(rule_DiscountFirstTrip);
    R.register(rule_SurchargeBusinessDays);
    R.register(rule_SurchargeMoreThan10TripsInLast30Min);
    R.register(rule_DiscountMoreThan10Buys);


    var fact = {
        "userId": userId,
        "points": points,
        "distance":distance,
        "price": price,
        "userMail":userMail,
    };

    /* Check if the engine blocks it! */
    R.execute(fact, function (data) {
        if (data.result >= 0) {
            console.log("Valid transaction");

        } else {
            console.log("Blocked Reason:" + data.reason);
        }
        res.status(200).json({
          status : 'success',
          ShipmentCost : cost,
          message : 'Estimation complete'
        });
    });
}

module.exports = {
	estimateDelivery : estimateDelivery
};
