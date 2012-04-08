/*!
* Easy Routes
* Copyright(c) 2012 Fernando Lores <ferlores@gmail.com>
* MIT Licensed
*/

var basedir, prefixes, controllers = {};

module.exports = function(bdir, pfixes) {
    return basedir = bdir, prefixes = pfixes || [], function(req, res, next) {
        req.params = _translator(req.url), _dispatcher(req, res, next);
    };
};

function _translator(url) {
    var u = url.split("/").slice(1);
    return {
        prefix: prefixes.indexOf(u[0]) != -1 ? u.shift() : undefined,
        controller: u[0],
        action: u[1] || "index",
        params: u.slice(2)
    };
}

function _dispatcher(req, res, next) {
    var c, path = req.params
      , action = (path.prefix ? path.prefix + "_" : "") + path.action + "_" + req.method;

    if (!path.controller) return next(Error("Controller not defined"));

	// Load the controller
    c = controllers[path.controller] ? controllers[path.controller] : require(basedir + "/" + path.controller);

    if (!c[action]) return next(Error("Action " + action + " is not defined in " + path.controller + " controller"));

	//pass the control to the action
    c[action](req, res, next);
};
