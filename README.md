
# Easy Routes
  Extreamly light middleware that creates some default routes for structuring responses inside controllers like cakePHP. Works with [Connect](http://github.com/senchalabs/connect) and [Express](http://github.com/visionmedia/express) 
  
     var app = http.createServer()
       , prefixes = ['admin'];
	     
     app.configure(function(){
	  app.use(require('../')(__dirname + '/controllers', prefixes));  
	 });
     
     app.listen(3000);

## Features
  * Creates default routes for /<prefix>/<controller>/<action>/<params>
  * Looks up the controller/action in the directory passed by param 
  * Controllers are loaded on demand and only once.
  * In the handler:  
	req.param = {
		prefix: ...,       //optional
		controller: ...,
		action: ...,
		params: [...]      //optional
	}
	
## Installation

    $ npm install easy-routes

## Controllers example
	
	module.exports = {
		index_GET: function(req, res) {
			/* handle the request */
		},
		admin_index_GET: function(req,res){
			/* handle the request */	
		},
		action_POST: function(req,res){
			/* handle the request */	
		},
		<prefix>_action_<method>: function(req, res){
			/* handle the request */
		}
	}
	
## Quick start
  * Install easy-routes (npm install easy-routes)
  * Creates a controllers folder
  * Add the easy-routes middleware
  * Creates a controller inside the folder (see controlles example)
  * Visit http://localhost:3000/controller/action
	
## Running Tests

    $ cd ./testing 
    $ npm install -d
    $ node app.js

Test suites are in ./testing/tests.js

## License 

(The MIT License)

Copyright (c) 2012 Fenando Lores &lt;ferlores@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
