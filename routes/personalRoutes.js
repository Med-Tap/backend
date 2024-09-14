const express = require("express");
const generateHashId = require("../helper/hash");
const router = express.Router();
const PersonalModel = require("../models/personalModel");
const ImmunizationModel = require("../models/immunizationModel");
const AllergyModel = require("../models/allergyModel");
const EmergencyModel = require("../models/emergencyModel");
// Create a new personal record
router.post("/create", async (req, res) => {
  try {
    const newPerson = new PersonalModel(req.body);
    newPerson.hashID = generateHashId(newPerson.userName, newPerson.userEmail);
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve a single personal record by ID
router.get("/:id", async (req, res) => {
  try {
    const person = await PersonalModel.findById(req.params.id);
    if (!person) return res.status(404).json({ message: "Person not found" });
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a personal record by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedPerson = await PersonalModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPerson)
      return res.status(404).json({ message: "Person not found" });
    res.status(200).json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a personal record by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPerson = await PersonalModel.findByIdAndDelete(req.params.id);
    if (!deletedPerson)
      return res.status(404).json({ message: "Person not found" });

    await Promise.all([
      ImmunizationModel.deleteMany({ person: deletedPerson._id }),
      AllergyModel.deleteMany({ person: deletedPerson._id }),
      EmergencyModel.deleteMany({ person: deletedPerson._id }),
    ]);

    res.status(200).json({ message: "Person deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
