'use strict';

const userValidate = require('src/validations/users'),
      userController = require('src/controllers/users');


module.exports = (function () {
    return [
            {
                method: 'GET',
                path: '/api/users/{id}',
                config: {
                    description: 'Get user details',
                    tags: ['api'],
                    validate: userValidate.findById,
                    handler: userController.findById
                }
            },
            {
                method: 'GET',
                path: '/api/users',
                config: {
                    description: 'List all users',
                    tags: ['api'],
                    handler: userController.find
                }
            },
            {
                method: 'POST',
                path: '/api/users',
                config: {
                    description: 'Creates an user',
                    tags: ['api'],
                    validate: userValidate.create,
                    handler: userController.create
                }
            },
            {
                method: 'PUT',
                path: '/api/users/{id}',
                config: {
                    description: 'Updates an user',
                    tags: ['api'],
                    validate: userValidate.update,
                    handler: userController.update
                }
            },
            {
                method: 'DELETE',
                path: '/api/users/{id}',
                config: {
                    description: 'Delete an user',
                    tags: ['api'],
                    validate: userValidate.delete,
                    handler: userController.delete
                }
            }
        ];
})();
