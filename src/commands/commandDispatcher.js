'use strict';

const CommandResult = require('./commandResult');


function Dispatcher(handler) {
    this.handler = handler;
};

Dispatcher.prototype.handle = function(command, done) {
    return (new this.handler()).handle( command, done );
};


module.exports = Dispatcher;
