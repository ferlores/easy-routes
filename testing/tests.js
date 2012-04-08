var http = require('http')
	, assert = require('assert')
	, querystring = require('qs')
	, counter = 0
	, app; 

module.exports = function(express){
	app = express;
	//Suite tests
	[
		{ //TEST 1
			name: '1- Controller + Index',
			input: {
			  host: 'localhost',
			  port: 3000,
			  path: '/controller1',
			  method: 'GET'
			},
			output: function(chunk, res){
				return (res.statusCode == 200 && chunk=='/controller1/index/');
			}			
		},
		{ //TEST 2
			name: '2- Controller + Action',
			input: {
			  host: 'localhost',
			  port: 3000,
			  path: '/controller1/action1',
			  method: 'GET'
			},
			output: function(chunk, res){
				return (res.statusCode == 200 && chunk=='/controller1/action1/');
			}			
		},
		{ //TEST 3
			name: '3- Prefix + Controller',
			input: {
			  host: 'localhost',
			  port: 3000,
			  path: '/admin/controller1',
			  method: 'GET'
			},
			output: function(chunk, res){
				return (res.statusCode == 200 && chunk=='admin/controller1/index/');
			}			
		},/*
		{ //TEST 4
			name: '4- Special routes',
			input: {
			  host: 'localhost',
			  port: 3000,
			  path: '/',
			  method: 'GET'
			},
			output: function(chunk, res){
				return (res.statusCode == 200 && chunk=='/controller1/index/');
			}			
		},	*/
		{ //TEST 5
			name: '5- Controller doesnt exist',
			input: {
			  host: 'localhost',
			  port: 3000,
			  path: '/q',
			  method: 'GET'
			},
			output: function(chunk, res){
				return (res.statusCode == 500);
			}			
		},
		{
			//TEST 6
			name: '6- POST request',
			input: {
			  host: 'localhost',
			  port: 3000,
			  path: '/controller1/action1',
			  method: 'POST',
			  data: querystring.stringify({'username': 'fer'}),
			  headers: {
				  'Content-Type': 'application/x-www-form-urlencoded',
				  'Content-Length': querystring.stringify({'username': 'fer'}).length
			  }
			},
			output: function(chunk, res){
				return (res.statusCode == 200) && (chunk=='fer' || chunk=='/controller1/action1/');
			}		
		},
		{
			//TEST 7
			name: '7- PUT request',
			input: {
			  host: 'localhost',
			  port: 3000,
			  path: '/admin/controller1/',
			  method: 'PUT',
			  data: querystring.stringify({'username': 'fer'}),
			  headers: {
				  'Content-Type': 'application/x-www-form-urlencoded',
				  'Content-Length': querystring.stringify({'username': 'fer'}).length
			  }
			},
			output: function(chunk, res){
				return (res.statusCode == 200) && (chunk=='fer' || chunk=='admin/controller1/index/');
			}		
		},
		{ //TEST 8
			name: '8- GET with params',
			input: {
			  host: 'localhost',
			  port: 3000,
			  path: '/controller1/index/param1=a/param2=b&param3:c',
			  method: 'GET'
			},
			output: function(chunk, res){
				return (res.statusCode == 200 && chunk=='/controller1/index/param1=a/param2=b&param3:c');
			}			
		}	
	].forEach(function(test){
		runTest(test);
	});
}

function runTest(test){
	var req = http.request(test.input, function(res) {
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
		  console.log('RUNNING: ' + test.name);
		  console.log(chunk);
		  assert.ok(test.output(chunk, res), test.name + ' Failed!');
		  console.log('[OK!]');
	  });
	  res.on('end', function () {
		!(--counter) && app.close() && console.log('ALL TESTS PASSED!'); 
	  });

	});
	
	req.on('data', function(e) {
	  console.log(e);
	});
	
	// write data to request body
	if(test.input.data){
		console.log('sending data: ' + test.input.data);
		req.write(test.input.data);
	}
	++counter;
	req.end();
}
