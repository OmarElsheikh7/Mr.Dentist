import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./DashboardPage.css"; // patient styles

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
          fetch("http://localhost:5000/api/appointments/patient/appointments", { headers }),
          fetch("http://localhost:5000/api/patients/reviews", { headers })
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
            <span className="stat-label">Reviews Sent</span>
          </div>
        </div>
      </div>

      {/* Quick action buttons for common tasks */}
      <div className="dashboard-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-row">
          <button
            className="action-btn primary"
            onClick={() => navigate("/appointments")}
          >
            Book Appointment
          </button>

          {/* Navigates to the review form page */}
          <button
            className="action-btn review-btn"
            onClick={() => navigate("/review")}
            style={{ backgroundColor: "#28a745", color: "white" }}
          >
            Write a Review
          </button>

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
          {appointments.map((appt) => (
            <div className="card" key={appt._id}>
              <div className="card-top">
                <span className="card-title">
                  {appt.doctor?.user?.name || "Unknown Doctor"}
                </span>
              </div>
              <p className="card-detail">Specialty: {appt.doctor?.specialty || "N/A"}</p>
              <p className="card-detail">
                Date: {appt.appointmentDate ? new Date(appt.appointmentDate).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'short', day: 'numeric'
                }) : "N/A"}
              </p>
              <p className="card-detail">Branch: {appt.branch?.address || "N/A"}</p>
              <p className="card-detail">Cost: {appt.totalCost} EGP</p>
            </div>
          ))}
        </div>
      </div>

      {/* NEW SECTION: Displays the patient's submitted reviews */}
      <div className="dashboard-section">
        <h2 className="section-title">My Submitted Reviews</h2>
        {reviews.length === 0 ? (
          <div className="review-empty-msg">You haven't submitted any reviews yet.</div>
        ) : (
          <div className="cards-grid">
            {reviews.map((review) => (
              <div className="card review-card" key={review._id || review.id}>
                <div className="card-top">
                  <span className="card-title">
                    {review.doctor?.user?.name ? `Dr. ${review.doctor.user.name}` : "Dental Specialist"}
                  </span>
                  <span className="review-rating-badge">{review.rating} / 5 ★</span>
                </div>
                <p className="review-card-comment">"{review.comment}"</p>
                {review.createdAt && (
                  <p className="card-detail" style={{ fontSize: "11px", marginTop: "8px", color: "#85898c" }}>
                    Submitted on: {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;