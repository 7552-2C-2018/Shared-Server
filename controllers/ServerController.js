var db = require('../modules/databaseManager');
var authController = require('../controllers/AuthController')

function addServer(req,res){
  db.db.one('select Add_AppServer (\''+req.body.name + '\',\''+req.body.url+'\') as Id')
	 .then(function (data) {
		  res.status(200).json({
          status: 'success',
          data : data,
			    message : 'New server Created'
		  });
  }).catch(function(err) {
    		  res.status(400).send();
  });
}

function getServersInfo(req, res){
  db.db.any('select * from appservers')
  .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved App servers info'
          });
        })
  .catch(function(err) {
  		  res.status(400).send();
  });
}

function getServerInfo(req, res){
  db.db.one('select * from appservers where id = \''+ req.params.serverId+'\'')
  .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved App server info'
          });
        })
  .catch(function(err) {
  		  res.status(400).send();
  });
}

function modifyServer (req, res) {
  console.log(req.body)
  db.db.none('update appservers set name = \''+req.body.name + '\', url = \''+ req.body.url+'\' where id = \''+ req.params.serverId+'\'')
  .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Modified App server info'
          })
        })
  .catch(function(err) {
        res.status(400).send();
  });
}


function refreshToken(req, res){
  authController.login(req, res)
}

function deleteServer(req, res){
  db.db.any('select delete_appserver ('+ req.params.serverId +')')
	 .then(function (data) {
		  res.status(200).json({
			    message : 'Server deleted'
		  })
  }).catch(function(err) {
     res.status(400).send();
   });
}

module.exports = {
	getServersInfo : getServersInfo,
	addServer : addServer,
  getServerInfo : getServerInfo,
  modifyServer : modifyServer,
  deleteServer : deleteServer,
  refreshToken : refreshToken
}
