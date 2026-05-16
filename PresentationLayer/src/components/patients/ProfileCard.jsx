import React from "react";

const ProfileCard = ({ user }) => {
  // Guard: do not render if user data is not available yet
  if (!user) return null;

  return (
    <div className="profile-card">

      {/* Avatar Container */}
      <div className="profile-avatar-container">
        {/* CHANGED: Now looks for pictureUrl from your backend */}
        {user.pictureUrl ? (
          <img 
            src={user.pictureUrl} 
            alt={`${user.name}'s profile`} 
            className="profile-avatar-img" 
          />
        ) : (
          <div className="profile-avatar-initials">
            {/* Shows first letter of name if no picture exists */}
            {user.name ? user.name.charAt(0).toUpperCase() : "?"}
          </div>
        )}
      </div>
      
      {/* Patient name and role badge */}
      <div className="profile-card-header">
        <h2 className="profile-name">{user.name}</h2>
        <span className="profile-role-badge">{user.role}</span>
      </div>

      {/* All profile detail rows */}
      <div className="profile-details">

        <div className="profile-row">
          <span className="profile-label">Email</span>
          <span className="profile-value">{user.email}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Phone</span>
          <span className="profile-value">{user.phone}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Date of Birth</span>
          <span className="profile-value">{user.dateOfBirth}</span>
        </div>

        <div className="profile-row">
          <span className="profile-label">Role</span>
          {/* Role is read-only — patient cannot change this */}
          <span className="profile-value">{user.role}</span>
        </div>

      </div>
    </div>
  );
};

export default ProfileCard;