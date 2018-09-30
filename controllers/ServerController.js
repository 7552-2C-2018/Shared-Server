var db = require('../modules/databaseManager');

function addServer(req,res){
  db.db.one('select Add_AppServer (\''+req.body.name + '\',\''+req.body.url+'\') as Id')
	 .then(function (data) {
		  res.status(200).json({
          status: 'success',
          data : data,
			    message : 'New server Created'
		  });
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

/*router.put('/:serverId', VerifyToken, function(req, res, next) {
  db.db.one('select * from appservers inner join \''+ req.params.serverId+'\'')
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
});
*/

/*router.post('/:serverId', VerifyToken, function(req, res, next) {
	res.json({message: 'Reset Tokoen'});
});*/

/*router.delete('/:serverId', VerifyToken, function(req, res, next) {
	db.db.any('select delete_appserver ()')
	.then(function (data) {
		 res.status(200).json({
			message : 'Server deleted 10'
		});
});

});
*/
module.exports = {
	getServersInfo : getServersInfo,
	addServer : addServer,
  getServerInfo : getServerInfo
}
