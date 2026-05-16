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

  // --- NEW: State for Profile Picture Upload ---
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Fetch user profile from API when page loads
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (res.ok && data.data) {
        const fetchedUser = data.data;
        // Map backend phoneNumber to what frontend expects (phone)
        if (fetchedUser.phoneNumber) {
            fetchedUser.phone = fetchedUser.phoneNumber;
        }
        // Format date for the input field
        if (fetchedUser.dateofBirth) {
             fetchedUser.dateOfBirth = new Date(fetchedUser.dateofBirth).toISOString().split('T')[0];
        }
        setUser(fetchedUser);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Called when patient submits the edit form
  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      
      // Map phone to phoneNumber for backend
      if (updatedData.phone) {
         updatedData.phoneNumber = updatedData.phone;
      }

      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      const data = await res.json();
      
      if (res.ok) {
        const fetchedUser = data.data;
        if (fetchedUser.phoneNumber) fetchedUser.phone = fetchedUser.phoneNumber;
        if (fetchedUser.dateofBirth) fetchedUser.dateOfBirth = new Date(fetchedUser.dateofBirth).toISOString().split('T')[0];
        
        setUser(fetchedUser);
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile");
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
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profilePicture", selectedImage);

      // NOTE: You will need to make sure this endpoint matches your backend route
      const res = await fetch("http://localhost:5000/api/auth/profile/upload-picture", {
        method: "PUT", // or POST, depending on your backend
        headers: { 
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await res.json();

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setSelectedImage(null);
        // Re-fetch the profile to get the updated image URL from the backend
        fetchProfile(); 
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error uploading image");
    } finally {
      setIsUploadingImage(false);
    }
  };

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
        onClick={() => {
          setIsEditing(!isEditing);
          setSelectedImage(null); // Clear selected image on cancel
        }}
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>

      {/* Edit form — only visible when isEditing is true */}
      {isEditing && (
        <div className="profile-edit-section">
          {/* Profile Picture Upload Section */}
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

          {/* Key added to ensure the form re-renders fully when data updates */}
          <ProfileForm 
            key={user?._id || "patient-form"} 
            user={user} 
            onUpdate={handleUpdate} 
          />
        </div>
      )}

    </div>
  );
};

export default ProfilePage;