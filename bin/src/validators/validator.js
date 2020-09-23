
/**
 * @class Validator
 * @description minimalist generic class to apply validation on controller
 */
class Validator {

    /***
     * @param validator {Function} [validator] function that takes 
     * @param {Object} [options] objects with options to configure validator function
     *  option and value to validate
     */
    constructor(validator, options) {
        this.validator = validator;
        this.options = options;
    }

    /**
     * @description function that validates based on validator passed on constructor
     * @param {any} [value] value to validate
     * @returns {Array} An array with the found validation errors
     */
    validate(value) {
        return this.validator(value, this.options);
    }

}

module.exports = Validator;