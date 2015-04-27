'use strict';

const Boom = require('boom'),
      Commands = require('src/commands'),
      UserQueries = require('src/queries').users;


function UsersController() {};

UsersController.prototype = (function () {

  return {
            findById: function findById (request, reply) {

                let params = request.params;

                UserQueries.findById(params.id, function (err, data) {
                    reply.unique(err, data, 'User cannot be found.');
                });
            },
            find: function find (request, reply) {

                UserQueries.find(request.query, function (err, data) {
                    reply.paginate(err, data);
                });
            },
            create: function create (request, reply) {

                Commands.createUser(request.payload).then(function (data) {

                    reply.created(data);
                }).catch(function (err) {
                    reply.badRequest(err);
                });
            },
            update: function update (request, reply) {

                return reply.ok({});
            },
            delete: function (request, reply) {

                return reply.ok({});
            }
        };
})();


module.exports = (new UsersController());
