import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DoctorProfileCard from "../components/doctors/DoctorProfileCard";
import DoctorProfileForm from "../components/doctors/DoctorProfileForm";
import { useDoctor } from "../hooks/useDoctor";
import "../assets/styles/DoctorProfilePage.css";

const DoctorProfilePage = () => {
  const { doctor, loading, error, getProfileData, updateProfile, uploadProfilePicture } = useDoctor();
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  const handleUpdate = async (updatedData) => {
    const result = await updateProfile(updatedData);
    if (result && result.success) {
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      getProfileData(); 
    }
  };

  // --- NEW: Logout Function ---
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the authentication token
    navigate("/login"); // Redirect to the login page (or "/" if your login is at root)
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    
    setIsUploadingImage(true);
    try {
      // FIX: useDoctor's uploadProfilePicture already creates the FormData.
      // We pass 'selectedImage' directly instead of wrapping it in FormData again.
      const result = await uploadProfilePicture(selectedImage);
      
      if (result && result.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setSelectedImage(null);
        getProfileData(); // Fetch fresh data to ensure UI syncs perfectly
      }
    } catch (err) {
      console.error("Failed to upload image", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-error">Error loading profile: {error}</div>;
  }

  if (!doctor) {
    return <div className="profile-error">No doctor profile found.</div>;
  }

  return (
    <div className="profile-page">
      {/* Top section containing header and logout action wrapper */}
      <div className="profile-header-container">
        <h1 className="profile-heading">My Profile</h1>
        <button className="profile-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {saveSuccess && (
        <div className="profile-success">
          Profile updated successfully.
        </div>
      )}

      <DoctorProfileCard doctor={doctor} />

      <button
        className={`profile-edit-toggle ${isEditing ? "cancel-btn" : ""}`}
        onClick={() => {
          setIsEditing(!isEditing);
          setSelectedImage(null);
        }}
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>

      {isEditing && (
        <div className="profile-edit-section">
          <div className="profile-picture-upload">
            <h3>Update Profile Picture</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              disabled={isUploadingImage}
            />
            {selectedImage && (
              <button 
                onClick={handleImageUpload} 
                disabled={isUploadingImage}
                className="upload-btn"
              >
                {isUploadingImage ? "Uploading..." : "Upload Image"}
              </button>
            )}
          </div>
          <hr />

          <DoctorProfileForm 
            key={doctor._id || "doctor-form"} 
            doctor={doctor} 
            onUpdate={handleUpdate} 
          />
        </div>
      )}
    </div>
  );
};

export default DoctorProfilePage;