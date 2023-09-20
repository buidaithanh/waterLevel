const mongoose = require("mongoose");

const DistanceSchema = new mongoose.Schema({
  distance: { type: String },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Data", DistanceSchema);
