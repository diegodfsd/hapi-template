'use strict';

const Roles = require('src/models/roles');


exports.register = function (server) {

    server.ext('onPostAuth', function (request, reply) {

        let patternMethod = /(delete|put)/i;

        if ( !patternMethod.test(request.method) ) {
            return reply.continue();
        }

        let roleFound = (request.auth.credentials.role === Roles.Admin);

        if (!roleFound) {
            var response = {
              error: 'Unauthorized access',
              message: 'You don\'t have permission to do this operation',
              statusCode: 403
            };

            // Force the response return immediately
            return reply(response).takeover().code(403);
        }

        return reply.continue();
    });

};
