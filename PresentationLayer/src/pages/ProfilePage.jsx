import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ProfileCard from "../components/patients/ProfileCard";
import ProfileForm from "../components/patients/ProfileForm";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const navigate = useNavigate(); // Initialize navigation

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
        if (fetchedUser.phoneNumber) fetchedUser.phone = fetchedUser.phoneNumber;
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

  // --- NEW: Logout Function ---
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the user's storage session
    navigate("/login"); // Redirect to login
  };

  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (updatedData.phone) updatedData.phoneNumber = updatedData.phone;

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

      const res = await fetch("http://localhost:5000/api/auth/profile/upload-picture", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      
      const data = await res.json();

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setSelectedImage(null);
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

      <ProfileCard user={user} />

      <button
        className="profile-edit-toggle"
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