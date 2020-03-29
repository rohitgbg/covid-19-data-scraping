const asyncHandler = require("../middleware/async");
const IndianStateData = require("../models/IndianStateData");

// @desc      Get all Indian States Data
// @route     GET /api/v1/indian-states
// @access    Public
exports.getIndianStateData = asyncHandler(async (req, res, next) => {
  const indianStatesData = await IndianStateData.find();
  res.status(200).json(res.advancedResults);
});
