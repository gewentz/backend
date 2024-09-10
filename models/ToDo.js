const mongoose = require ('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ToDo = mongoose.model('ToDo', todoSchema);
module.exports = ToDo;