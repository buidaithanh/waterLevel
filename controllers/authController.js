const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });
    if (findUser) {
      return res.status(401).json({ error: "account exsited" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: "register successfull" });
  } catch (error) {
    res.status(500).json({ message: "register error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "account not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "password not corect" });
    }
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({ message: "login sucessfull", token });
  } catch (error) {
    res.status(500).json({ message: "login fall", error: error.message });
  }
};

const logout = (req, res) => {
  res.json({ message: "logout successfull" });
};

module.exports = { register, login, logout };
