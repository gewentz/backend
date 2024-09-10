const Client = require('../models/Client');

exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json({ message: 'Client created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating client', error: err.message });
  }
};

exports.getAllClients = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 8;
  try {
    const totalClients = await Client.countDocuments();
    const totalPages = Math.ceil(totalClients / limit);
    const clients = await Client.find()
      .limit(limit)
      .skip((page - 1) * limit);

    res.json({ clients, totalClients, totalPages });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clients', error: err.message });
  }
};

exports.getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching client', error: err.message });
  }
};

exports.getClientByName = async (req, res) => {
  const { name } = req.params;
  try {
    const clients = await Client.find({ nome: new RegExp(name, 'i') });
    if (!clients || clients.length === 0) {
      return res.status(404).json({ message: 'No clients found with this name' });
    }
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clients by name', error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByIdAndUpdate(id, req.body, { new: true });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client updated successfully', client });
  } catch (err) {
    res.status(500).json({ message: 'Error updating client', error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting client', error: err.message });
  }
};
