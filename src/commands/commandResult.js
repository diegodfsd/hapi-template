'use strict';

const Lodash = require('lodash/array');


let commandResult = (function() {
    function CommandResult(errors) {

        let _errors = Lodash.compact(errors);

        this.successfully = (_errors.length == 0);

        this.hasError = function() {
            return !this.successfully;
        };

        this.getErrors = function() {
            return _errors;
        };
    }

    return {
        withSuccess: function() {
          return new CommandResult([]);
        },

        withErrors: function(errors) {
          return new CommandResult(errors);
        }
    };
}());


module.exports = commandResult;
