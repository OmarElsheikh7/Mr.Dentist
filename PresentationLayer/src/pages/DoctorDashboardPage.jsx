import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../hooks/useDoctor"; 
import "./DoctorDashboardPage.css";

const DoctorDashboardPage = () => {
  const navigate = useNavigate();
  // Extract the new uploadProfilePicture function
  const { doctor, loading, error, getDashboardData, uploadProfilePicture } = useDoctor();
  
  // Local state for image uploading
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getDashboardData();
    }
  }, [getDashboardData, navigate]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    setIsUploadingImage(true);

    const result = await uploadProfilePicture(selectedImage);

    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setSelectedImage(null);
    } else {
      alert(result.error || "Failed to upload image");
    }
    
    setIsUploadingImage(false);
  };

  if (loading && !doctor) return <div className="doctor-loading">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!doctor) return null;

  const upcomingCount = doctor.appointments?.filter((a) => a.status === "Upcoming").length || 0;
  const avgRating = doctor.reviews?.length > 0
    ? (doctor.reviews.reduce((sum, r) => sum + r.rating, 0) / doctor.reviews.length).toFixed(1)
    : "N/A";

  return (
    <div className="doctor-dashboard">

      {/* Header with doctor info and stat boxes */}
      <div className="doctor-header">
        <div className="doctor-header-info">
          
          {/* --- NEW: Display Profile Picture --- */}
          <div className="doctor-profile-picture-container">
            <img 
              src={doctor.pictureUrl || "https://via.placeholder.com/150"} 
              alt="Doctor Profile" 
              className="doctor-avatar"
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>

          <p className="doctor-header-tag">{doctor.specialty}</p>
          <h1 className="doctor-header-name">Welcome, {doctor.name}</h1>
          <p className="doctor-header-desc">{doctor.description}</p>
        </div>

        {/* Quick stats summary */}
        <div className="doctor-stats">
          {/* ... (Keep your existing stats boxes here) ... */}
          <div className="stat-box">
            <span className="stat-number">{upcomingCount}</span>
            <span className="stat-label">Upcoming</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{doctor.appointments?.length || 0}</span>
            <span className="stat-label">Total Appointments</span>
          </div>
        </div>
      </div>

      {/* --- NEW: Upload Image Section --- */}
      <div className="doctor-section image-upload-section">
        <h2 className="section-title">Update Profile Picture</h2>
        {saveSuccess && <p className="success-message" style={{ color: "green" }}>Image updated successfully!</p>}
        
        <div className="upload-controls">
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
              className="action-btn primary"
              style={{ marginLeft: "10px" }}
            >
              {isUploadingImage ? "Uploading..." : "Upload Image"}
            </button>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="doctor-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-row">
          <button
            className="action-btn primary"
            onClick={() => navigate("/doctor/profile")}
          >
            My Profile
          </button>
        </div>
      </div>

      {/* ... (Keep your existing Details, Appointments, and Reviews sections here) ... */}
      
    </div>
  );
};

export default DoctorDashboardPage;