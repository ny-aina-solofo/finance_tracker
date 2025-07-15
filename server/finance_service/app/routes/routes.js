const express = require('express');
const router = express.Router(); 

const budgetController = require('../controllers/budget_controller');
router.get('/get-budget',budgetController.getBudget);
// router.post('/add-budget',budgetController.addBudget);
// router.delete('/delete-budget/:id_budget',budgetController.deleteBudget);
// router.put('/update-budget',budgetController.updateBudget);


module.exports = router;