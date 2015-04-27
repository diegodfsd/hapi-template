'use strict';

const Path = require('path'),
      Fs = require('fs');


module.exports.registerAll = function (server) {

    Fs.readdirSync(__dirname).forEach(function (file) {

        if (file === 'index.js') return;

        let component = require(Path.join(__dirname, file));

        component.register(server);
    });
};
