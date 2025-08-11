const express = require('express');
const router = express.Router(); 

const authJwt = require('../middleware/authJwt');
const verifySignup = require('../middleware/verifySignup');
const userController = require('../controllers/user_controller');

router.post('/signup',verifySignup.checkDuplicate,userController.signUp);
router.post('/signin',userController.signIn);
router.get('/validate/:id_user', userController.validateUser);
// router.delete('/delete-board/:id_board',userController.deleteBoard);
// router.put('/update-board',userController.updateBoard);


module.exports = router;