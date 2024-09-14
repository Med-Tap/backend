const mongoose = require("mongoose");

const personalSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userName: { type: String, required: true },
  hashID: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true },
  userHeight: { type: Number, required: true },
  userWeight: { type: Number, required: true },
  userHashedPassword: { type: String, required: true },
});

//Ensures (userName, userEmail) is unique
personalSchema.index({ userName: 1, userEmail: 1}, { unique: true });

const PersonalModel = mongoose.model("Personal", personalSchema);

module.exports = PersonalModel;
