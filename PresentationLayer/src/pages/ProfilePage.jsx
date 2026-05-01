import React, { useState } from "react";
import ProfileCard from "../components/patients/ProfileCard";
import ProfileForm from "../components/patients/ProfileForm";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    dateOfBirth: "1995-06-15",
    phone: "01012345678",
    role: "patient", // read-only
  });

  const handleUpdate = (updatedData) => {
    setUser(updatedData);
  };

  return (
    <div>
      <h1>My Profile</h1>
      <ProfileCard user={user} />
      <ProfileForm user={user} onUpdate={handleUpdate} />
    </div>
  );
};

export default ProfilePage;