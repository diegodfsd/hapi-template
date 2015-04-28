var Fs = require('fs'),
    Path = require('path'),
    Async = require('async'),
    Promptly = require('promptly'),
    Handlebars = require('handlebars'),
    Mongoose = require('mongoose'),
    User = require('./src/models/user').model;


Async.auto({
    projectName: function (done) {

        Promptly.prompt('Project name: (Hapi Template)', { default: 'Hapi Template' }, done);
    },
    mongodbUrl: ['projectName', function (done, results) {

            var options = {
                default: 'mongodb://localhost:27017/hapi-template'
            };

            Promptly.prompt('MongoDB URL: (mongodb://localhost:27017/hapi-template)', options, done);
    }],
    secretKey: ['mongodbUrl', function (done, results) {

            Promptly.prompt('Secret Key:', done);
    }],
    createConfig: ['secretKey', function (done, results) {

            var configTemplatePath = Path.resolve(__dirname, 'config.sample');
            var configPath = Path.resolve(__dirname, 'config.js');
            var options = { encoding: 'utf-8' };

            Fs.readFile(configTemplatePath, options, function (err, source) {

                if (err) {
                    console.error('Failed to read config template.');
                    return done(err);
                }

                var template = Handlebars.compile(source);
                Fs.writeFile(configPath, template(results), done);
            });
    }],
    setupUser: ['createConfig', function (done, results) {

        Async.waterfall([
            function connect (done) {

                var url = results.mongodbUrl;
                if( process.env.NODE_ENV === 'test') {
                    url += '-test';
                }

                Mongoose.connect(url);
                Mongoose.connection.on('connected', done);
            },
            function clean (done) {

                User.remove({}, done);
            },
            function create (arg, done) {

                var user = new User({
                      "name":"John Doe",
                      "email":"john.doe@example.org",
                      "password": "password",
                      "active": true,
                      "role": "admin"
                  });

                user.save(done);
            }
        ], function (err, result) {

            if (err) {
                console.error('Failed to setup root user.');
                return done(err);
            }

            done(null, true);
        });
    }]
}, function (err, results) {

    if (err) {
        console.error('Setup failed.');
        console.error(err);
        return process.exit(1);
    }

    console.log('Setup complete.');
    process.exit(0);
});
