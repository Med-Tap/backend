const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, required: true },
  relationship: {
    type: String,
    enum: [
      "Parent/Guardian",
      "Spouse/Partner",
      "Sibling",
      "Friend",
      "Colleague",
    ],
    default: "Friend",
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personal",
    required: true,
  },
});

//Ensures { person: 1, userName: 1, userEmail: 1, userPhone} must be unique
emergencySchema.index(
  { person: 1, userName: 1, userEmail: 1, userPhone: 1 },
  { unique: true }
);

// Create and export the model
const EmergencyModel = mongoose.model("Emergency", emergencySchema);
module.exports = EmergencyModel;
