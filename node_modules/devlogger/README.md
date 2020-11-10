# devlogger
HTTP request logger middleware for node.js based on [morgan](https://www.npmjs.org/package/morgan)

#### USAGE

	"use strict";

	var logger = require( 'devlogger' );
	var express = require( 'express' );
	var app = express();
	
	function response( req, res ) {
	    res.json( {result: "ok"} );
	}
	
	app.use( logger( 'dev' ) );
	app.use( "/", response );
	app.listen( 5000 );

result

	-> 10:28:39.849 GET > 304 > / - Chrome 38.0.2125 > Other > Mac OS X 10.10.0 > 127.0.0.1
	-> 10:36:55.310 GET > 200 > / - Mobile Safari 8.0 > iPhone > iOS 8.1 > 10.58.100.201

	
Or even


	"use strict";

	var logger = require( 'devlogger' );
	var express = require( 'express' );
	var app1 = express();
	var app2 = express();
	require( "colors" );

	function response( req, res ) {
	    res.json( {result: "ok"} );
	}
	
	app1.use( logger( 'SERVER1 '.green + logger.dev ) );
	app1.use( "/", response );
	app1.listen( 5000 );
	
	app2.use( logger( 'SERVER2 '.blue + logger.dev ) );
	app2.use( "/", response );
	app2.listen( 5001 );
	
result

	SERVER1 -> 10:36:55.310 GET > 200 > / - Mobile Safari 8.0 > iPhone > iOS 8.1 > 10.58.100.201
	SERVER2 -> 10:45:30.287 GET > 304 > / - Chrome 38.0.2125 > Other > Mac OS X 10.10.0 > 127.0.0.1
	SERVER2 -> 10:45:30.319 GET > 304 > /favicon.ico - Chrome 38.0.2125 > Other > Mac OS X 10.10.0 > 127.0.0.1
	SERVER1 -> 10:45:42.220 GET > 304 > / - Mobile Safari 8.0 > iPhone > iOS 8.1 > 10.58.100.201
	SERVER2 -> 10:45:44.415 GET > 200 > / - Mobile Safari 8.0 > iPhone > iOS 8.1 > 10.58.100.201
	
## Modifications

### Date format

The :date token takes a pattern parameter and formats the date using [dateformat](https://www.npmjs.org/package/dateformat). 

##### Example:

	logger( '-> :date[HH:MM:ss.l] :method > :status ...' );

result

	-> 10:28:39.849 GET > 304 ...
	
### UA-parser

Devlogger also benefits of using [ua-parser](https://www.npmjs.org/package/ua-parser)

##### Tokens:

* :os
* :browser
* :device

##### Example:

	logger( '-> :os > :device > :browser' )
	
result

	-> Mobile Safari 8.0 > iPhone > iOS 8.1
	-> Chrome 38.0.2125 > Other > Mac OS X 10.10.0
