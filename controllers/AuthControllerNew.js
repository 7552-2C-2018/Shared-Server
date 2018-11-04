var express = require('express');
var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../modules/config');
var db = require('../modules/databaseManager');

function login(id) {
  db.db.one('select * from users where loginId ='+ id)
    .then((data) => {
      var duration = 7 * 24 * 60 * 60;
      var token;
      var expirationTimestamp = Math.floor(new Date().getTime() / 1000) + duration;
      token = jwt.sign({ id: data.id }, config.secret, {
        expiresIn: duration
      });
      return { statusCode: 201, jsonRes:{expiresAt: expirationTimestamp, token: token} }
    }).catch((err) => {
      console.log(err)
      return { statusCode: 400 }
    });
}

module.exports = {
  login : login
}
