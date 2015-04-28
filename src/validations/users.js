'use strict';

const Joi = require('joi'),
      Roles = require('./../models/roles');

let schema = {
    userId: Joi.string().max(32),
    name: Joi.string().max(128).required(),
    email: Joi.string().email().required(),
    role: Joi.string().allow('user', 'admin').default('user'),
    password: Joi.string().min(8),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
    active: Joi.boolean().required()
}

function UserValidation() {}

UserValidation.prototype = {
    findById: {
        params: {
            id: schema.userId.required()
        },
        headers: Joi.object({'authorization': Joi.string().required()}).unknown()
    },
    find: {
        headers: Joi.object({'authorization': Joi.string().required()}).unknown()
    },
    create: {
        payload: {
            name: schema.name,
            email: schema.email,
            role: schema.role,
            password: schema.password.required(),
            password_confirmation: schema.password_confirmation,
            active: schema.active
        },
        headers: Joi.object({'authorization': Joi.string().required()}).unknown()
    },
    update: {
        params: {
            id: schema.userId.required()
        },
        payload: {
            name: schema.name,
            email: schema.email,
            role: schema.role.required(),
            password: schema.password.optional(),
            active: schema.active
        },
        headers: Joi.object({'authorization': Joi.string().required()}).unknown()
    },
    delete: {
        params: {
            id: schema.userId.required()
        },
        headers: Joi.object({'authorization': Joi.string().required()}).unknown()
    }
};


module.exports = new UserValidation();
