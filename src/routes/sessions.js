'use strict';

const sessionValidate = require('src/validations/sessions'),
      sessionController = require('src/controllers/sessions');


module.exports = (function () {
    return [
            {
                method: 'POST',
                path: '/api/sessions',
                config: {
                    description: 'Create an user session',
                    tags: ['api'],
                    auth: false,
                    validate: sessionValidate.create,
                    handler: sessionController.create
                }
            }
        ];
})();
