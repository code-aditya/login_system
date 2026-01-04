import express from "express";
import dotenv from "dotenv";
import { connectMongo } from "./config/mongo.js";
import { redis } from "./config/redis.js";

dotenv.config();

const app = express();
app.use(express.json());

await connectMongo();

app.get("/health", async (req, res) => {
  const redisPing = await redis.ping();
  res.json({ status: "OK", redis: redisPing });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

