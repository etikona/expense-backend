// backend/models/Expense.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "groceries",
      "transportation",
      "healthcare",
      "utility",
      "charity",
      "miscellaneous",
    ],
  },
  amount: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
