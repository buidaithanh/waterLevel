const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validator for username
    if (!username || username.trim() === "") {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!/^[a-zA-Z0-9]{6,20}$/.test(username)) {
      return res.status(400).json({
        error:
          "Username must be 6-20 characters long, and only contain letters and digits",
      });
    }
    if (/\s/.test(username)) {
      return res
        .status(400)
        .json({ error: "Username must not contain spaces" });
    }

    // Validator for password
    if (!password || password.trim() === "") {
      return res.status(400).json({ error: "Password is required" });
    }
    if (password.length < 6 || password.length > 12) {
      return res
        .status(400)
        .json({ error: "Password must be 6-12 characters long" });
    }
    if (!/[a-z]/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain at least one lowercase letter" });
    }
    if (!/[A-Z]/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain at least one uppercase letter" });
    }
    if (!/\d/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain at least one digit" });
    }
    if (!/[@$!%*?&]/.test(password)) {
      return res.status(400).json({
        error:
          "Password must contain at least one special character (@, $, !, %, *, ?, &)",
      });
    }
    if (/\s/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must not contain spaces" });
    }
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
    // Validator for username
    if (!username || username.trim() === "") {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!/^[a-zA-Z0-9]{6,20}$/.test(username)) {
      return res.status(400).json({
        error:
          "Username must be 6-20 characters long, and only contain letters and digits",
      });
    }
    if (/\s/.test(username)) {
      return res
        .status(400)
        .json({ error: "Username must not contain spaces" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "account not found" });
    }

    // Validator for password
    if (!password || password.trim() === "") {
      return res.status(400).json({ error: "Password is required" });
    }
    if (password.length < 6 || password.length > 12) {
      return res
        .status(400)
        .json({ error: "Password must be 6-12 characters long" });
    }
    if (!/[a-z]/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain at least one lowercase letter" });
    }
    if (!/[A-Z]/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain at least one uppercase letter" });
    }
    if (!/\d/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain at least one digit" });
    }
    if (!/[@$!%*?&]/.test(password)) {
      return res.status(400).json({
        error:
          "Password must contain at least one special character (@, $, !, %, *, ?, &)",
      });
    }
    if (/\s/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must not contain spaces" });
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
