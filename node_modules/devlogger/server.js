/*jshint node:true*/
"use strict";

var express = require( 'express' );
var app1 = express();
var app2 = express();
var logger = require( './main' );
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
