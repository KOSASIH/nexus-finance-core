// src/config/serverConfig.js
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const serverConfig = {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || "development",
    cors: {
        origin: process.env.CORS_ORIGIN || "*", // Allow all origins by default
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    },
    bodyParser: {
        limit: "10mb", // Limit the size of incoming requests
    },
};

module.exports = serverConfig;
