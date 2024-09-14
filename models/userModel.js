const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userName: { type: String, required: true },
  cardID: { type: String, required: true, unique: true },
  userPhone: { type: String, required: false },
  userEmail: { type: String, required: true, unique: true },
  userHashedPassword: { type: String, required: false },
  role : {type : String, required: true},
  ssoSessionToken : {type : String, required: false},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tokenExpiry : { type: String, required: false }
});

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;
