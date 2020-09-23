


const db = require('./fake-db');
var events = require('events');

/**
 * @class TransactionDAO
 * @description Class that handles all logic related to Transactions 
 *  data persistance and retrieval
 */
class TransactionDAO {

    /**@description Class constructor */
    constructor() {
        this.isProcessing = false;
        this.lockListener = new events.EventEmitter();
        this.monitor = [];
    }

    /** 
     * @description method that starts blocking operations to DB 
     *  for concurrency handling
     * @param {Function} callback Is th function called after the 
     *  function gets out of the queue
     */
    startBlocking(callback) {
        if (this.isProcessing) {
            //if another add is procesing the callback is queded until the processing is done
            this.monitor.push(callback);
        }
        else {
            //else the callback gets called directly
            callback();
        }
    }

    /** 
     * @description method that completes an atomic concurrent operation
     *  and returns control to next oepration if any
     * **/
    endBlocking() {
        if (this.monitor.length !== 0) {
            const callback = this.monitor.shift();
            callback();
        }
        this.lockListener.emit('release');
    }

    /** 
     * @description Waits if DB locked but does not create adtioninal locks
     * @param {Function} callback Is th function called after the 
     *  function gets out of the queue
     * **/
    nonBlocking(callback) {
        return new Promise((resolve) => {
            if (!this.isProcessing)
                resolve(callback());
            else
                this.lockListener.on('release', () => resolve(callback()));
        }
        );
    }

    /** 
     * @description Waits if blocked and returns full transaction history
     * @returns {Promise<Array<Object>>} A promise that will get an array with
     *   all the transactions
     * **/
    getHistory() {
        return this.nonBlocking(() => db.transactions);
    }

    /** 
    * @description Waits if blocked and returns a single transaction
    * @param {Number} id the id of the transaction requested
    * @returns {Promise<Object>} A promise that will get a single transaction with the provided Id
    * **/
    getDetail(id) {
        return this.nonBlocking(() => db.transactions.find(t => t.id == id));
    }

    /** 
     * @description Waits if blocked and returns account balance
     * @returns {Promise<Number>} A promise that will return the current balance
     * **/
    getBalance() {
        return this.nonBlocking(() => db.balance);
    }

    /** 
     * @description Updates balance value based on current operation
     * @param {Object} transaction the transaction that will be used to update
     *  the balance
     * **/
    updateBalance(transaction) {
        if (transaction.type == 'debit') {
            db.balance = db.balance - transaction.amount;
        } else {
            db.balance = db.balance + transaction.amount;
        }
    }

    /** 
     * @description Adds a new transction and updates balance
     * @param {Object} transaction the transaction to add 
     * @returns {Promise<Object>}  A promise that will get 
     *  the final transaction is returned
     * **/
    addTransaction(transaction) {
        return new Promise((resolve) => {
            //with start the blocking transaction
            this.startBlocking(() => {
                //blocks for reading
                this.isProcessing = true;
                //used lenth as id because transactions won't be deleted
                transaction.id = db.transactions.length;
                transaction.effectiveDate = new Date(Date.now()).toUTCString();
                db.transactions.push(transaction);
                //since operations are blocking updaing the balance won't create consitency issues and will gain efficiency
                this.updateBalance(transaction);
                //unblocks for reading
                this.isProcessing = false;
                //controll is passsed on to next processing request
                this.endBlocking();
                resolve(transaction);
            });
        });

    }
}

module.exports = TransactionDAO;