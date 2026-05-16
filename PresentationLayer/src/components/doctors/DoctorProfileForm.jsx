import React, { useState, useEffect } from "react";


const DoctorProfileForm = ({ doctor, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: doctor.name || "",
    email: doctor.email || "",
    phone: doctor.phone || "",
    dateOfBirth: doctor.dateOfBirth || "",
    description: doctor.description || "",
  });
useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || doctor.user?.name || "",
        email: doctor.email || doctor.user?.email || "",
        phone: doctor.phone || "",
        dateOfBirth: doctor.dateOfBirth ? doctor.dateOfBirth.split('T')[0] : "",
        description: doctor.description || "",
      });
    }
  }, [doctor]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2 className="form-heading">Edit Profile</h2>

      {/* ── Editable Fields ── */}

      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          className="form-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      
      <div className="form-group">
        <label className="form-label">Description / Bio</label>
        <textarea
          className="form-input form-textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Brief description of your specialization and experience..."
        />
      </div>

      {/* ── Read-only Fields (Admin Controlled) ── */}

      <div className="form-group">
        <label className="form-label">Shift Start</label>
        <input
          className="form-input disabled"
          type="time"
          value={doctor.shiftStart}
          readOnly
        />
        <span className="form-hint">⚙ Shift times can only be changed by the admin.</span>
      </div>

      <div className="form-group">
        <label className="form-label">Shift End</label>
        <input
          className="form-input disabled"
          type="time"
          value={doctor.shiftEnd}
          readOnly
        />
      </div>

      {/* ── Role Field ── */}

      <div className="form-group">
        <label className="form-label">Role</label>
        <input
          className="form-input disabled"
          type="text"
          value={doctor.role}
          readOnly
        />
        <span className="form-hint">⚙ Role cannot be changed.</span>
      </div>

      <button type="submit" className="form-submit">
        Save Changes
      </button>
    </form>
  );
};

export default DoctorProfileForm;