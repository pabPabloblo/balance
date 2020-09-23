
const TransactionDAO = require('../data/transaction-dao');
const {ValidationError, InvalidValueError} = require('../errors');

const { SchemaValidator, MaxValueValidator } = require('../Validators');
const { transactionTypes } = require('../constants');

const transactionDao = new TransactionDAO();

/**
 * @description class that applies actual business
 *  logic to work with transactions
 */
class TransactionService {

    constructor() {
        //initializing validators
        this.validators = [
            new SchemaValidator({
                required: ['type', 'amount'],
                schema: { type: [transactionTypes.debit, transactionTypes.credit], amount: "number" }
            }),
            new MaxValueValidator({
                fieldName: 'amount',
                maxValue: 100000,
                minValue: 0
            })
        ];
    }

    /**
     * @description Handles requests to get full transactions list
     * @returns {Promise<Array>} A promise that resolves to
     *  an aray with all available transactions on the response
     */
    getHistory() {
        return transactionDao.getHistory();
    }

    /**
    * @description Handles requests to get a single transaction
    * @param {Number} id the id of the transaction requested
    * @returns {Promise<Object>} A promise that resolves to a
    *    single transaction with the provided Id on the response
    */
    getDetail(id) {
        return transactionDao.getDetail(id);
    }

    /**
    * @description Handles most of the logic to add a transction
    * @param {Object} transaction the transaction to add 
    * @param {Number} balance the current account's balance
    * @returns {Promise<Object>} A promise that resolves to 
    *   the final transaction with final date and Id on the response
    */
    processTransaction(transaction, balance) {
        const errors = this.validators.reduce((final, valid) => [...final, ...valid.validate(transaction)], []);
        if (errors.length > 0) {
            throw new ValidationError(errors);
        }
        //validate if balance execeds a coherent number
        if ((Number.MAX_SAFE_INTEGER < (balance + transaction.amount) && transaction.type === transactionTypes.credit) ||
            Number.MIN_SAFE_INTEGER > (balance - transaction.amount) && transaction.type === transactionTypes.debit) {
            throw new InvalidValueError(['Account\'s balance exceeds max value']);
        }
        //validate if balance will became a negative number
        else if (balance < transaction.amount && transaction.type === transactionTypes.debit) {
            //balance will became lower than 0 if completed
            throw new InvalidValueError(['Balance is insufficient can not withdraw.']);

        }
        transaction.effectiveDate = Date.now().toLocaleString();
        return transactionDao.addTransaction.bind(transactionDao)(transaction);
    }

    /**
    * @description Handles requests to get the current balance of the account
    * @returns {Promise<Number>} A promise that resolves to 
    *   The account's curent value on the response
    */
    getBalance() {
        return transactionDao.getBalance();
    }

}

module.exports = TransactionService;