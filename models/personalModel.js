const mongoose = require("mongoose");
const generateHashId = require("../helper/hash"); // Adjust path as necessary

const personalSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userName: { type: String, required: true },
  hashID: { type: String, required: true, unique: true },
  userMRN: { type: String, required: true },
  userPhone: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userHeight: { type: Number, required: true },
  userWeight: { type: Number, required: true },
  userInsurance: { type: String, required: true },
  userHashedPassword: { type: String, required: true },
  userGender: {
    type: String,
    enum: ["He/Him", "She/Her", "They/Them", "Other"],
    default: "Other",
  },
  userAddress : {type: String, required: true},
  userZipCode : {type: String, required: true},
  userCity : {type: String, required: true},
  userState : {type: String, required: true},
  userCountry : {type: String, required: true},
});

const PersonalModel = mongoose.model("Personal", personalSchema);

module.exports = PersonalModel;
