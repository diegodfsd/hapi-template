'use strict';

const Joi = require('joi'),
      Roles = require('./../models/roles');

let schema = {
    userId: Joi.string().max(32),
    name: Joi.string().max(128).required(),
    email: Joi.string().email().required(),
    role: Joi.string().allow('user', 'admin').default('user'),
    password: Joi.string().min(8),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
}

function UserValidation() {}

UserValidation.prototype = (function () {

    return {
            findById: {
                params: {
                    id: schema.userId.required()
                }
            },
            create: {
                payload: {
                    name: schema.name,
                    email: schema.email,
                    role: schema.role,
                    password: schema.password.required(),
                    password_confirmation: schema.password_confirmation
                }
            },
            update: {
                params: {
                    id: schema.userId.required()
                },
                payload: {
                    name: schema.name,
                    email: schema.email,
                    role: schema.role,
                    password: schema.password.optional(),
                    password_confirmation: schema.password_confirmation
                }
            },
            delete: {
                params: {
                    id: schema.userId.required()
                }
            }
        };
})();


module.exports = (new UserValidation());
