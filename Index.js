const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const authRoute = require("./ServiceLayer/Routes/AuthRoute");
app.use("/api/auth", authRoute);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));