const mongoose = require("mongoose");

const immunizationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  vaccineName: { type: String, required: true },
  dateAdministered: { type: Date, required: true },
  doseNumber: { type: Number, required: true },
  provider: { type: String, required: false },
  lotNumber: { type: String, required: false },
  notes: { type: String, required: false },
  person: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal', required: true } 
});

// Create and export the model
const ImmunizationModel = mongoose.model("Immunization", immunizationSchema);

module.exports = ImmunizationModel;
