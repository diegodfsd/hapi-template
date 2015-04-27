'use strict';

const Boom = require('boom'),
      Util = require('util');

let methods = [
    'badRequest',
    'unauthorized',
    'forbidden',
    'notFound',
    'methodNotAllowed',
    'notAcceptable',
    'conflict',
    'unsupportedMediaType',
    'badData',
    'badImplementation',
    'notImplemented',
    'badGateway',
    'serverTimeout',
    'gatewayTimeout'
];


exports.register = function (server) {

    server.decorate('reply', 'created', function (data) {

        let location = Util.format('%s%s/%s', this.url, this.request.path, data.id);

        return this(data).header('Location', location).code(201);
    });

    server.decorate('reply', 'ok', function (data) {

        return this(data).code(200);
    });

    server.decorate('reply', 'unique', function (err, data, message) {
        if (err) return this(Boom.badImplementation(err));

        if (data) this(data).type('application/json');
        else this(Boom.notFound(message ? message : undefined));
    });

    server.decorate('reply', 'paginate', function (err, data, message) {
        if (err) return this(Boom.badImplementation(err));

        let pagedItems = {
                items: data,
                pagination: { page: 1, totalCount: 10, totalPages: 2 },
                links: []
            };

        this(pagedItems).type('application/json');
    });

    let len = methods.length;

    while (len--) {
        let method = methods[len];
        server.decorate('reply', method, function () {

            console.log("error = " + arguments[0]);
            return this(Boom[method].apply(Boom, arguments));
        });
    }

};
