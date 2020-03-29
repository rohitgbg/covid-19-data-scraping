const express = require("express");
const router = express.Router();

const { getIndianStateData } = require("../controllers/indianStateData");

// Advanced results - filter, sort, pagination
const advancedResults = require("../middleware/advancedResults");

// Model
const IndianStateData = require("../models/IndianStateData");

router
  .route("/indian-states")
  .get(advancedResults(IndianStateData), getIndianStateData);

module.exports = router;
