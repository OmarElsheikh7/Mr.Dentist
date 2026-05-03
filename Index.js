const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoute = require("./ServiceLayer/Routes/AuthRoute");
const doctorRoute = require("./ServiceLayer/Routes/DoctorRoute");
const reviewRoute = require("./ServiceLayer/Routes/ReviewRoute");

app.use("/api/reviews", reviewRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/auth", authRoute);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));