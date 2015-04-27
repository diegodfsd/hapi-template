'use strict';

const User = require('src/models/user').model;


function UsersQuery () {};

UsersQuery.prototype = (function () {

    return {
        findById: function (id, done) {

            User.findById(id, done);
        },
        find: function (params, done) {

            User.find({}).read('s').exec(done);
        }
    };
})();

module.exports = (new UsersQuery());
