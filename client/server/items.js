import { Router } from "express";
const router = Router();

// in-memory fake items
let items = [];

router.get("/", (req, res) => {
  res.json(items);
});

router.post("/", (req, res) => {
  const { title } = req.body;
  const newItem = { id: Date.now(), title, bought: false };
  items.push(newItem);
  res.status(201).json(newItem);
});

router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.map(i =>
    i.id === id ? { ...i, bought: req.body.bought } : i
  );
  res.json(items.find(i => i.id === id));
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.json({ ok: true });
});

export default router;
