import React, { useState, useEffect } from "react";
import ProfileCard from "../components/patients/ProfileCard";
import ProfileForm from "../components/patients/ProfileForm";
import "./ProfilePage.css";

const ProfilePage = () => {
  // Holds the user data shown on the page
  const [user, setUser] = useState(null);

  // Controls whether the edit form is visible or hidden
  const [isEditing, setIsEditing] = useState(false);

  // Shows a success message after saving
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Tracks loading state while fetching from API
  const [loading, setLoading] = useState(true);

  // Fetch user profile from API when page loads
  useEffect(() => {
    // TODO: replace this with real API call when backend is ready
    // Example of how it will look:
    // const token = localStorage.getItem("token");
    // const res = await fetch("/api/profile", {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // const data = await res.json();
    // setUser(data);

    // Hardcoded data for now — remove this block when API is connected
    setTimeout(() => {
      setUser({
        name: "John Doe",
        email: "john@example.com",
        dateOfBirth: "1995-06-15",
        phone: "01012345678",
        role: "patient",
      });
      setLoading(false);
    }, 500);
  }, []);

  // Called when patient submits the edit form
  const handleUpdate = (updatedData) => {
    // TODO: replace with real API call when backend is ready
    // Example:
    // await fetch("/api/profile", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedData)
    // });

    // Update local state with new data
    setUser(updatedData);

    // Hide the form and show success message
    setIsEditing(false);
    setSaveSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Show loading state while fetching data
  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">

      {/* Page title */}
      <h1 className="profile-heading">My Profile</h1>

      {/* Success message — only visible after saving changes */}
      {saveSuccess && (
        <div className="profile-success">
          Profile updated successfully.
        </div>
      )}

      {/* User info display — always visible */}
      <ProfileCard user={user} />

      {/* Toggle button: switches between Edit and Cancel */}
      <button
        className="profile-edit-toggle"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>

      {/* Edit form — only visible when isEditing is true */}
      {isEditing && (
        <ProfileForm user={user} onUpdate={handleUpdate} />
      )}

    </div>
  );
};

export default ProfilePage;
