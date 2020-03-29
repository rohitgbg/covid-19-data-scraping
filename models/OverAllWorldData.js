const mongoose = require("mongoose");

const OverAllWorldSchema = new mongoose.Schema({
  totalCases: {
    type: String
  },
  totalDeaths: {
    type: String
  },
  totalRecovered: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("OverAllWorld", OverAllWorldSchema);
