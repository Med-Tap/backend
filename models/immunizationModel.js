// Define your schema with the correct index
const mongoose = require("mongoose");

const immunizationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  vaccineName: { type: String, required: true },
  dateAdministered: { type: Date, required: true },
  doseNumber: { type: Number, required: true },
  provider: { type: String, required: false },
  lotNumber: { type: String, required: false },
  notes: { type: String, required: false },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personal",
    required: true,
  },
});

// Ensures (person, vaccineName, doseNumber) must be unique
immunizationSchema.index(
  { person: 1, vaccineName: 1, doseNumber: 1 },
  { unique: true }
);

const ImmunizationModel = mongoose.model("Immunization", immunizationSchema);

module.exports = ImmunizationModel;
