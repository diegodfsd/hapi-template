'use strict';

const User = require('src/models/user').model;


function UsersQuery () {};

UsersQuery.prototype = {
    findById: function (id, done) {

        User.findById(id, '-salt -hashed_password').exec(done);
    },
    find: function (params, done) {

        User.find({}).select('-salt -hashed_password').read('s').exec(done);
    },
    findByEmail: function (email, done) {

        User.findOne({ email: email }).exec(done);
    }
};


module.exports = new UsersQuery();
