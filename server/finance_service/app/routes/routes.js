const express = require('express');
const router = express.Router(); 

const budgetController = require('../controllers/budget_controller');
router.get('/get-budget',budgetController.getBudget);
router.post('/add-budget',budgetController.addBudget);
router.delete('/delete-budget/:id_budget',budgetController.deleteBudget);
router.put('/update-budget/:id_budget',budgetController.updateBudget);

const transactionsController = require('../controllers/transactions_controller');
router.get('/get-transaction',transactionsController.getTransaction);
router.post('/add-transaction',transactionsController.addTransaction);
// router.delete('/delete-transaction/:id_transaction',transactionsController.deleteTransaction);
router.put('/update-transaction/:id_transaction',transactionsController.updateTransaction);



module.exports = router;