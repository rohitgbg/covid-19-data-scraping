const express = require("express");
const dotevn = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

dotevn.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

//body parser

app.use(express.json());

//middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
