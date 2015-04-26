'use strict';

const Path = require('path'),
      Fs = require('fs'),
      Promise = require('bluebird');


let queries = {};

Fs.readdirSync(__dirname).forEach(function (file) {

    if (file === 'index.js') return;

    let query = require(Path.join(__dirname, file));

    queries[Path.basename(file, '.js')] = Promise.promisify(query.handle);
});

module.exports = queries;
