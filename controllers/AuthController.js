var express = require('express');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../modules/config');
var db = require('../modules/databaseManager');

function login(req, res) {
  var id = !req.params.serverId ? req.body.id : req.params.serverId;
  db.db.one('select * from users where loginId ='+ id)
    .then((data) => {
      var duration = 7 * 24 * 60 * 60;
      var token;
      var expirationTimestamp = Math.floor(new Date().getTime() / 1000) + duration;
      token = jwt.sign({ id: data.id }, config.secret, {
        expiresIn: duration
      });

      res.status(201).json({
        expiresAt: expirationTimestamp, token: token
      });
    }).catch((err) => {
      res.status(400).send();
});
        }

module.exports = {
  login : login
}
