'use strict';


exports.register = function (server) {

    let swaggerOptions = {
        apiVersion: '1'
    };

    server.register({
            register: require('hapi-swagger'),
            options: swaggerOptions
        }, function (err) {
            if (err) {
                console.log('hapi-swagger load error: ' + err);
            }
        });
}
