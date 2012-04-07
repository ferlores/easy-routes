var basedir
  , routes
  , controllers = {}
  , util = require('util');

module.exports = setControllers;

function setControllers(app, bdir){
	basedir = bdir;
	routes = require(basedir + '/routes.js');

	routes.rules.forEach(function(rule){
		app.get(rule.url, function(req, res){
			_dispatcher(rule.target)(req, res);
		});
	});	
	
	app.get(/(.*)/, function(req, res){
		var o = _translator(req.params[0]),
		    fn= _dispatcher(o);
		    
		req.params = o.params.splice(3, 0, [o.prefix, o.controller, o.action]);
		fn(req, res);
	});
}


function _translator(url){
	console.log('Translating: ' + url);

	var u = url.split('/').slice(1);
		
	return {
		prefix: (routes.prefixes && routes.prefixes.indexOf(u[0])!=-1) ? u.shift() : undefined,
		controller:  u[0],
		action:  u[1] || 'index',
		params:  u.slice(2)
	}
} 

function _dispatcher(path){
	console.log('Routing: ' + util.inspect(path));
	var c = {};
	
	// Load the controller
	try{
		console.log(controllers);
		//retrieve the controller if is not set
		if (!path.controller) throw new Error('Controller not defined');
		(c = controllers[path.controller]) || 
				(c = controllers[path.controller] = require(basedir + "/controllers/" + path.controller));
	
		//retrieve the action
		(path.prefix) && (path.action = path.prefix + '_' + path.action);
		if(!c[path.action]) throw new Error('action ' + path.action + ' is not defined in ' + path.controller + ' controller');
		
		//returns the action
		return c[path.action];
	
	}catch(e){	
		return function(req, res){
			console.log(e);
			res.end('Error1: ' + e.message);	
		};
	}
}

