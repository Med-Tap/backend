const mongoose = require("mongoose");

// Define the schema for Allergies
const allergySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Assuming you have a Patient model for referencing
    required: true,
  },
  allergen: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ["Mild", "Moderate", "Severe"],
    default: "Mild",
  },
  symptoms: {
    type: [String], // Array of symptoms
    required: false,
  },
  treatment: {
    type: String,
    required: false,
  },
  diagnosedDate: {
    type: Date,
    required: false,
  },
  notes: {type: String,required: false,},
});

// Create and export the model
const Allergy = mongoose.model("Allergy", allergySchema);
module.exports = Allergy;
