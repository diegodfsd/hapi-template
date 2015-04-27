'use strict';

const Promise = require('bluebird'),
      Mongoose = Promise.promisifyAll(require("mongoose")),
      User = Promise.promisifyAll(require('src/models/user').model);


exports.handle = function handle (attrs) {

    return User.createAsync(attrs);
};
