const express = require("express");
const router = express.Router();
const EmergencyModel = require("../models/emergencyModel"); // Adjust the path as needed

// Create a new emergency record
router.post("/emergency", async (req, res) => {
  try {
    const newEmergency = new EmergencyModel(req.body);
    const savedEmergency = await newEmergency.save();
    res.status(201).json(savedEmergency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all emergency records
router.get("/emergency", async (req, res) => {
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

// Retrieve a single emergency record by ID
router.get("/emergency/:id", async (req, res) => {
  try {
    const emergency = await EmergencyModel.findById(req.params.id).populate(
      "person",
      "userName userEmail"
    ); // Optionally populate person details
    if (!emergency)
      return res.status(404).json({ message: "Emergency not found" });
    res.status(200).json(emergency);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an emergency record by ID
router.put("/emergency/:id", async (req, res) => {
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
router.delete("/emergency/:id", async (req, res) => {
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
