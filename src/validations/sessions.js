'use strict';

const Joi = require('joi');


function SessionValidation() {}

SessionValidation.prototype = {
    create: {
        payload: {
            username: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }
};


module.exports = new SessionValidation();
