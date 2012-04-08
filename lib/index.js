var basedir
  , prefixes = []
  , controllers = {}
  , util = require('util');

  
module.exports = function(bdir, prefixes){
  basedir = bdir;
  //routes = require(basedir + '/routes.js');
  prefixes = prefixes || [];

  return function(req, res, next){
  	req.params = _translator(req.url);
  	_dispatcher(req, res, next);
  } 
}
  
  
/*
	
	//Load the routes
	routes.rules.forEach(function(rule){
		app.all(rule.url, function(req, res){
			req.params = rule.target;
			_dispatcher(rule.type, rule.target)(req, res);
		});
	});	

}
*/

function _translator(url){
	//console.log('Translating: ' + url);

	var u = url.split('/').slice(1);
		
	return {
		prefix: (prefixes.indexOf(u[0])!=-1) ? u.shift() : undefined,
		controller:  u[0],
		action:  u[1] || 'index',
		params:  u.slice(2)
	}
} 

function _dispatcher(req, res, next){
	//console.log('Routing: ' + util.inspect(path));
	var c = {}
	  , path = req.params
	  , action = (path.prefix ? path.prefix + '_': '') + path.action + '_' + req.method;
	
	// Load the controller
	if (!path.controller) return next(Error('Controller not defined'));
	
	// Retrieve the controller if is not set	
	c = controllers[path.controller] ? controllers[path.controller] : require(basedir + '/' + path.controller);

	//retrieve the action
	if(!c[action]) return next( Error('Action ' + action + ' is not defined in ' + path.controller + ' controller'));
	
	//pass the control to the action
	c[action](req, res, next);
	
}

