const ValidationError = require('./validation-error');

class InvalidValueError extends ValidationError {

    constructor(errors){
        super(errors);
        this.name = 'Invalid Value Error';
    }
}

module.exports = InvalidValueError;