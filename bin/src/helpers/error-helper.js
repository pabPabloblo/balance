/**
 * @description mehtod that uses response object send proper response
 * @param {Response} res response object used to send error message
 * @param {Response} errorCode Http status code of error
 * @param {Array<string>} errors optional array of errors
 */
const sendError = (res, errorCode, errors = null, error = null) => {
    res.status(errorCode).send({ errors });
    if (errorCode >= 500 && !!error) {
        console.error(error.message);
        console.error(error.stack);
        console.error(error.name);
        console.error(typeof error);
    }
}

module.exports = {sendError};
