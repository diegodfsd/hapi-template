'use strict';

const Mongoose = require('mongoose'),
      Config = require('./../../config');


let settings = Config.get('/mongodb'),
    db = Mongoose.connection;

if (1 !== db.readyState) Mongoose.connect(settings.url, settings.options);

Mongoose.set('debug', true);

Mongoose.connection.on('connected', function () {
    console.log('Mongoose is connected to %s', settings.url);
});

Mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection: %s', err);
});

Mongoose.connection.on('disconnected', function () {
    console.log('Mongoose was disconnected');
});

process.on('SIGINT', function () {
    Mongoose.connection.close(function () {
        console.log('Mongoose was disconnected through app termination');
        process.exit(0);
    });
});


module.exports = Mongoose;
