const Validator = require('./validator');

/**
 * @description function to apply max value and min value validation
 * @param {any} [value] value to validate
 * @param {Object} [options] objects with options to configure validator function
 * @param {String} [options.fieldName] the name of the field to validate
 * @param {Number} [options.maxValue] the maximum value the field can have
 * @param {Number} [options.minValue] the maximum value the field can have
 * @returns {Array} An array with the found validation errors
 */
const validator = (valueToValidate, options) => {
    let errors = [];
    if (valueToValidate[options.fieldName] > options.maxValue) {
        return [{ text: `"${options.fieldName}" can't be bigger than ${options.maxValue}.` }];
    }
    if (valueToValidate[options.fieldName] <= options.minValue) {
        return [{ text: `"${options.fieldName}" must be bigger than ${options.minValue}.` }];
    }
    return errors;
}

/**
* @class MaxValueValidator
* @extends Validator
* @description validates a numeric value to amke sure it deos not exceed a value
*/
class MaxValueValidator extends Validator {
    /***
     * @description constructor of class
     * @param validator {Function} [validator] function that takes 
     * @param {Object} [options] objects with options to configure validator function
     * @param {String} [options.fieldName] the name of the field to validate
     * @param {Number} [options.maxValue] the maximum value the field can have
     * @param {Number} [options.minValue] the maximum value the field can have
     */
    constructor(options) {
        super(validator, options);
    }
}

module.exports = MaxValueValidator;
