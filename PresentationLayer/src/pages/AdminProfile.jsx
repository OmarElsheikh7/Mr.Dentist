import React, { useState } from 'react';
import "../assets/styles/AdminProfile.css";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Image Upload States
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  
  // Component State Initialization
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    Phone: '123-456-7890'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setShowSuccess(true);
    
    // Dissolve notice alert after 3.5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3500);
  };

  // Safe initial generator fallback logic strings
  const getInitials = (fullName) => {
    if (!fullName) return 'AD';
    return fullName
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
      // Mocking an upload delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Creating a local URL to preview the selected image
      const imageUrl = URL.createObjectURL(selectedImage);
      setProfileImageUrl(imageUrl);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setSelectedImage(null);
    } catch (err) {
      console.error("Failed to upload image", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="profile-page">
      
      {/* Top Banner Control Section */}
      <div className="profile-header-container">
        <h1 className="profile-heading">Admin Control Panel</h1>
        <button 
          type="button"
          className="profile-logout-btn" 
          onClick={() => alert('Terminating session protocols...')}
        >
          Log Out
        </button>
      </div>

      {/* State Submission Notification Banner */}
      {showSuccess && (
        <div className="profile-success">
          Admin configuration updated successfully.
        </div>
      )}

      {/* ── READ STATE VIEW ── */}
      {!isEditing && (
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-avatar-container" style={{ margin: 0, width: '80px', height: '80px' }}>
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile" className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar-initials" style={{ fontSize: '2rem' }}>
                  {getInitials(formData.name)}
                </div>
              )}
            </div>
            <div>
              <h2 className="profile-name">{formData.name}</h2>
              <span className="profile-role-badge">Super Admin</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="profile-row">
              <span className="profile-label">Email Address</span>
              <span className="profile-value">{formData.email}</span>
            </div>
        
            <div className="profile-row profile-row--description">
              <span className="profile-label">Phone</span>
              <span className="profile-value profile-value--description">
                {formData.Phone}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* State Router Modifier Trigger Button */}
      <button 
        type="button"
        className="profile-edit-toggle" 
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Cancel Modifications" : "Edit Administrative Settings"}
      </button>

      {/* ── WRITE/EDIT STATE CONFIGURATION FORM ── */}
      {isEditing && (
        <form className="profile-form" onSubmit={handleFormSubmit}>
          <h3 className="form-heading">Account & System Configurations</h3>
          
          <div className="profile-edit-section">
            <div className="profile-picture-upload">
              <h3>Update Profile Image</h3>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                disabled={isUploadingImage}
              />
              {selectedImage && (
                <button 
                  type="button" 
                  className="upload-btn" 
                  onClick={handleImageUpload}
                  disabled={isUploadingImage}
                  style={{ marginTop: '10px' }}
                >
                  {isUploadingImage ? "Uploading..." : "Upload Avatar"}
                </button>
              )}
              {saveSuccess && <p style={{ color: '#16a34a', margin: '8px 0 0', fontSize: '0.9rem' }}>Image updated successfully!</p>}
            </div>
          </div>
          
          <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '20px 0' }} />

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              name="name"
              value={formData.name} 
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              name="email"
              value={formData.email} 
              onChange={handleInputChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-input" 
              name="Phone"
              value={formData.Phone} 
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="form-submit">Save Configurations</button>
        </form>
      )}

    </div>
  );
}