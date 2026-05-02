import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewAbout from "../components/doctors/ReviewAbout";
import "../assets/styles/Reviews.css";

const ReviewPage = () => {
  const navigate = useNavigate();

  // Hardcoded submitted reviews — will come from GET /api/reviews later
  const [submittedReviews, setSubmittedReviews] = useState([
    {
      id: 1,
      doctor: "Dr. Mohamed Ali",
      specialty: "Teeth Whitening",
      rating: 5,
      comment: "Excellent service!",
      createdAt: "2026-04-21",
    },
  ]);

  // Receives new review from ReviewAbout and adds it to the submitted list
  const handleNewReview = (newReview) => {
    setSubmittedReviews((prev) => [...prev, newReview]);
  };

  // Helper: render star emojis from numeric rating
  const renderStars = (rating) => "⭐".repeat(rating);

  return (
    <div className="review-page">

      {/* ===== HEADER ===== */}
      <div className="header">
        <div className="container">
          <h1>Reviews</h1>
          <p>
            <span onClick={() => navigate("/")}>Home</span> /&nbsp;
            <span onClick={() => navigate("/dashboard")}>Dashboard</span> / Reviews
          </p>
        </div>
      </div>

      {/* ===== FORM SECTION ===== */}
      <div className="form-section">
        <div className="container">

          {/* ── PART 1: Write a review ── */}
          <h2>Write a Review</h2>
          <p className="review-subtitle">
            Select a completed appointment below to share your experience.
          </p>

          {/* ReviewAbout handles appointment list + inline forms */}
          <ReviewAbout onReviewSubmit={handleNewReview} />

          {/* ── PART 2: Submitted reviews ── */}
          <h2 className="mt-5">My Submitted Reviews</h2>
          <p className="review-subtitle">
            All the reviews you have submitted so far.
          </p>

          {submittedReviews.length === 0 ? (
            <p className="review-empty-msg">
              You have not submitted any reviews yet.
            </p>
          ) : (
            <div className="row">
              {submittedReviews.map((review) => (
                <div className="col-md-6 col-lg-4 mb-4" key={review.id}>
                  <div className="review-card">

                    {/* Doctor name + stars */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold" style={{ color: "#1a1a2e", fontSize: "16px" }}>
                        {review.doctor}
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {renderStars(review.rating)}
                      </span>
                    </div>

                    {/* Specialty */}
                    <p className="mb-2" style={{ color: "#3aa0b0", fontSize: "13px", fontWeight: "500" }}>
                      {review.specialty}
                    </p>

                    {/* Comment */}
                    <p className="review-card-comment">"{review.comment}"</p>

                    {/* Footer: date + numeric rating badge */}
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span style={{ fontSize: "13px", color: "#85898c" }}>
                        📅 {review.createdAt}
                      </span>
                      <span className="review-rating-badge">
                        {review.rating} / 5
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default ReviewPage;