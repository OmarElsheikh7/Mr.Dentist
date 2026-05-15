import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Attaches the JWT stored in localStorage to every request
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const AppointmentForm = ({ isBooked, setIsBooked }) => {
  const navigate = useNavigate();

  // ── Remote data ────────────────────────────────────────────
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Form state ─────────────────────────────────────────────
  const [formData, setFormData] = useState({
    doctorId: "",     // doctor._id  → used as :id in API routes
    date: "",
    slotTime: "",     // matches req.body.slotTime
  });

  // ── 1. Load doctors on mount (GET /api/doctors — public) ───
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // getAllDoctors route has no auth guard, so no header needed,
        // but we include it anyway in case that changes.
        const res = await fetch("http://localhost:5000/api/doctors", { headers: authHeaders() });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load doctors.");
        // data.data is the array; each item has _id, specialty, user.name, etc.
        setDoctors(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  // ── 2. Load available slots when doctor + date are set ─────
  //   Route: GET /api/appointments/Availableslots/:id
  //   Your controller reads date from req.body
  //   NOTE: if your server/proxy strips GET bodies, change the
  //         backend route to POST /Availableslots/:id instead.
  useEffect(() => {
    if (!formData.doctorId || !formData.date) return;

    const fetchSlots = async () => {
      setLoadingSlots(true);
      setSlots([]);
      setFormData((prev) => ({ ...prev, slotTime: "" }));
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:5000/api/appointments/Availableslots/${formData.doctorId}`,
          {
            method: "POST",
            body: JSON.stringify({ date: formData.date }),
            headers: authHeaders(),
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load slots.");
        setSlots(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [formData.doctorId, formData.date]);

  // ── Generic change handler ─────────────────────────────────
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── 3. Book appointment (POST /api/appointments/:doctorId) ─
  //   Body must contain appointmentDate + slotTime (see controller)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${formData.doctorId}`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          appointmentDate: formData.date,   // → req.body.appointmentDate
          slotTime: formData.slotTime,      // → req.body.slotTime
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed.");
      setIsBooked(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen (unchanged from original) ───────────────
  if (isBooked) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="success-icon-circle mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#3aa0b0"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="success-title mb-3">Appointment Booked Successfully!</h2>
        <p className="success-subtitle mb-4">
          Your appointment has been booked successfully. <br />
          We will contact you shortly to confirm your visit.
        </p>
        <button className="btn-book" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  // ── Calculate Date Constraints ─────────────────────────────
  // Calculate today's date in YYYY-MM-DD format
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Calculate the date 6 months from today in YYYY-MM-DD format
  const maxDateObj = new Date(today);
  maxDateObj.setMonth(maxDateObj.getMonth() + 6);
  const maxDate = maxDateObj.toISOString().split('T')[0];

  // ── Form ───────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit}>

      {/* Error banner */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* ===== Staff Section ===== */}
      <h3 className="mt-4 mb-3">Staff</h3>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label>Select Doctor</label>
          <select
            className="form-select"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            disabled={loadingDoctors}
            required
          >
            <option value="">
              {loadingDoctors ? "Loading doctors..." : "-- Select Doctor --"}
            </option>
            {doctors.map((doc) => (
              // doc._id  → Mongo ObjectId used as :id in all routes
              // doc.user.name → display name (user ref is populated)
              // doc.specialty → shown alongside name for clarity
              <option key={doc._id} value={doc._id}>
                {doc.user?.name} — {doc.specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== Time Section ===== */}
      <h3 className="mt-4 mb-3">Time</h3>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={minDate} // Restricts to today or later
            max={maxDate} // Restricts to 6 months from today
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label>Time</label>
          <select
            className="form-select"
            name="slotTime"
            value={formData.slotTime}
            onChange={handleChange}
            disabled={!formData.doctorId || !formData.date || loadingSlots}
            required
          >
            <option value="">
              {loadingSlots
                ? "Loading slots..."
                : !formData.doctorId || !formData.date
                ? "Select doctor & date first"
                : slots.length === 0
                ? "No available slots"
                : "-- Select Time --"}
            </option>
            {slots.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== Submit Button ===== */}
      <div className="mt-4">
        <button type="submit" className="btn-book" disabled={submitting}>
          {submitting ? "Booking..." : "Book Appointment"}
        </button>
      </div>

    </form>
  );
};

export default AppointmentForm;