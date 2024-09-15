const express = require('express');
const router = express.Router();
const AllergyModel = require('../models/allergyModel'); // Adjust the path as needed

// Create a new allergy record
router.post('/create', async (req, res) => {
  try {
    const newAllergy = new AllergyModel(req.body);
    const savedAllergy = await newAllergy.save();
    res.status(201).json(savedAllergy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all allergy records
router.get('/getALl', async (req, res) => {
  try {
    const allergies = await AllergyModel.find({})
      .populate('person', 'userName userEmail'); // Optionally populate person details
    res.status(200).json(allergies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a single allergy record by ID
router.get('/:id', async (req, res) => {
  try {
    const allergy = await AllergyModel.findById(req.params.id)
      .populate('person', 'userName userEmail'); // Optionally populate person details
    if (!allergy) return res.status(404).json({ message: 'Allergy not found' });
    res.status(200).json(allergy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a allergy record by User ID
router.get('/user/:id', async (req, res) => {
  try {
    const allergy = await AllergyModel.find({hashId: req.params.id})
    if (!allergy) return res.status(404).json({ message: 'Allergy not found' });
    res.status(200).json(allergy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an allergy record by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedAllergy = await AllergyModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('person', 'userName userEmail'); // Optionally populate person details
    if (!updatedAllergy) return res.status(404).json({ message: 'Allergy not found' });
    res.status(200).json(updatedAllergy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an allergy record by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedAllergy = await AllergyModel.findByIdAndDelete(req.params.id);
    if (!deletedAllergy) return res.status(404).json({ message: 'Allergy not found' });
    res.status(200).json({ message: 'Allergy deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
