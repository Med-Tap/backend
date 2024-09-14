const express = require("express");
const router = express.Router();
const PersonalModel = require("../models/personalModel"); 

// Create a new personal record
router.post("/personal", async (req, res) => {
  try {
    const newPerson = new PersonalModel(req.body);
    const savedPerson = await newPerson.save();
    console.log(savedPerson)
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve a single personal record by ID
router.get("/personal/:id", async (req, res) => {
  try {
    const person = await PersonalModel.findById(req.params.id);
    if (!person) return res.status(404).json({ message: "Person not found" });
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a personal record by ID
router.put("/personal/:id", async (req, res) => {
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
router.delete("/personal/:id", async (req, res) => {
  try {
    const deletedPerson = await PersonalModel.findByIdAndDelete(req.params.id);
    if (!deletedPerson)
      return res.status(404).json({ message: "Person not found" });
    res.status(200).json({ message: "Person deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
