import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Example route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
