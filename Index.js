const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


const limiter = require("express-rate-limit")({
  windowMs: 900000, 
  max: 100, 
  standardHeaders: true, 
  message: {
    success: false,
    statusCode: 429,
    message: "Too many requests from this IP, please try again after 15 minutes",
  },
});

app.use(limiter);

const authRoute = require("./ServiceLayer/Routes/AuthRoute");
const doctorRoute = require("./ServiceLayer/Routes/DoctorRoute");
const reviewRoute = require("./ServiceLayer/Routes/ReviewRoute");
const patientRoute = require("./ServiceLayer/Routes/PatientRoute");
const appointmentRoute = require("./ServiceLayer/Routes/AppointmentRoute");
const clinicBranchRoute = require("./ServiceLayer/Routes/ClinicBranchRoute");
const errorHandler = require("./ServiceLayer/Middleware/ErrorHandlerMiddleware");

app.use("/api/clinicBranches", clinicBranchRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/patients", patientRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/auth", authRoute);


app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));