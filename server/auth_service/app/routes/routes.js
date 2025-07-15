const express = require('express');
const router = express.Router(); 

const boardController = require('../controllers/board_controller');
router.get('/get-board',boardController.getBoard);
router.post('/add-board',boardController.addBoard);
router.delete('/delete-board/:id_board',boardController.deleteBoard);
router.put('/update-board',boardController.updateBoard);

const columnController = require('../controllers/column_controller');
router.post('/add-column',columnController.addColumn);
router.delete('/delete-column/:id_column',columnController.deleteColumn);
router.put('/update-column',columnController.updateColumn);

const taskController = require('../controllers/task_controller');
router.post('/add-task',taskController.addTask);
router.delete('/delete-task/:id_task',taskController.deleteTask);
router.put('/update-task',taskController.updateTask);
router.put('/update-status',taskController.updateStatus);

const subtaskController = require('../controllers/subtask_controller');
router.post('/add-subtask',subtaskController.addSubtask);
router.delete('/delete-subtask/:id_subtask',subtaskController.deleteSubtask);
router.put('/update-subtask',subtaskController.updateSubtask);
router.put('/update-done',subtaskController.updateDone);

module.exports = router;