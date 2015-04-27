'use strict';

const Path = require('path'),
      Fs = require('fs'),
      Lodash = require('lodash/object');


Fs.readdirSync(__dirname).forEach(function (file) {

    if (file === 'index.js') return;

    let queries = {};

    queries[Path.basename(file, '.js')] = require(Path.join(__dirname, file));

    Lodash.merge(module.exports, queries);
});
