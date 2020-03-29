const mongoose = require("mongoose");

const OverAllIndianSchema = new mongoose.Schema({
  activeCases: {
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

module.exports = mongoose.model("OverAllIndian", OverAllIndianSchema);
