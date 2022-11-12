const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

//database
mongoose.connect(process.env.MONGO_URL, {}, (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB");
  const PORT = 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

//middleware

//routes
