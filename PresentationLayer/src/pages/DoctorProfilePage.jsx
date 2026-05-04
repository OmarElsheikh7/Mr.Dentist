import React, { useState, useEffect } from "react";
import DoctorProfileCard from "../components/doctors/DoctorProfileCard";
import DoctorProfileForm from "../components/doctors/DoctorProfileForm";
import "../assets/styles/DoctorProfilePage.css";

const DoctorProfilePage = () => {
  const [doctor, setDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch doctor profile from API when page loads
  useEffect(() => {
    // TODO: replace this with real API call when backend is ready
    // Example of how it will look:
    // const token = localStorage.getItem("token");
    // const res = await fetch("/api/doctor/profile", {
    //   headers: { Authorization: `Bearer ${token}` }
    // });
    // const data = await res.json();
    // setDoctor(data);

    // Hardcoded data for now — remove this block when API is connected
    setTimeout(() => {
      setDoctor({
        name: "Dr. Sarah Ahmed",
        email: "sarah.ahmed@clinic.com",
        dateOfBirth: "1988-03-22",
        phone: "01098765432",
        role: "doctor",
        description: "Specialist in orthodontics and cosmetic dentistry with over 10 years of experience.",
        // Read-only — managed by admin only
        shiftStart: "09:00",
        shiftEnd: "17:00",
      });
      setLoading(false);
    }, 500);
  }, []);

  const handleUpdate = (updatedData) => {
    // TODO: replace with real API call when backend is ready
    // Example:
    // await fetch("/api/doctor/profile", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(updatedData)
    // });

    // Merge updated fields with existing data
    // shiftStart and shiftEnd are preserved as-is since doctor cannot edit them
    setDoctor((prev) => ({ ...prev, ...updatedData }));

    setIsEditing(false);
    setSaveSuccess(true);

    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">

      <h1 className="profile-heading">My Profile</h1>

      {saveSuccess && (
        <div className="profile-success">
          Profile updated successfully.
        </div>
      )}

      <DoctorProfileCard doctor={doctor} />

      
      <button
        className="profile-edit-toggle"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>

      {isEditing && (
        <DoctorProfileForm doctor={doctor} onUpdate={handleUpdate} />
      )}

    </div>
  );
};

export default DoctorProfilePage;