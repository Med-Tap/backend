const mongoose = require('mongoose');
const generateHashId = require('../helper/hash'); // Adjust path as necessary

const personalSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userName: { type: String, required: true },
  hashID: { type: String, required: true, unique: true },
  userPhone: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userHeight: { type: Number, required: true },
  userWeight: { type: Number, required: true },
});

const PersonalModel = mongoose.model('Personal', personalSchema);

module.exports = PersonalModel;
