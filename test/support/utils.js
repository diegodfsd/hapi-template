'use strict';

const Mongoose = require('mongoose'),
      config = require('./../../config'),
      filters = {};


  filters["users"] = { email: { $ne: 'john.doe@example.org' } };


  /*
  * Connect on MongoDB
  */
  before(function (done) {
      var settings = config.get('/mongodb');
      Mongoose.connect(settings.url, settings.options);

      done();
  });


  /*
  * Reset mongoose to prevent trhow exception
  * of type OverwriteModelError for more details
  * visit: https://github.com/Automattic/mongoose/issues/1251
  */
  after(function(done){
      Mongoose.models = {};
      Mongoose.modelSchemas = {};
      Mongoose.connection.close();
      done();
  });

  /*
  * Remove test data of the collections
  */
afterEach(function (done) {
    for (var i in Mongoose.connection.collections) {
        var collection = Mongoose.connection.collections[i];
        var filter = filters[collection.name];

        if(filter) {
            collection.remove(filter);
        } else {
            collection.remove();
        }
    }

    done();
});
