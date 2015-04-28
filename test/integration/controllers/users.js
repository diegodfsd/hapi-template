'use strict';

var expect = require('expect.js'),
    async = require('async'),
    config = require('./../../../config'),
    restClient = require('./../../support/restClient')('http://localhost:3000/api'),
    builder = require('./../../support/builder'),
    utils = require('./../../support/utils'),
    util = require('util'),
    response;


describe('#/users', function() {

    beforeEach(function(done) {

        builder.create('user', function() {
            done();
        })
    });

    describe("when trying create an user", function() {
        describe('with valid data', function() {
            var index = (Math.random() * (100 - 1)).toFixed(0);
            var user = {
                "name": util.format("User %s Test", index),
                "email": util.format("user.%s@example.org", index),
                "password": "senha1234",
                "password_confirmation": "senha1234",
                "role": "user",
                "active": true
            };

            before(function(done) {
                restClient.post('/users', user, function(err, res) {
                    response = res;
                    done();
                })
            });

            it('should respond with 201 (created)', function() {
                expect(response.statusCode).to.be(201);
            })

            it('should respond with location', function() {
                expect(response.headers.location).to.be.match(/api\/users\/[\w]+/);
            })

            it('should respond with the created user', function() {
                expect(response.body._id).to.not.be(undefined);
                expect(response.body.name).to.be(user.name);
                expect(response.body.email).to.be(user.email);
                expect(response.body.role).to.be(user.role);
                expect(response.body.active).to.be(true);
            })
        });

        describe('with invalid data', function() {

            var fields = ["name", "email", "password", "password_confirmation"];

            fields.forEach(function(field) {

                it('without ' + field, function(done) {
                    var user = {
                        "name": "name",
                        "email": "email@domain.com",
                        "password": "password",
                        "password_confirmation": "password",
                        "role": "admin"
                    };

                    delete user[field];

                    restClient.post('/users', user, function(err, res) {
                        expect(res.body.error).to.be('Bad Request');
                        expect(res.body.validation.keys[0] === field).to.be(true);
                        done();
                    });
                })
            });
        });

    }); // create an user

    describe("when trying update an user", function() {
        before(function(done) {
            restClient.authenticate(function(err, res) {
                done();
            });
        })

        describe('with valid data', function() {
            var user = {
                "name": "User Two Updated",
                "email": "user.two@ginga.org",
                "password": "senha1234",
                "role": "admin",
                "active": false
            };

            beforeEach(function(done) {
                restClient.put('/users/553816e5e06f45a7222b16c5', user, function(err, res) {
                    response = res;
                    done()
                })
            });

            it('should respond with 204 (no content)', function() {
                expect(response.statusCode).to.be(204);
            })

        });

        describe('with invalid data', function() {

            var fields = ["name", "email", "role", "active"];

            fields.forEach(function(field) {

                it('without ' + field, function(done) {
                    var user = {
                        "name": "name",
                        "email": "email@domain.com",
                        "password": "password",
                        "role": "admin",
                        "active": true
                    };

                    delete user[field];

                    restClient.put('/users/553816e5e06f45a7222b16c5', user, function(err, res) {
                        expect(res.body.error).to.be('Bad Request');
                        expect(res.body.validation.keys[0] === field).to.be(true);
                        done();
                    });
                })
            });
        });

    }); // update an user


    describe('with an authenticated user', function() {
        before(function(done) {
            restClient.authenticate(function(err, res) {
                done();
            });
        })

        describe('when trying to list users', function() {

            it('should return all users', function(done) {

                restClient.get('/users', function(err, res) {
                    expect(res.statusCode).to.be(200);
                    expect(res.body.items).to.an('array');
                    expect(res.body.items.length).to.greaterThan(0);
                    done();
                })
            })
        });

    });
});
