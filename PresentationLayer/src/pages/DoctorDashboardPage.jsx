import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../hooks/useDoctor"; 
import "./DoctorDashboardPage.css";

const DoctorDashboardPage = () => {
  const navigate = useNavigate();
const { doctor, loading, error, getDashboardData } = useDoctor();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getDashboardData();
    }
    }, [getDashboardData, navigate]);

  if (loading) return <div className="doctor-loading">Loading...</div>;
  
  if (error) return <div className="error-message">Error: {error}</div>;

  if (!doctor) return null;
  

  // Derived stats from the fetched doctor object
  const upcomingCount = doctor.appointments?.filter((a) => a.status === "Upcoming").length || 0;
  const avgRating = doctor.reviews?.length > 0
    ? (doctor.reviews.reduce((sum, r) => sum + r.rating, 0) / doctor.reviews.length).toFixed(1)
    : "N/A";
  return (
    <div className="doctor-dashboard">
      {/* Header with doctor info and stat boxes */}
      <div className="doctor-header">
        <div className="doctor-header-info">
          <p className="doctor-header-tag">{doctor.specialty}</p>
          <h1 className="doctor-header-name">Welcome, {doctor.name}</h1>
          <p className="doctor-header-desc">{doctor.description}</p>
        </div>

        {/* Quick stats summary */}
        <div className="doctor-stats">
          <div className="stat-box">
            <span className="stat-number">{upcomingCount}</span>
            <span className="stat-label">Upcoming</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{doctor.appointments.length}</span>
            <span className="stat-label">Total Appointments</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{avgRating}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{doctor.reviews.length}</span>
            <span className="stat-label">Reviews</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="doctor-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-row">
          {/* Redirects to doctor profile page */}
          <button
            className="action-btn primary"
            onClick={() => navigate("/doctor/profile")}
          >
            My Profile
          </button>
        </div>
      </div>

      {/* Doctor details: shift, fee, branches */}
      <div className="doctor-section">
        <h2 className="section-title">My Details</h2>
        <div className="details-grid">
          {/* Shift timing from DOCTOR table */}
          <div className="detail-card">
            <span className="detail-label">Shift Timing</span>
            <span className="detail-value">{doctor.shiftTiming}</span>
          </div>

          {/* Consultation fee from DOCTOR table */}
          <div className="detail-card">
            <span className="detail-label">Consultation Fee</span>
            <span className="detail-value">{doctor.consultationFee} EGP</span>
          </div>

          {/* Branches from WORKS_IN + CLINIC_BRANCH tables */}
          {doctor.branches.map((branch) => (
            <div className="detail-card" key={branch.id}>
              <span className="detail-label">Branch — {branch.city}</span>
              <span className="detail-value">{branch.address}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Appointments section — patients booked with this doctor */}
      <div className="doctor-section">
        <h2 className="section-title">My Appointments</h2>
        <div className="cards-grid">
          {/* Loop through each appointment */}
          {doctor.appointments.map((appt) => (
            <div className="card" key={appt.id}>
              {/* Top row: patient name and status badge */}
              <div className="card-top">
                <span className="card-title">{appt.patient.user.name}</span>
              </div>

              {/* Appointment details */}
              <p className="card-detail">
                Date: {appt.appointmentDate.split("T")[0]}
              </p>
              <p className="card-detail">Branch: {appt.branch.address}</p>
              <p className="card-detail">Fee: {appt.totalCost} EGP</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews section — what patients said about this doctor */}
      <div className="doctor-section">
        <h2 className="section-title">Patient Reviews</h2>
        <div className="cards-grid">
          {/* Loop through each review */}
          {doctor.reviews.map((review) => (
            <div className="card" key={review.id}>
              {/* Top row: patient name and rating */}
              <div className="card-top">
                <span className="card-title">{review.patientName}</span>
                <span className="rating">{review.rating} / 5 stars</span>
              </div>

              {/* Review content */}
              <p className="card-detail">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;