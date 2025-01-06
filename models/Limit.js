// backend/models/Limit.js
const mongoose = require("mongoose");

const limitSchema = new mongoose.Schema({
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
  limit: {
    type: Number,
    required: true,
  },
});

const Limit = mongoose.model("Limit", limitSchema);
module.exports = Limit;
