const express = require('express');
const {
  createClient,
  getAllClients,
  getClientById,
  getClientByName,
  updateClient,
  deleteClient
} = require('../controllers/clientController.js');

const auth = require('../middlewares/auth.js');
const router = express.Router();

router.post('/', auth, createClient);
router.get('/', auth, getAllClients);
router.get('/:id', auth, getClientById);
router.get('/name/:name', auth, getClientByName);
router.put('/:id', auth, updateClient);
router.delete('/:id', auth, deleteClient);

module.exports = router;
