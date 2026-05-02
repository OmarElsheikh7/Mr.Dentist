import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const timeSlots = [
  "12:00 PM", "1:00 PM",  "2:00 PM",  "3:00 PM",
  "4:00 PM",  "5:00 PM",  "6:00 PM",  "7:00 PM",
  "8:00 PM",  "9:00 PM",  "10:00 PM", "11:00 PM",
];

// Receives isBooked and setIsBooked from AppointmentsPage
const AppointmentForm = ({ isBooked, setIsBooked }) => {
  const navigate = useNavigate();

  // Stores all form field values
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    fullName: "",
    email: "",
    age: "",
    phone: "",
  });

  // Updates the correct field when user types or selects
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // On submit — tells AppointmentsPage to hide header and title
  const handleSubmit = (e) => {
    e.preventDefault();
    // Will be replaced with POST /api/appointments later
    setIsBooked(true);
    // Reset all fields
    setFormData({
      doctor: "",
      date: "",
      time: "",
      fullName: "",
      email: "",
      age: "",
      phone: "",
    });
  };

  // ========================================================
  // SUCCESS STATE — shown after clicking Booked
  // Header, title, and form are all gone at this point
  // ========================================================
  if (isBooked) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "70vh" }}
      >

        {/* Teal checkmark circle */}
        <div className="success-icon-circle mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#3aa0b0"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success heading */}
        <h2 className="success-title mb-3">
          Appointment Booked Successfully!
        </h2>

        {/* Success message */}
        <p className="success-subtitle mb-4">
          Your appointment has been booked successfully. <br />
          We will contact you shortly to confirm your visit.
        </p>

        {/* Go to Dashboard button */}
        <button
          className="btn-book"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>

      </div>
    );
  }

  // ========================================================
  // FORM STATE — shown before clicking Booked
  // ========================================================
  return (
    <form onSubmit={handleSubmit}>

      {/* ===== Staff Section ===== */}
      <h3 className="mt-4 mb-3">Staff</h3>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label>Select Doctor</label>
          <select
            className="form-select"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
          >
            <option value="">-- Select Doctor --</option>
            <option>Dr. Ahmed</option>
            <option>Dr. Enas</option>
            <option>Dr. Mohamed</option>
          </select>
        </div>
      </div>

      {/* ===== Time Section ===== */}
      <h3 className="mt-4 mb-3">Time</h3>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label>Time</label>
          <select
            className="form-select"
            name="time"
            value={formData.time}
            onChange={handleChange}
          >
            <option value="">-- Select Time --</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== Patient Info Section ===== */}
      <h3 className="mt-4 mb-3">Patient Info</h3>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-8 mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* ===== Submit Button ===== */}
      <div className="mt-4">
        <button type="submit" className="btn-book">
          Booked
        </button>
      </div>

    </form>
  );
};

export default AppointmentForm;