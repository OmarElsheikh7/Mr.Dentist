import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  const handleUpdate = async (updatedData) => {
    const result = await updateProfile(updatedData);
    if (result) {
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      getProfileData(); 
    }
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
      const formData = new FormData();
      formData.append("profilePicture", selectedImage);
      
      const result = await uploadProfilePicture(formData);
      
      if (result) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setSelectedImage(null); 
        getProfileData(); 
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
      <h1 className="profile-heading">My Profile</h1>

      {saveSuccess && (
        <div className="profile-success">
          Profile updated successfully.
        </div>
      )}

      {/* The Card always shows the most recent data */}
      <DoctorProfileCard doctor={doctor} />

      <button
        className={`profile-edit-toggle ${isEditing ? "cancel-btn" : ""}`}
        onClick={() => {
          setIsEditing(!isEditing);
          setSelectedImage(null); // Clear selected image if they cancel editing
        }}
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>

      {isEditing && (
        <div className="profile-edit-section">
          {/* --- NEW: Profile Picture Upload Section --- */}
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

          /* CRITICAL FIX: Adding key={doctor._id} ensures that when the 
             doctor data is loaded, the form re-renders and populates 
             the fields correctly instead of staying blank.
          */
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