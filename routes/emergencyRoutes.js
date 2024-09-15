const express = require("express");
const router = express.Router();
const EmergencyModel = require("../models/emergencyModel"); // Adjust the path as needed
const PersonalModel = require("../models/personalModel")
// Create a new emergency record
router.post("/create-emergency-contact", async (req, res) => {
  try {
    const newEmergency = new EmergencyModel(req.body);
    const savedEmergency = await newEmergency.save();
    res.status(201).json(savedEmergency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all emergency records
router.get("/get-all-emergency-contacts", async (req, res) => {
  try {
    const emergencies = await EmergencyModel.find({}).populate(
      "person",
      "userName userEmail"
    ); // Optionally populate person details
    res.status(200).json(emergencies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve all emergency contacts for a given hashID
router.get("/get-emergency-contacts/:hashID", async (req, res) => {
  try {
    const { hashID } = req.params;
    const emergencyContacts = await EmergencyModel.find({ hashID })
    if (emergencyContacts.length === 0) {
      return res.status(404).json({ message: "No emergency contacts found for this hashID" });
    }
    res.status(200).json(emergencyContacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Retrieve a single emergency record by ID
router.get("/hash/:hashID", async (req, res) => {
  try {
    //Find the person with the hash id
    const orginalPerson = await PersonalModel.findOne({ hashID: req.params.hash });
    const person = await EmergencyModel.findOne({ person: person._id });
    console.log(person)
    if (!person) return res.status(404).json({ message: "Person not found" });
    res.status(200).json(person);
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an emergency record by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedEmergency = await EmergencyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("person", "userName userEmail"); // Optionally populate person details
    if (!updatedEmergency)
      return res.status(404).json({ message: "Emergency not found" });
    res.status(200).json(updatedEmergency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an emergency record by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedEmergency = await EmergencyModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEmergency)
      return res.status(404).json({ message: "Emergency not found" });
    res.status(200).json({ message: "Emergency deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
