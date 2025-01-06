// backend/routes/limitRoutes.js
const express = require("express");
const Limit = require("../models/Limit");
const router = express.Router();

// Get all limits
router.get("/", async (req, res) => {
  try {
    const limits = await Limit.find();
    const limitsObject = {};
    limits.forEach((limit) => {
      limitsObject[limit.category] = limit.limit;
    });
    res.json(limitsObject);
  } catch (error) {
    res.status(500).json({ message: "Error fetching limits" });
  }
});

// Update limits
router.put("/", async (req, res) => {
  try {
    const updatedLimits = req.body;

    for (const category in updatedLimits) {
      const existingLimit = await Limit.findOne({ category });
      if (existingLimit) {
        existingLimit.limit = updatedLimits[category];
        await existingLimit.save();
      } else {
        await Limit.create({ category, limit: updatedLimits[category] });
      }
    }

    res.json(updatedLimits);
  } catch (error) {
    res.status(500).json({ message: "Error updating limits" });
  }
});

module.exports = router;
