'use strict';

const Boom = require('boom'),
      Commands = require('src/commands'),
      UserQueries = require('src/queries').users,
      Lodash = require('lodash/object');


function UsersController() {};

UsersController.prototype = {
    findById: function findById (request, reply) {

        let params = request.params;
        console.log(params);
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
        let params = Lodash.merge(request.params, request.payload);

        Commands.updateUser(params).then(function (data) {

            reply.noContent();
        }).catch(function (err) {
            reply.badRequest(err);
        });
    },
    delete: function (request, reply) {

        Commands.deleteUser(request.params.id).then(function (data) {

            reply.noContent();
        }).catch(function (err) {
            reply.badRequest(err);
        });
    }
};


module.exports = new UsersController();
