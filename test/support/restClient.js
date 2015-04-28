'use strict';

const request = require('superagent');


function RestClient (baseAddress) {
  this.baseAddress = baseAddress;
  this.username = 'john.doe@example.org';
  this.password = 'password';
  this.token = '';
}

RestClient.prototype.authenticate = function (username, password, done) {
  var self = this;

  if (typeof arguments[0] === 'function') {
    done = arguments[0];
  }

  this.post('/sessions', { username: this.username, password: this.password }, function (err, result) {
    if(err) {
      return done(err);
    }

    self.token = result.body.access_token;

    done(null, result);
  });
 };


RestClient.prototype.post = function (url, data, done) {

  request.post(this.baseAddress + url)
         .set('Content-Type', 'application/json')
         .set('Authorization', 'Bearer ' + this.token)
         .send(data)
         .end(done);
};

RestClient.prototype.put = function (url, data, done) {

  request.put(this.baseAddress + url)
         .set('Content-Type', 'application/json')
         .set('Authorization', 'Bearer ' + this.token)
         .send(data)
         .end(done);
};


RestClient.prototype.delete = function (url, done) {

  request.del(this.baseAddress + url)
         .set('Content-Type', 'application/json')
         .set('Authorization', 'Bearer ' + this.token)
         .end(done);
};

RestClient.prototype.get = function (url, done) {

  request.get(this.baseAddress + url)
         .set('Content-Type', 'application/json')
         .set('Authorization', 'Bearer ' + this.token)
         .end(done);
};



module.exports = function (baseAddress) {
  return new RestClient(baseAddress);
};
