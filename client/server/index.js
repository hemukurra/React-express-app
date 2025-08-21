import express from "express";
import cors from"cors";
import dotenv from "dotenv";
import authRoutes from "./auth.js";
import itemRoutes from "./items.js";


dotenv.config();
const app = express();


app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true
}));

app.use(express.json());


app.get("/api/health", (req, res) => res.json({ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));