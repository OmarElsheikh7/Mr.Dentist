import React, { useState } from "react";
import useReviews from "../hooks/useReviews"; // ← import your new hook

const ReviewAbout = ({ onReviewSubmit }) => {

  // ── Pull everything from the hook ──
  const {
    completedAppointments,
    loadingAppointments,
    appointmentsError,
    submitReview,
  } = useReviews();

  const [formData, setFormData] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [reviewedIds, setReviewedIds] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleToggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const handleSubmit = async (e, appt) => {
    e.preventDefault();
    const data = formData[appt.id] || {};

    if (!data.rating || !data.comment?.trim()) {
      alert("Please provide both a rating and a comment.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // calls POST /api/reviews/:doctorId
      const res = await submitReview(appt.doctorId, {
        rating: Number(data.rating),
        comment: data.comment.trim(),
      });

      const newReview = {
        id: res.data._id,           // adjust if your backend wraps differently
        doctor: appt.doctor,
        specialty: appt.specialty,
        rating: Number(data.rating),
        comment: data.comment.trim(),
        createdAt: new Date().toISOString().split("T")[0],
      };

      setReviewedIds((prev) => [...prev, appt.id]);
      setActiveId(null);
      setFormData((prev) => ({ ...prev, [appt.id]: {} }));

      if (onReviewSubmit) onReviewSubmit(newReview);

    } catch (err) {
      // shows backend messages like "You have already reviewed this doctor"
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading & error states for appointments fetch ──
  if (loadingAppointments) return <p>Loading appointments...</p>;
  if (appointmentsError) return <p style={{ color: "red" }}>{appointmentsError}</p>;

  return (
    <div>
      {completedAppointments.map((appt) => {
        const isReviewed = reviewedIds.includes(appt.id);
        const isOpen = activeId === appt.id;
        const data = formData[appt.id] || {};

        return (
          <div key={appt.id}>
            <div className="d-flex justify-content-between align-items-center flex-wrap py-3 gap-2">
              <div>
                <span className="fw-bold me-2" style={{ color: "#1a1a2e", fontSize: "17px" }}>
                  {appt.doctor}
                </span>
                <span style={{ color: "#3aa0b0", fontSize: "14px", fontWeight: "500" }}>
                  {appt.specialty}
                </span>
              </div>

              <div className="d-flex align-items-center gap-3 flex-wrap">
                <span style={{ color: "#85898c", fontSize: "14px" }}>{appt.dateTime}</span>
                <span style={{ color: "#85898c", fontSize: "14px" }}>{appt.branch}</span>

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

            {isOpen && !isReviewed && (
              <form className="review-inline-form" onSubmit={(e) => handleSubmit(e, appt)}>

                {/* Show submit error inside the form */}
                {submitError && (
                  <p style={{ color: "red", marginBottom: "12px" }}>{submitError}</p>
                )}

                <h3 className="mt-3 mb-3">Rating</h3>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Select Rating</label>
                    <select
                      className="form-select"
                      value={data.rating || ""}
                      onChange={(e) => handleChange(appt.id, "rating", e.target.value)}
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

                <h3 className="mt-2 mb-3">Comment</h3>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label>Your Comment</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Share your experience with this doctor..."
                      value={data.comment || ""}
                      onChange={(e) => handleChange(appt.id, "comment", e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-2 mb-4">
                  <button type="submit" className="btn-book" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>

              </form>
            )}

            <hr style={{ borderColor: "#e9ecef", margin: "0" }} />
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAbout;