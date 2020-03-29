const mongoose = require("mongoose");

const IndianStateSchema = new mongoose.Schema({
  //   id: {
  //     type: String
  //   },
  state: {
    type: String
  },
  totalConfIndian: {
    type: String
  },
  totalConfForeign: {
    type: String
  },
  cured: {
    type: String
  },
  death: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("IndianState", IndianStateSchema);
