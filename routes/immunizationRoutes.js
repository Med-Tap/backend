const express = require("express");
const router = express.Router();
const ImmunizationModel = require("../models/immunizationModel"); // Adjust the path as needed

// Create a new immunization record
router.post("/create", async (req, res) => {
  try {
    console.log(req)
    const newImmunization = new ImmunizationModel(req.body);
    console.log(newImmunization)
    const savedImmunization = await newImmunization.save();
    res.status(201).json(savedImmunization);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all immunization records
router.get("/get-all-immunization", async (req, res) => {
  try {
    const immunizations = await ImmunizationModel.find({}).populate(
      "person",
      "userName userEmail"
    ); // Optionally populate person details
    res.status(200).json(immunizations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a single immunization record by ID
router.get("/:id", async (req, res) => {
  try {
    const immunization = await ImmunizationModel.findById(
      req.params.id
    ).populate("person", "userName userEmail"); // Optionally populate person details
    if (!immunization)
      return res.status(404).json({ message: "Immunization not found" });
    res.status(200).json(immunization);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an immunization record by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedImmunization = await ImmunizationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("person", "userName userEmail"); // Optionally populate person details
    if (!updatedImmunization)
      return res.status(404).json({ message: "Immunization not found" });
    res.status(200).json(updatedImmunization);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an immunization record by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedImmunization = await ImmunizationModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedImmunization)
      return res.status(404).json({ message: "Immunization not found" });
    res.status(200).json({ message: "Immunization deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
