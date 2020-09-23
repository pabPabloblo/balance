const { Router } = require("express");

const TransactionController = require('../controller/transaction-controller');

//creates the controller that actually applies business logic
const transactionController = new TransactionController();

const router = Router();

//returns a single item by id
router.get('/transaction/:id', transactionController.getDetail);
//returns a single a complete list of transactions
router.get('/transaction', transactionController.getHistory);
//creates a new transaction
router.post('/transaction', transactionController.addTransaction.bind(transactionController));
//creates current balance
router.get('/', transactionController.getBalance);

module.exports = router;