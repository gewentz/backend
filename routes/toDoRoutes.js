const express = require('express');
const {
  createToDo,
  getAllToDos,
  getToDoById,
  getToDosByClient,
  updateToDo,
  deleteToDo
} = require('../controllers/toDoController.js');

const auth = require('../middlewares/auth.js');
const router = express.Router();

router.post('/', auth, createToDo);
router.get('/', auth, getAllToDos);
router.get('/:id', auth, getToDoById);
router.get('/client/:clientId', auth, getToDosByClient);
router.put('/:id', auth, updateToDo);
router.delete('/:id', auth, deleteToDo);

module.exports = router;
