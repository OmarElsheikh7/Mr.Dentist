import React, { useState } from "react";
import AppointmentForm from "../components/appointments/AppointmentForm";
import "../assets/styles/appointmentform.css";

const AppointmentsPage = () => {

  // isBooked lives here so it controls header + title visibility too
  const [isBooked, setIsBooked] = useState(false);

  return (
    <div className="appointment-page">

      {/* ===== HEADER — hidden after booking ===== */}
      {!isBooked && (
        <div className="header">
          <div className="container">
            <h1>Appointment Form</h1>
            <p><span>Home</span> / Appointment Form</p>
          </div>
        </div>
      )}

      {/* ===== FORM SECTION ===== */}
      <div className="form-section">
        <div className="container">

          {/* "Make an Appointment" title — hidden after booking */}
          {!isBooked && <h2>Make an Appointment</h2>}

          {/* Pass state down so AppointmentForm can trigger the hide */}
          <AppointmentForm
            isBooked={isBooked}
            setIsBooked={setIsBooked}
          />

        </div>
      </div>

    </div>
  );
};

export default AppointmentsPage;