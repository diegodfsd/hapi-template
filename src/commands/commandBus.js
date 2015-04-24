'use strict';

const Dispatcher = require('./commandDispatcher'),
      Lodash = require('lodash/object'),
      Path = require('path'),
      Fs = require('fs');



function CommandBus () {
    this.handlers = {};

    this.loadHandlers = function() {

        Fs.readdirSync(__dirname).forEach(function (file) {

          if (!~file.indexOf('handler')) return;

          let commandName = Path.basename(file, '.js');
          this.registerHandler(commandName, require(path.join(__dirname, commandName)));
        });
    }

    this.loadHandlers();
};

CommandBus.getInstance = function(forceInitialize) {

    if (!this.instance) {
      this.instance = new CommandBus();
    }

    return forceInitialize? new CommandBus() : this.instance;
}

CommandBus.prototype.registerHandler = function(commandName, handler) {

    if (typeof handler !== 'function') {
        console.log('Handler has to be function!');
        throw new Error('Handler has to be function!');
    }

    this.handlers[commandName] = new Dispatcher(handler);
};

CommandBus.prototype.dispatch = function(commandName, attrs, done) {

    let handler = this.handlers[commandName];

    if (!handler) {
        console.log('Handler for this command was doesn\'t exist!');
        throw new Error('Handler for this command was doesn\'t exist!');
    }

    return handler.handle(command, done);
};


module.exports = function (options) {
    options = Lodash.merge({initialize: false}, options);

    return CommandBus.getInstance(options.initialize);
}
