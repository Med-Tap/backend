const mongoose = require("mongoose");
const crypto = require('crypto');
const personalSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userName: { type: String, required: true },
  hashID: { type: String, required: true, unique: true },
  userPhone: { type: String, required: true },
  userEmail: { type: String, required: true },
  userHeight: { type: Number, required: true },
  userWeight: { type: Number, required: true },
  userHashedPassword: { type: String, required: true },
});

//Ensures (userName, userEmail) is unique
personalSchema.index({ userName: 1, userEmail: 1}, { unique: true });



// Function to generate a 7-digit SHA-256 hash from username and email
const generateHashId = (userName, userEmail) => {
    const hash = crypto.createHash('sha256');
    hash.update(userName + userEmail);
    const fullHash = hash.digest('hex');
    return fullHash.substring(0, 7); // Return first 7 characters
};

// Example usage within the model
personalSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('userName') || this.isModified('userEmail')) {
        this.hashID = generateHashId(this.userName, this.userEmail);
    }
    next();
});


const PersonalModel = mongoose.model("Personal", personalSchema);

module.exports = PersonalModel;
