var basedir
  , prefixes 
  , controllers = {};

  
module.exports = function(bdir, pfixes){
  basedir = bdir;
  prefixes = pfixes || [];

  return function(req, res, next){
  	req.params = _translator(req.url);
  	_dispatcher(req, res, next);
  } 
}
  
function _translator(url){
	var u = url.split('/').slice(1);
	
	return {
		prefix: (prefixes.indexOf(u[0])!=-1) ? u.shift() : undefined,
		controller:  u[0],
		action:  u[1] || 'index',
		params:  u.slice(2)
	}
} 

function _dispatcher(req, res, next){
	var c
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

