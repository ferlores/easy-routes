var util = require('util');

/*
  req.param = {
					prefix: ...,       //optional
					controller: ...,
					action: ...,
					params: [...]      //optional
				}
*/
module.exports = {
	index_GET: function(req, res) {
		printRoute(req, res);
	},
	admin_index_GET: function(req,res){
		printRoute(req, res);	
	}
}

function printRoute(req, res){
	res.end([req.params.prefix, req.params.controller, req.params.action, req.params.params].join('/'));
}
