// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Import custom middleware and routes
const logger = require("./middleware/logger");
const bootcamps = require("./routes/bootcamps");

// Create an Express application
const app = express();

// Body parser
app.use(express.json());

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
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandle promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server & exist process
  server.close(() => process.exit(1));
});
