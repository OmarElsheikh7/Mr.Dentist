import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboardPage.css";

const DoctorDashboardPage = () => {
  const navigate = useNavigate();

  // Holds doctor profile data fetched from API
  const [doctor, setDoctor] = useState(null);

  // Tracks loading state while fetching
  const [loading, setLoading] = useState(true);

  // Fetch doctor data when page loads
  useEffect(() => {
    // TODO: replace with real API call when backend is ready
    // Example:
    // const token = localStorage.getItem("token");
    // const res = await fetch("/api/doctors/me", {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // const data = await res.json();
    // setDoctor(data);

    // Hardcoded data for now — remove when API is connected
    setTimeout(() => {
      setDoctor({
        name: "Dr. Sarah Ahmed",
        specialty: "Orthodontics",
        shiftTiming: "Sun–Thu 9AM–3PM",
        consultationFee: 500,
        description: "Specialist in orthodontic treatments with 10 years of experience.",

        // Branches this doctor works in — from WORKS_IN + CLINIC_BRANCH tables
        branches: [
          { id: 1, city: "Cairo", address: "15 Tahrir Square, Downtown Cairo" },
          { id: 2, city: "Giza", address: "88 Pyramids Road, Giza" },
        ],

        // Appointments assigned to this doctor — from APPOINTMENT table
        appointments: [
          {
            id: 1,
            patientName: "John Doe",
            dateTime: "2026-05-10 10:00 AM",
            branch: "Cairo Branch",
            totalCost: 500,
            status: "Upcoming",
          },
          {
            id: 2,
            patientName: "Nadia Hassan",
            dateTime: "2026-05-10 11:00 AM",
            branch: "Cairo Branch",
            totalCost: 500,
            status: "Upcoming",
          },
          {
            id: 3,
            patientName: "Omar Khaled",
            dateTime: "2026-04-28 09:00 AM",
            branch: "Giza Branch",
            totalCost: 500,
            status: "Completed",
          },
        ],

        // Reviews patients wrote about this doctor — from REVIEW table
        reviews: [
          {
            id: 1,
            patientName: "Omar Khaled",
            rating: 5,
            comment: "Excellent doctor, very professional.",
            createdAt: "2026-04-28",
          },
          {
            id: 2,
            patientName: "Mona Samir",
            rating: 4,
            comment: "Great experience, highly recommended.",
            createdAt: "2026-04-15",
          },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  // Show loading state while data is being fetched
  if (loading) {
    return <div className="doctor-loading">Loading dashboard...</div>;
  }

  // Count upcoming appointments for the stat box
  const upcomingCount = doctor.appointments.filter(
    (a) => a.status === "Upcoming"
  ).length;

  // Calculate average rating from all reviews
  const avgRating =
    doctor.reviews.length > 0
      ? (
          doctor.reviews.reduce((sum, r) => sum + r.rating, 0) /
          doctor.reviews.length
        ).toFixed(1)
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
            onClick={() => navigate("/profile")}
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
                <span className="card-title">{appt.patientName}</span>
                <span className={`status-badge ${appt.status.toLowerCase()}`}>
                  {appt.status}
                </span>
              </div>

              {/* Appointment details */}
              <p className="card-detail">Date: {appt.dateTime}</p>
              <p className="card-detail">Branch: {appt.branch}</p>
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
              <p className="card-detail">Date: {review.createdAt}</p>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default DoctorDashboardPage;
