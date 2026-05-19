import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useReviews from "../hooks/useReviews"; 
import "../assets/styles/Review.css"; 

const ReviewPage = () => {
  const navigate = useNavigate();
  const { bookedDoctors, loadingAppointments, appointmentsError, submitReview } = useReviews();

  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctorId) {
      setSubmitError("Please select a doctor to review.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      // Calls POST http://localhost:5000/api/reviews/${selectedDoctorId}
      await submitReview(selectedDoctorId, { rating: Number(rating), comment });
      navigate("/dashboard"); 
    } catch (err) {
      setSubmitError(err.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingAppointments) return <div className="review-empty-msg">Checking your appointment history...</div>;
  if (appointmentsError) return <div className="review-empty-msg" style={{color: 'red'}}>Error: {appointmentsError}</div>;

  return (
    <div className="review-page">
      {/* Header section matches your CSS layout completely */}
      <div className="header">
        <div className="container" style={{ padding: "0 60px" }}>
          <h1>Share Feedback</h1>
          <p>
            Help others by rating your specialist. Or click here to{" "}
            <span onClick={() => navigate("/dashboard")}>Go Back to Dashboard</span>
          </p>
        </div>
      </div>

      {/* Form container section mapping to your layout properties */}
      <div className="form-section">
        <h2>Write a Review</h2>
        <p className="review-subtitle">Select a professional you have visited before from your history</p>

        {submitError && (
          <div className="review-empty-msg" style={{ color: "#721c24", backgroundColor: "#f8d7da", marginBottom: "20px" }}>
            {submitError}
          </div>
        )}

        {bookedDoctors.length === 0 ? (
          <div className="review-empty-msg">
            You don't have any past completed appointments with doctors to review yet.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="review-inline-form">
            
            {/* Select Doctor Menu */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="doctor-select">Choose Doctor</label>
              <select
                id="doctor-select"
                className="form-select"
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                required
              >
                <option value="">-- Select a Doctor --</option>
                {bookedDoctors.map((doc) => {
                  const docId = doc._id || doc.id;
                  const docName = doc.user?.name || "Unknown Doctor";
                  const specialty = doc.specialty || "Dental Specialist";

                  return (
                    <option key={docId} value={docId}>
                      Dr. {docName} ({specialty})
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Select Rating Value */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="rating-select">Rating Status</label>
              <select
                id="rating-select"
                className="form-select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="5">5 / 5 Stars — Excellent Experience</option>
                <option value="4">4 / 5 Stars — Very Good Care</option>
                <option value="3">3 / 5 Stars — Good / Satisfactory</option>
                <option value="2">2 / 5 Stars — Fair</option>
                <option value="1">1 / 5 Stars — Unacceptable Service</option>
              </select>
            </div>

            {/* Comment Area Box */}
            <div style={{ marginBottom: "24px" }}>
              <label htmlFor="comment-box">Your Feedback Details</label>
              <textarea
                id="comment-box"
                className="form-control"
                rows="5"
                placeholder="Describe your clinic appointment experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            {/* Execution Actions Component Line */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                type="submit" 
                className="action-btn primary" 
                style={{ height: "45px", padding: "0 24px", border: "none", borderRadius: "6px", cursor: "pointer", backgroundColor: "#3aa0b0", color: "white", fontWeight: "600" }}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
              
              <button 
                type="button" 
                className="action-btn secondary" 
                style={{ height: "45px", padding: "0 24px", border: "1px solid #ced4da", borderRadius: "6px", cursor: "pointer", backgroundColor: "white", color: "#555" }}
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;