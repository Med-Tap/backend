const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userName: { type: String, required: true },
  userID: { type: String, required: true },
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

// Create and export the model
const EmergencyModel = mongoose.model("Emergency", emergencySchema);
module.exports = EmergencyModel;
