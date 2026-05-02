import React, { useState } from "react";

const ProfileForm = ({ user, onUpdate }) => {
  // Guard: do not render if user data is not available yet
  if (!user) return null;

  // Local state for each editable field — pre-filled with current user data
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [phone, setPhone] = useState(user.phone);

  // Called when patient clicks Save — sends updated data up to ProfilePage
  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass updated fields back to ProfilePage, keep role unchanged
    onUpdate({ name, email, dateOfBirth, phone, role: user.role });
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>

      <h2 className="form-heading">Edit Profile</h2>

      {/* Name field */}
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email field */}
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Date of birth field */}
      <div className="form-group">
        <label className="form-label">Date of Birth</label>
        <input
          className="form-input"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>

      {/* Phone field */}
      <div className="form-group">
        <label className="form-label">Phone</label>
        <input
          className="form-input"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Role field — disabled because patient cannot change their role */}
      <div className="form-group">
        <label className="form-label">Role</label>
        <input
          className="form-input disabled"
          type="text"
          value={user.role}
          disabled
        />
        <span className="form-hint">Role cannot be changed</span>
      </div>

      {/* Submit button */}
      <button className="form-submit" type="submit">
        Save Changes
      </button>

    </form>
  );
};

export default ProfileForm;
