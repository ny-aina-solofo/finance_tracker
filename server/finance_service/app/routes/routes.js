const express = require('express');
const router = express.Router(); 

const budgetController = require('../controllers/budget_controller');
router.get('/get-budget',budgetController.getBudget);
router.post('/add-budget',budgetController.addBudget);
router.delete('/delete-budget/:id_budget',budgetController.deleteBudget);
router.put('/update-budget/:id_budget',budgetController.updateBudget);

const transactionsController = require('../controllers/transactions_controller');
router.get('/get-transactions',transactionsController.getTransactions);
// router.post('/add-transactions',transactionsController.addtransactions);
// router.delete('/delete-transactions/:id_transactions',transactionsController.deletetransactions);
// router.put('/update-transactions/:id_transactions',transactionsController.updateBudget);



module.exports = router;