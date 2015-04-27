'use strict';

const Path = require('path'),
      Fs = require('fs');


let commands = {};

Fs.readdirSync(__dirname).forEach(function (file) {

    if (file === 'index.js') return;

    let command = require(Path.join(__dirname, file));

    commands[Path.basename(file, '.js')] = command.handle;
});

module.exports = commands;
