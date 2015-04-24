"use strict";

const Mongoose = require('mongoose'),
      Crypto = require('crypto'),
      Roles = require('./roles');


let User = new Mongoose.Schema({
  name            : { type: String, required: true, trim: true },
  email           : { type: String, required: true, trim: true, index: { unique: true } },
  hashed_password : { type: String, required: true, trim: true },
  salt            : { type: String, required: true, trim: true },
  role            : { type: String, required: true, enum: [Roles.Admin, Roles.User], default: Roles.User},
  active          : { type: Boolean, default: true },
  createdAt       : { type: Date, default: Date },
  updatedAt       : { type: Date, default: Date.now }
});


User
  .virtual('password')
  .set(function(password) {

    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password; });


User.methods = {

    makeSalt: function() {
      try {

        return Crypto.randomBytes(128).toString('base64');
      } catch (ex) {
        throw ex;
      }
    },

    encryptPassword: function(password) {
      if (!password) return '';

      let iterations = 1000;

      try {

         return Crypto.pbkdf2Sync(password, this.salt, iterations, 128).toString('hex');
      } catch (ex) {
        throw ex;
      }
    },

    verifyPassword: function (password) {
      return this.encryptPassword(password) === this.hashed_password;
    }
};



module.exports = {
  schema: User,
  model: Mongoose.model('User', User)
};
