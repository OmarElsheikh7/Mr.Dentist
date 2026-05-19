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

  const upcomingCount = doctor.appointments?.filter((a) => a.status === "Upcoming").length || 0;
  const avgRating = doctor.reviews?.length > 0
    ? (doctor.reviews.reduce((sum, r) => sum + r.rating, 0) / doctor.reviews.length).toFixed(1)
    : "N/A";

  return (
    <div className="doctor-dashboard">
      <div className="doctor-header">
        <div className="doctor-header-info">
          <p className="doctor-header-tag">{doctor.specialty}</p>
          <h1 className="doctor-header-name">Welcome, {doctor.name}</h1>
          <p className="doctor-header-desc">{doctor.description}</p>
        </div>

        <div className="doctor-stats">
          <div className="stat-box">
            <span className="stat-number">{upcomingCount}</span>
            <span className="stat-label">Upcoming</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{doctor.appointments?.length || 0}</span>
            <span className="stat-label">Total Appointments</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{avgRating}</span>
            <span className="stat-label">Avg Rating</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{doctor.reviews?.length || 0}</span>
            <span className="stat-label">Reviews</span>
          </div>
        </div>
      </div>

      <div className="doctor-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-row">
          <button className="action-btn primary" onClick={() => navigate("/doctor/profile")}>
            My Profile
          </button>
        </div>
      </div>

      <div className="doctor-section">
        <h2 className="section-title">My Details</h2>
        <div className="details-grid">
          <div className="detail-card">
            <span className="detail-label">Shift Timing</span>
            <span className="detail-value">
              {(() => {
                switch (doctor.shiftID) {
                  case 0: return "Morning (08:00 - 16:00)";
                  case 1: return "Afternoon (16:00 - 00:00)";
                  case 2: return "Night (00:00 - 08:00)";
                  default: return "N/A";
                }
              })()}
            </span>
          </div>
          <div className="detail-card">
            <span className="detail-label">Consultation Fee</span>
            <span className="detail-value">{doctor.consultationFee} EGP</span>
          </div>
          <div className="detail-card">
            <span className="detail-label">Branch</span>
            <span className="detail-value">{doctor.branchId?.address?.toString() || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="doctor-section">
        <h2 className="section-title">My Appointments</h2>
        <div className="cards-grid">
          {doctor.appointments?.map((appt) => (
            <div className="card" key={appt.id || appt._id}>
              <div className="card-top">
                <span className="card-title">{appt.patient?.user?.name || "Unknown Patient"}</span>
              </div>
              <p className="card-detail">
                Date: {appt.appointmentDate ? new Date(appt.appointmentDate).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric'
                }) : "N/A"}
              </p>
              <p className="card-detail">Branch: {appt.branch?.address || "N/A"}</p>
              <p className="card-detail">Fee: {appt.totalCost} EGP</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews section — Displays submitted content from patients */}
      <div className="doctor-section">
        <h2 className="section-title">Patient Reviews</h2>
        {!doctor.reviews || doctor.reviews.length === 0 ? (
          <div className="review-empty-msg">No patients have reviewed your profile yet.</div>
        ) : (
          <div className="cards-grid">
            {doctor.reviews.map((review) => (
              <div className="card review-card" key={review.id || review._id}>
                <div className="card-top">
                  {/* Robust name extraction matching backend nested schemas */}
                  <span className="card-title">
                    {review.patientName || review.patient?.user?.name || "Anonymous Patient"}
                  </span>
                  <span className="review-rating-badge">{review.rating} / 5 ★</span>
                </div>
                <p className="review-card-comment">"{review.comment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DoctorDashboardPage;