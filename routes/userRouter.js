const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const generateHashId = require("../helper/hash");
const CONSTANTS = require("../constant");
const PersonalModel = require("../models/personalModel");

// Create a new allergy record
router.post('/create', async (req, res) => {
  try {
    const {email, given_name, family_name } = req.body
    // call hash function 
    let user = await UserModel.findOne({userEmail : email})
    if(user != null && user.cardID){
      console.log("user exits")
      return res.status(201).json({isNewUser:false, hashId: user.cardID});
    }
    console.log("In create user, creating a new user because user does not exist")
    const hash = generateHashId(email,given_name)
    let newUser = {
      userEmail: email,
      firstName : given_name,
      lastName : family_name,
      userName : given_name + family_name,
      cardID : hash,
      role : CONSTANTS.ROLES.PATIENT
    }

    const newUserData = new UserModel(newUser);
    const saveNewUser = await newUserData.save();
    if(saveNewUser){
    let newPersonalInfo = {
      userName : given_name + family_name,
      hashID : hash,
      userEmail : email,
    }
    let newPersonalInfoData = PersonalModel(newPersonalInfo)
    await newPersonalInfoData.save()
    }
    res.status(201).json({message:"User Created and personal Info Updated",hashId:hash});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all allergy records
router.get("/get/:email", async (req, res) => {
  try {
    const isExistingUser = await UserModel.findOne({
      userEmail: req.params.email,
    });

    if (isExistingUser != null || isExistingUser != "null") {
      res.status(200).json({ isExisting: true });
      return;
    }
    res.status(200).json({ isExisting: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a single allergy record by ID
router.get("/:id", async (req, res) => {
  try {
    const allergy = await AllergyModel.findById(req.params.id).populate(
      "person",
      "userName userEmail"
    ); // Optionally populate person details
    if (!allergy) return res.status(404).json({ message: "Allergy not found" });
    res.status(200).json(allergy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an allergy record by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedAllergy = await AllergyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("person", "userName userEmail"); // Optionally populate person details
    if (!updatedAllergy)
      return res.status(404).json({ message: "Allergy not found" });
    res.status(200).json(updatedAllergy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an allergy record by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedAllergy = await AllergyModel.findByIdAndDelete(req.params.id);
    if (!deletedAllergy)
      return res.status(404).json({ message: "Allergy not found" });
    res.status(200).json({ message: "Allergy deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
