var util = require('util');

/*
  req.param = {
					prefix: ...,       //optional
					controller: ...,
					action: ...,
					params: [...]      //optional
				}
*/

//Private 
var prop1 = 0;

function printRoute (req, res){
	var p = (req.params.params) ? req.params.params.join('/') : '';
	res.end([req.params.prefix, req.params.controller, req.params.action, p].join('/'));
	console.log(++prop1);
}

//Public
module.exports = {
	index_GET: function(req, res) {
		printRoute(req, res);
	},
	admin_index_GET: function(req,res){
		printRoute(req, res);	
	},
	action1_GET: function(req,res){
		printRoute(req, res);	
	},
	action1_POST: function(req,res){
		res.write(req.body.username);
		printRoute(req, res);	
	},
	admin_index_PUT: function(req,res){
		res.write(req.body.username);
		printRoute(req, res);	
	}	
}

