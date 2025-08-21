import { Router } from "express";
const router = Router();

// test route
router.post("/login", (req, res) => {
  res.json({ token: "fake-jwt-token" });
});

router.post("/register", (req, res) => {
  res.json({ ok: true });
});

export default router;
