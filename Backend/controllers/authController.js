import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const hash = await bcrypt.hash(password, 10);

    const admin = new Admin({ username, passwordHash: hash });
    await admin.save();

    res.json({ message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
