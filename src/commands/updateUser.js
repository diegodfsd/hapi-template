'use strict';

const Promise = require('bluebird'),
      User = Promise.promisifyAll(require('src/models/user').model),
      Lodash = require('lodash/object/omit');


exports.handle = function handle (attrs) {

    let model = Lodash(attrs, 'id');

    return User.findByIdAsync(attrs.id).then(function (user) {

        user.name = model.name;
        user.email = model.email;
        user.role = model.role;
        user.active = model.active;

        if (model.password) {
          user.password = model.password;
        }

        return user.saveAsync(); // use this way ensure that my virtual methods will be triggered
    });
};
