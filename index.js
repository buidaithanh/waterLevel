const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const iotRoutes = require("./routes/iotRoutes");
const bodyParser = require("body-parser");

const app = express();

// Kết nối tới MongoDB
mongoose.connect(
  "mongodb+srv://thanh0985837774:dragonjack01@cluster0.apxsamv.mongodb.net/",
  { useNewUrlParser: true }
);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/iot", iotRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));
