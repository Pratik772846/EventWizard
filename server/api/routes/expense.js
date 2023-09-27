const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/expense.js');
const checkAuth = require("../middleware/check-auth");

router.post('/:eventId', ExpenseController.addTransaction);
router.delete('/:eventId',ExpenseController.deleteTransaction);
router.put('/:eventId', ExpenseController.updateTransaction);
router.get('/:eventId', ExpenseController.getTransactions);

module.exports = router;