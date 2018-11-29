var RuleEngine = require("node-rules");
var db = require('../modules/databaseManager');
    
/* Creating Rule Engine instance */
var R = new RuleEngine();

function estimateDelivery(userId, points, price, distance, userMail) {
    /* rules */
    var rule_NegativePoints = {
        "condition": function (R) {
            R.when(this.points < 0);
        },
        "consequence": function (R) {
            this.result = -1;
            this.reason = "The delivery was not allowed, because the user has negative points.";
            R.stop();
        }
    };

    var rule_MinAmount = {
        "condition": function (R) {
            R.when(this.price < 50);
        },
        "consequence": function (R) {
            this.result = -1;
            this.reason = "The delivery was not allowed, because buying price is less than 50 ARS.";
            R.stop();
        }
    };
        
    var rule_FreeDeliveryWithDomainMail = {
        "condition": function (R) {
            R.when(this.userMail.indexOf("@comprame.com") > -1);
        },
        "consequence": function (R) {
            this.result = -2;
            this.reason = "The delivery is free, because the user has a mail with domain @comprame.com-";
            R.stop();
        }
    };

    var rule_PricePerKM = {
        "condition": function (R) {
            R.when(true);
        },
        "consequence": function (R) {
            this.result = this.distance * 15;
            R.next();
        }
    };

    var rule_DiscountWednesday = {
        "condition": function (R) {
            var d = new Date();
            R.when(d.getDay() == 3 && d.getHours() >= 16 && d.getHours() < 19);
        },
        "consequence": function (R) {
            this.result = this.result * 0.95;
            R.next();
        }
    };

    var rule_DiscountFirstTrip = {
        "condition": function (R) {
            var amountOfShipments = 0;
            db.db.any(`select count(*) amountOfShipments from shipments where ownerId = ${userId} group by ownerId`).then(function(data) { amountOfShipments = data;});
            R.when(amountOfShipments == 0);
        },
        "consequence": function (R) {
            this.result = this.result -100;
            if (this.result < 0){
                this.result = 0;
            }
            R.next();
        }
    };

    var rule_SurchargeBusinessDays = {
        "condition": function (R) {
            var d = new Date();
            R.when(d.getDay() >= 1 && d.getDay() <= 5 && d.getHours() >= 17 && d.getHours() < 19);
        },
        "consequence": function (R) {
            this.result = this.result * 1.10;
            R.next();
        }
    };

    var rule_SurchargeMoreThan10TripsInLast30Min = {
        "condition": function (R) {
            var amountOfShipments = 0;
            db.db.any(`select count(*) amountOfShipments from shipments where start_time >= extract(epoch from now() + INTERVAL '-30 minute')`).then(function(data) { amountOfShipments = data;});
            R.when(amountOfShipments > 10);
        },
        "consequence": function (R) {
            this.result = this.result * 1.15;
            R.next();
        }
    };

    var rule_DiscountMoreThan10Buys = {
        "condition": function (R) {
            var amountOfPayments = 0;
            db.db.any(`select count(*) amountOfShipments from shipments where ownerId = ${userId} group by ownerId`).then(function(data) { amountOfShipments = data;});
            R.when(amountOfPayments >= 10);
        },
        "consequence": function (R) {
            this.result = this.result * 0.95;
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
        "userMail":userMail
    };

    /* Check if the engine blocks it! */
    R.execute(fact, function (data) {
        if (data.result) {
            console.log("Valid transaction");
        } else {
            console.log("Blocked Reason:" + data.reason);
        }
    });
}