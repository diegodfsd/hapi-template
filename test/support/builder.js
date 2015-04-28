'use strict';

var Util = require('util'),
    Lodash = require('lodash');


function Database() {
  this.models = {};
};


Database.prototype.create = function (modelName, done) {
  var items = [],
      schema,
      attrs = require('./../fixtures/' + modelName);

  if (!this.models[modelName]) {
    this.models[modelName] = require('./../../src/models/' + modelName);
  }

  schema = this.models[modelName];

  if (!schema) {
    throw new Error( Util.format("Model %s cannot be found.", modelName) );
  }

  schema.model.create(attrs, function (err, data) {
    if(err) {
      console.log(err);
    }
    done(null, data);
  });
};


Database.prototype.find = function (modelName, query, done) {
  if (!this.models[modelName]) {
    this.models[modelName] = require('./../../src/models/' + modelName);
  }

  schema = this.models[modelName];

  if (!schema) {
    throw new Error( Util.format("Model %s cannot be found.", modelName) );
  }

  schema.model.find(query).exec(done);
};


module.exports = new Database;
