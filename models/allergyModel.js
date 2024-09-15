const mongoose = require("mongoose");

// Define the schema for Allergies
const allergySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personal",
    required: false,
  },
  hashId: { type: String, required: true },
  allergen: { type: String, required: true },
  severity: {
    type: String,
    enum: ["Mild", "Moderate", "Severe"],
    default: "Mild",
  },
  symptoms: { type: [String], required: false },
  treatment: { type: String, required: true },
  diagnosedDate: { type: Date, required: true },
  notes: { type: String, required: false },
});

// Ensures (person, allergen, diagnoseDate) must be unique
allergySchema.index({ person: 1, allergen: 1, diagnosedDate: 1 }, { unique: true });

// Create and export the model
const Allergy = mongoose.model("Allergy", allergySchema);
module.exports = Allergy;
