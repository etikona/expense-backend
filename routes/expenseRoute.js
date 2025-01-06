// backend/routes/expenseRoutes.js
const express = require("express");
const Expense = require("../models/Expense");
const Limit = require("../models/Limit");
const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
});

// Add new expense
router.post("/", async (req, res) => {
  try {
    const { category, amount, purpose } = req.body;

    // Check if the amount exceeds the limit
    const limit = await Limit.findOne({ category });
    if (limit && amount > limit.limit) {
      return res
        .status(400)
        .json({
          message: `Expense exceeds the ${category} limit of $${limit.limit}`,
        });
    }

    const newExpense = new Expense({ category, amount, purpose });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense" });
  }
});

// Get total expenses for each category
router.get("/total", async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    const totalExpenses = {};
    expenses.forEach((exp) => {
      totalExpenses[exp._id] = exp.total;
    });
    res.json(totalExpenses);
  } catch (error) {
    res.status(500).json({ message: "Error calculating total expenses" });
  }
});

module.exports = router;
