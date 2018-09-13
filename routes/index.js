var express = require('express');
var router = express.Router();

//var db = require('../queries');

//router.get('/api/test', db.test);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: process.env.SECRET });
});



module.exports = router;
