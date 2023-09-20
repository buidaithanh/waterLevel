const Distance = require("../models/Distance");

//post distance to DB
const postDistance = async (req, res) => {
  const data = new Distance(req.body);
  await data.save();
  res.send("Data saved to MongoDB");
};
// get distance from DB
const getDistance = async (req, res) => {
  try {
    const distances = await Distance.find().sort({ timestamp: -1 }).limit(1); // Lấy dữ liệu mới nhất
    res.json(distances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { postDistance, getDistance };
