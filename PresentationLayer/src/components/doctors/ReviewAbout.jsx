import React, { useState } from "react";

// Hardcoded completed appointments — will come from GET /api/appointments?status=completed later
const completedAppointments = [
  {
    id: 2,
    doctor: "Dr. Mohamed Ali",
    specialty: "Teeth Whitening",
    dateTime: "2026-04-20 02:00 PM",
    branch: "Giza Branch",
  },
  {
    id: 3,
    doctor: "Dr. Sarah Ahmed",
    specialty: "Orthodontics",
    dateTime: "2026-03-15 11:00 AM",
    branch: "Cairo Branch",
  },
];

const ReviewAbout = ({ onReviewSubmit }) => {

  // Tracks form data per appointment id
  const [formData, setFormData] = useState({});

  // Tracks which appointment form is currently open
  const [activeId, setActiveId] = useState(null);

  // Tracks which appointment ids have already been reviewed
  const [reviewedIds, setReviewedIds] = useState([]);

  // Update a specific field for a specific appointment form
  const handleChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Toggle open/close the inline form for an appointment
  const handleToggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  // Submit review for a specific appointment
  const handleSubmit = (e, appt) => {
    e.preventDefault();
    const data = formData[appt.id] || {};

    // Basic validation
    if (!data.rating || !data.comment?.trim()) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    // Build review object — will be replaced with POST /api/reviews later
    const newReview = {
      id: Date.now(),
      doctor: appt.doctor,
      specialty: appt.specialty,
      rating: Number(data.rating),
      comment: data.comment.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Mark appointment as reviewed and close its form
    setReviewedIds((prev) => [...prev, appt.id]);
    setActiveId(null);
    setFormData((prev) => ({ ...prev, [appt.id]: {} }));

    // Send review up to ReviewPage to display in submitted list
    if (onReviewSubmit) onReviewSubmit(newReview);
  };

  return (
    <div>
      {completedAppointments.map((appt) => {
        const isReviewed = reviewedIds.includes(appt.id);
        const isOpen = activeId === appt.id;
        const data = formData[appt.id] || {};

        return (
          <div key={appt.id}>

            {/* ── Appointment summary row ── */}
            <div className="d-flex justify-content-between align-items-center flex-wrap py-3 gap-2">

              {/* Left side: doctor name + specialty */}
              <div>
                <span className="fw-bold me-2" style={{ color: "#1a1a2e", fontSize: "17px" }}>
                  {appt.doctor}
                </span>
                <span style={{ color: "#3aa0b0", fontSize: "14px", fontWeight: "500" }}>
                  {appt.specialty}
                </span>
              </div>

              {/* Right side: date + button or badge */}
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <span style={{ color: "#85898c", fontSize: "14px" }}>
                  {appt.dateTime}
                </span>
                <span style={{ color: "#85898c", fontSize: "14px" }}>
                  {appt.branch}
                </span>

                {/* Show badge if reviewed, button if not */}
                {isReviewed ? (
                  <span className="badge-reviewed">✔ Reviewed</span>
                ) : (
                  <button
                    className="btn-book"
                    style={{ padding: "8px 18px", fontSize: "14px" }}
                    onClick={() => handleToggle(appt.id)}
                  >
                    {isOpen ? "✕ Cancel" : "✎ Write a Review"}
                  </button>
                )}
              </div>
            </div>

            {/* ── Inline review form — shown when isOpen is true ── */}
            {isOpen && !isReviewed && (
              <form
                className="review-inline-form"
                onSubmit={(e) => handleSubmit(e, appt)}
              >

                {/* ── Rating Section ── */}
                <h3 className="mt-3 mb-3">Rating</h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Select Rating</label>
                    <select
                      className="form-select"
                      value={data.rating || ""}
                      onChange={(e) =>
                        handleChange(appt.id, "rating", e.target.value)
                      }
                    >
                      <option value="">-- Select Rating --</option>
                      <option value="1">⭐ 1 - Poor</option>
                      <option value="2">⭐⭐ 2 - Fair</option>
                      <option value="3">⭐⭐⭐ 3 - Good</option>
                      <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                      <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                    </select>
                  </div>
                </div>

                {/* ── Comment Section ── */}
                <h3 className="mt-2 mb-3">Comment</h3>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label>Your Comment</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Share your experience with this doctor..."
                      value={data.comment || ""}
                      onChange={(e) =>
                        handleChange(appt.id, "comment", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* ── Submit Button ── */}
                <div className="mt-2 mb-4">
                  <button type="submit" className="btn-book">
                    Submit Review
                  </button>
                </div>

              </form>
            )}

            {/* Divider between each appointment block */}
            <hr style={{ borderColor: "#e9ecef", margin: "0" }} />

          </div>
        );
      })}
    </div>
  );
};

export default ReviewAbout;