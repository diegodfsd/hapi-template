'use strict';

const Boom = require('boom'),
      JWT  = require('jsonwebtoken'),
      UserQueries = require('src/queries').users,
      Config = require('./../../config');


function SessionsController() {};

SessionsController.prototype = {
    create: function create (request, reply) {

        let params = request.payload;

        UserQueries.findByEmail(params.username, function (err, user) {
            if (err) {
                return reply(Boom.badRequest(err.message));
            }

            if (!user || !user.verifyPassword(params.password)) {
              return reply(Boom.create(403, 'Invalid username and password.'));
            }

            let options = { expiresInMinutes: Config.get('/auth/tokenExpiration') },
                secretKey = Config.get('/auth/secretKey'),
                access_token = JWT.sign(user, secretKey, options),
                result = { name: user.name, access_token: access_token};

            reply(result).code(200);
        });
    }
};


module.exports = new SessionsController();
