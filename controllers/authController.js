const User = require("../models/User");
const jwt = require('jsonwebtoken')

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register ---
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    });
    console.log("registered");
} catch (error) {
  console.error(error)
    res.status(500).json({ message: error.message });
}
};

// Login User ---
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
          res.status(200).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: generateToken(user._id),
          });
      } else {
          res.status(401).json({ message: "Invalid credentials" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
// Get User Profile
exports.getProfile = async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
      if (user) {
          res.status(200).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
          });
      } else {
          res.status(404).json({ message: "User not found" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
