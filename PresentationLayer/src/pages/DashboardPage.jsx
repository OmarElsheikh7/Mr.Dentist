import React from "react";

const DashboardPage = () => {
  // Hardcoded for now - will come from backend later
  const user = { name: "John Doe" };

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
    <div>
      <h1>Welcome, {user.name}!</h1>

      {/* Appointments Section */}
      <section>
        <h2>My Appointments</h2>
        {appointments.map((appt) => (
          <div key={appt.id}>
            <p>Doctor: {appt.doctor}</p>
            <p>Specialty: {appt.specialty}</p>
            <p>Date & Time: {appt.dateTime}</p>
            <p>Branch: {appt.branch}</p>
            <p>Total Cost: {appt.totalCost} EGP</p>
            <p>Status: {appt.status}</p>
            <hr />
          </div>
        ))}
      </section>

      {/* Reviews Section */}
      <section>
        <h2>My Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>Doctor: {review.doctor}</p>
            <p>Rating: {review.rating} / 5</p>
            <p>Comment: {review.comment}</p>
            <p>Date: {review.createdAt}</p>
            <hr />
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <h2>Quick Actions</h2>
        <button onClick={() => window.location.href = '/appointments'}>
          Book Appointment
        </button>
        <button onClick={() => window.location.href = '/doctors'}>
          View Doctors
        </button>
      </section>
    </div>
  );
};

export default DashboardPage;