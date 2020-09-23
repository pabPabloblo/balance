
const TransactionService = require('../services/transaction-service');
const {ValidationError, InvalidValueError} = require('../errors');
const {sendError} = require('../helpers/error-helper');

const transactionService = new TransactionService();

/**
 * @class TransactionController
 * @description class to route facilitate transactions business logic into services
 */
class TransactionController {
    /**
     * @description Handles requests to get full transactions list
     * @param {Request} req the request object
     * @returns {Promise<Array>} A promise that resolves to
     *  an aray with all available transactions on the response
     */
    getHistory(req, res) {
        transactionService.getHistory().then((data) =>
            res.send({ 'transactions': data })).catch(err => sendError(res, 500, [err.message], err));
    }

    /**
    * @description Handles requests to get a single transaction
    * @param {Request} req the request object
    * @param {Number} req.params.id the id of the transaction requested
    * @param {Response} res the response object
    * @returns {Promise<Object>} A promise that resolves to a
    *    single transaction with the provided Id on the response
    */
    getDetail(req, res) {

        const id = req.params.id;

        if(typeof id === 'string') {
            if(isNaN(parseInt(id))) {
                sendError(res, 422, ["Invalid id"]);
                return;
            }
        }
        else if(typeof id !== 'number'){
            sendError(res, 422, ["Invalid id"]);
            return;
        } 

        transactionService.getDetail(id).then((data) => {
            if (!!data) {
                res.send(data)
            } else {
                sendError(res, 404, ["Not Found"]);
            }
        }).catch(err => sendError(res, 500, [err.message], err));
    }

    /**
    * @description Handles most of the logic to add a transction
    * @param {Response} res the response object
    * @param {Object} transaction the transaction to add 
    * @param {Number} balance the current account's balance
    * @returns {Promise<Object>} A promise that resolves to 
    *   the final transaction with final date and Id on the response
    */
    processTransaction(res, transaction, balance) {
        try {
            transactionService.processTransaction(transaction, balance).then((data) =>
                res.send(data)).catch(err => sendError(res, 500, [err.message], err));
        } catch (error) {
            if (error instanceof InvalidValueError) {
                sendError(res, 400, error.errors);
            }
            else if (error instanceof ValidationError) {
                sendError(res, 409, error.errors);
            }
        }
    }

    /**
     * @description Handles most of the logic to add a transction 
     * @param {Request} req the request object
     * @param {Object} req.body transaction to add 
     * @param {Response} res the response object
     * @returns {Promise<Object>} A promise that resolves to 
     *   the final transaction with final date and Id on the response
     */
    addTransaction(req, res) {
        const transaction = req.body;
        transactionService.getBalance().then(balance => {
            this.processTransaction(res, transaction, balance)
        }
        ).catch(err => sendError(res, 500, [err.message], err));
    }

    /**
    * @description Handles requests to get the current balance of the account
    * @param {Request} req the request object
    * @param {Response} res the response object
    * @returns {Promise<Number>} A promise that resolves to 
    *   The account's curent value on the response
    */
    getBalance(req, res) {
        transactionService.getBalance().then(((data) =>
            res.send({ 'balance': data }))).catch(err => sendError(res, 500, [err.message], err));
    }
}

module.exports = TransactionController;


