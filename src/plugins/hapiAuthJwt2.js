'use strict';

const Config = require('./../../config'),
      User = require('src/models/user').model;


exports.register = function (server) {


    server.register(require('hapi-auth-jwt2'), function (err) {
            if (err) {
                console.log('hapi-auth-jwt2 load error: ' + err);
            }

            server.auth.strategy('jwtAuth', 'jwt', true, {
                  key: Config.get('/auth/secretKey'),
                  validateFunc: function (decoded, request, callback) {

                    User.findById(decoded.id, function (err, user) {
                      if(err) {
                        return callback(err, false);
                      }

                      return callback(null, true);
                    });

                  }
                });
        });
}
