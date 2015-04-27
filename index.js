'use strict';

process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

const Hapi = require('hapi'),
      Db = require('src/lib/database'),
      Config = require('./config'),
      Routes = require('src/routes'),
      Extensions = require('src/extensions'),
      Plugins = require('src/plugins');


let options = Config.get('/server');
let port = Config.get('/port/web');

let server = new Hapi.Server();
server.connection(options);


// Register all extensions/filters
Extensions.registerAll(server);


// Register all plugins
Plugins.registerAll(server);


// Add all the routes within the routes folder
for (var route in Routes) {
	server.route(Routes[route]);
}


server.start(function () {

    console.log('Server listening on: %s', server.info.uri);
});
