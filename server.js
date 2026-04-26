require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// routes
const taskRoute = require("./routers/taskRoute");
const authRoute = require("./routers/authRoute");

const app = express();
const PORT = process.env.PORT || 9000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// middlewares
app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(express.json());


// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    // start server AFTER DB connects
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });


app.use("/api", authRoute);   // /api/register, /api/login
app.use("/api", taskRoute);   // /api/createTask, etc.


app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ msg: "Invalid JSON format" });
  }
  res.status(500).json({ msg: "Server error" });
});