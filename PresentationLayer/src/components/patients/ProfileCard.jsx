import React from "react";

const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {user.dateOfBirth}</p>
      <p>Phone: {user.phone}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default ProfileCard;