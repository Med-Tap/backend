const mongoose = require("mongoose");
const generateHashId = require("../helper/hash"); // Adjust path as necessary

const personalSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userName: { type: String, required: true },
  hashID: { type: String, required: true, unique: true },
  userMRN: { type: String, required: false },
  userPhone: { type: String, required: false },
  userEmail: { type: String, required: true, unique: true },
  userHeight: { type: Number, required: false },
  userWeight: { type: Number, required: false },
  userInsurance: { type: String, required: false },
  userHashedPassword: { type: String, required: false },
  userGender: {
    type: String,
    enum: ["He/Him", "She/Her", "They/Them", "Other"],
    default: "Other",
  },
  userAddress : {type: String, required: false},
  userZipCode : {type: String, required: false},
  userCity : {type: String, required: false},
  userState : {type: String, required: false},
  userCountry : {type: String, required: false},
});

const PersonalModel = mongoose.model("Personal", personalSchema);

module.exports = PersonalModel;
