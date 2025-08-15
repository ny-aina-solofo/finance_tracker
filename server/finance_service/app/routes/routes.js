const express = require('express');
const router = express.Router(); 
const verifyToken = require('../middleware/verifyToken');

const budgetController = require('../controllers/budget_controller');
router.get('/get-budget',verifyToken,budgetController.getBudget);
router.post('/add-budget',verifyToken,budgetController.addBudget);
router.delete('/delete-budget/:id_budget',verifyToken,budgetController.deleteBudget);
router.put('/update-budget/:id_budget',verifyToken,budgetController.updateBudget);

const transactionsController = require('../controllers/transactions_controller');
router.get('/get-transaction',verifyToken,transactionsController.getTransaction);
router.post('/add-transaction',verifyToken,transactionsController.addTransaction);
router.delete('/delete-transaction/:id_transaction',verifyToken,transactionsController.deleteTransaction);
router.put('/update-transaction/:id_transaction',verifyToken,transactionsController.updateTransaction);



module.exports = router;