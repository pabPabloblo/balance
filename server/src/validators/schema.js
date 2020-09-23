const Validator = require('./validator');

/**
 * @description function to apply core validation of schema
 * @param {any} [value] value to validate
 * @param {Object} [options] objects with options to configure validator function
 * @param {Array} [options.required] the names of the fields to be mandatory
 * @param {Object} [options.schema] an object where the value of each field is the type or finite values to validate
 * @returns {Array} An array with the found validation errors
 */
const validator = (valueToValidate, options) => {
    let errors = [];

    //required fields validator
    if (!!options.required) {
        const fieldNames = Object.keys(valueToValidate);
        //checks if the required field has a value
        options.required.forEach(
            rf => {
                if (!fieldNames.includes(rf)) {
                    errors.push({ 'text': `Missing required field "${rf}".` });
                }
            }
        );
    }

    //type validator
    if (!!options.schema) {
        Object.entries(options.schema).forEach(field => {
            if (valueToValidate[field[0]] === undefined) {
                return;
            }
            //if the field has an array the the finite values are checked
            if (Array.isArray(field[1])) {
                if (field[1].length > 0 && !field[1].includes(valueToValidate[field[0]]))
                    errors.push({ 'text': `Field "${field[0]}" is restricted to the values: "${field[1].join(',')}".` });

            } else {
                //checks if the expected field has a value and that value is of the correct type 
                if (typeof valueToValidate[field[0]] !== field[1])
                    errors.push({ 'text': `Field "${field[0]}" should be of type "${field[1]}".` });
            }

        });
    }
    return errors;
}

/**
 * @class SchemaValidate
 * @extends Validator
 * @description validates schema using validate method
 */
class SchemaValidate extends Validator {

    /***
     * @description constructor of class
     * @param validator {Function} [validator] function that takes 
     * @param {Object} [options] objects with options to configure validator function
     * @param {Array} [options.required] the names of the fields to be mandatory
     * @param {Object} [options.schema] an object where the value of each field is the type or finite values to validate
     *  option and value to validate
     */
    constructor(options) {
        super(validator, options);
    }
}

module.exports = SchemaValidate;
