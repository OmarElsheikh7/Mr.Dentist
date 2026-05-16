import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./DashboardPage.css" // patient styles;

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        };

        const [apptRes, reviewRes] = await Promise.all([
          fetch("http://localhost:5000/api/appointments", { headers }),
          fetch("http://localhost:5000/api/reviews", { headers })
        ]);

        if (apptRes.ok) {
          const apptData = await apptRes.json();
          setAppointments(apptData.data || []);
        }

        if (reviewRes.ok) {
          const reviewData = await reviewRes.json();
          setReviews(reviewData.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">

      {/* Welcome header with patient name and summary stats */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-welcome">Welcome back, {user?.name || "Patient"}!</h1>
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

     

    </div>
  );
};

export default DashboardPage;
