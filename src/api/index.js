// src/api/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Health Check Endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
