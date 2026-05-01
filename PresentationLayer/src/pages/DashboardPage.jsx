import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();

  // Hardcoded user — will come from AuthContext after login integration
  const user = { name: "John Doe" };

  // Hardcoded appointments — will come from GET /api/appointments later
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Ahmed",
      specialty: "Orthodontics",
      dateTime: "2026-05-10 10:00 AM",
      branch: "Cairo Branch",
      totalCost: 500,
      status: "Upcoming",
    },
    {
      id: 2,
      doctor: "Dr. Mohamed Ali",
      specialty: "Teeth Whitening",
      dateTime: "2026-04-20 02:00 PM",
      branch: "Giza Branch",
      totalCost: 300,
      status: "Completed",
    },
  ];

  // Hardcoded reviews — will come from GET /api/reviews later
  const reviews = [
    {
      id: 1,
      doctor: "Dr. Mohamed Ali",
      rating: 5,
      comment: "Excellent service!",
      createdAt: "2026-04-21",
    },
  ];

  return (
    <div className="dashboard">

      {/* Welcome header with patient name and summary stats */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-welcome">Welcome back, {user.name}!</h1>
          <p className="dashboard-subtitle">Here is your health summary</p>
        </div>

        {/* Stat boxes showing total counts */}
        <div className="dashboard-stats">
          <div className="stat-box">
            <span className="stat-number">{appointments.length}</span>
            <span className="stat-label">Appointments</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{reviews.length}</span>
            <span className="stat-label">Reviews</span>
          </div>
        </div>
      </div>

      {/* Quick action buttons for common tasks */}
      <div className="dashboard-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-row">

          {/* Redirects to appointments booking page */}
          <button
            className="action-btn primary"
            onClick={() => navigate("/appointments")}
          >
            Book Appointment
          </button>

          {/* Redirects to patient profile page */}
          <button
            className="action-btn secondary"
            onClick={() => navigate("/profile")}
          >
            My Profile
          </button>

        </div>
      </div>

      {/* List of all patient appointments */}
      <div className="dashboard-section">
        <h2 className="section-title">My Appointments</h2>
        <div className="cards-grid">

          {/* Loop through each appointment and render a card */}
          {appointments.map((appt) => (
            <div className="card" key={appt.id}>

              {/* Top row: doctor name and status badge */}
              <div className="card-top">
                <span className="card-title">{appt.doctor}</span>
                <span className={`status-badge ${appt.status.toLowerCase()}`}>
                  {appt.status}
                </span>
              </div>

              {/* Appointment details */}
              <p className="card-detail">Specialty: {appt.specialty}</p>
              <p className="card-detail">Date: {appt.dateTime}</p>
              <p className="card-detail">Branch: {appt.branch}</p>
              <p className="card-detail">Cost: {appt.totalCost} EGP</p>

              {/* Show review button only on completed appointments */}
              {appt.status === "Completed" && (
                <button
                  className="review-btn"
                  onClick={() => navigate("/reviews")}
                >
                  Write a review about this appointment
                </button>
              )}

            </div>
          ))}

        </div>
      </div>

      {/* List of reviews the patient has written */}
      <div className="dashboard-section">
        <h2 className="section-title">My Reviews</h2>
        <div className="cards-grid">

          {/* Loop through each review and render a card */}
          {reviews.map((review) => (
            <div className="card" key={review.id}>

              {/* Top row: doctor name and star rating */}
              <div className="card-top">
                <span className="card-title">{review.doctor}</span>
                <span className="rating">{review.rating} / 5 stars</span>
              </div>

              {/* Review content */}
              <p className="card-detail">"{review.comment}"</p>
              <p className="card-detail">Date: {review.createdAt}</p>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
