const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userName: { type: String, required: true },
  hashID: { type: String, required: true, unique: true },
  userPhone: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userHashedPassword: { type: String, required: true },
  role : {
    type : String,
    enum : ["First Responder", "Medical Professional", "Patient"], 
    required: true},
  ssoSessionToken : {type : String, required: false}
});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;
