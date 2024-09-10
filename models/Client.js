const mongoose = require ('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mongoUser: { type: String, required: true }, 
  mongoPass: { type: String, required: true }, 
  mongoURI: {type: String, required: true }, 
  whatsappNumber: { type: String, required: true },
  jwt: { type: String, default: '' }, 
  md5String: { type: String, default: '' },
  md5Hash: { type: String, default: '' },
  sha1: { type: String, default: '' }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
