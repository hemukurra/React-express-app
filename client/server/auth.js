import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// temporary in-memory "database"
const users = [];

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // check if user already exists
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // save user
  const user = { email, password: hashedPassword };
  users.push(user);

  res.json({ ok: true, message: "User registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // find user
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // check password
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // issue token
  const token = jwt.sign({ email: user.email }, "mysecret", { expiresIn: "1h" });

  res.json({ token });
});

export default router;
