// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./config/config.env" });

// Import custom middleware and routes
const logger = require("./middleware/logger");
const bootcamps = require("./routes/bootcamps");

// Create an Express application
const app = express();

// Use dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Use the custom logger middleware
app.use(logger);

// Bootcamps routes
app.use("/api/v1/bootcamps", bootcamps);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
