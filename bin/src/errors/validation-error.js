class ValidationError extends Error {

    constructor(errors){
        super(JSON.stringify(errors));
        this.name = 'Validation Error';
        this.errors = errors;
    }
}

module.exports = ValidationError;