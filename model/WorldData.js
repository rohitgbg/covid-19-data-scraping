const mongoose = require("mongoose");
const WorldDataSchema = new mongoose.Schema({
  country: {
    type: String
  },
  totalCases: {
    type: String
  },
  totalDeaths: {
    type: String
  },
  totalRecovered: {
    type: String
  },
  activeCases: {
    type: String
  },
  criticalCases: {
    type: String
  },
  firstCase: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("WorldData", WorldDataSchema);
