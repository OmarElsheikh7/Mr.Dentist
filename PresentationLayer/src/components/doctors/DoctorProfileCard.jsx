import React from "react";

const DoctorProfileCard = ({ doctor }) => {
  // Guard: do not render if doctor data is not available yet
  if (!doctor) return null;

  // Helper function to format shift timing
  // Converts "09:00" and "17:00" into "09:00 → 17:00"
  const formatShift = (start, end) => {
    if (!start || !end) return "Not assigned yet";
    return `${start} → ${end}`;
  };

  return (
    <div className="profile-card">

      {/* Avatar placeholder — replace div with <img> when photo upload is added */}
      <div className="profile-avatar">
        {/* Shows first letter of name as avatar */}
        {doctor.name.charAt(0)}
      </div>

      {/* Doctor name and role badge */}
      <div className="profile-card-header">
        <h2 className="profile-name">{doctor.name}</h2>
        <span className="profile-role-badge">{doctor.role}</span>
      </div>

      {/* All profile detail rows */}
      <div className="profile-details">

        <div className="profile-row">
          <span className="profile-label">Email</span>
          <span className="profile-value">{doctor.email}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Phone</span>
          <span className="profile-value">{doctor.phone}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Date of Birth</span>
          <span className="profile-value">{doctor.dateOfBirth}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Role</span>
          {/* Role is read-only — doctor cannot change this */}
          <span className="profile-value">{doctor.role}</span>
        </div>

        {/* Description row — has its own special class because
            the text is long and needs to stack vertically */}
        <div className="profile-row profile-row--description">
          <span className="profile-label">Description</span>
          <span className="profile-value profile-value--description">
            {/* Fallback text if doctor hasn't added a bio yet */}
            {doctor.description || "No description added yet."}
          </span>
        </div>

        {/* Shift row — read-only, managed by admin only */}
        <div className="profile-row">
          <span className="profile-label">Shift Timing</span>
          {/* Badge style to make it visually distinct from regular text */}
          <span className="profile-shift-badge">
            {formatShift(doctor.shiftStart, doctor.shiftEnd)}
          </span>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfileCard;