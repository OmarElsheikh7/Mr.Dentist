import React, { useState } from 'react';
import "../assets/styles/AdminProfile.css";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Component State Initialization
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@system.com',
    adminId: '#ADM-9042',
    tier: 'Root Access',
    ipAddress: '192.168.1.45',
    description: 'Responsible for managing infrastructure deployments, global user privileges, system audit monitoring, and database core configurations.'
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
              <div className="profile-avatar-initials" style={{ fontSize: '2rem' }}>
                {getInitials(formData.name)}
              </div>
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
            <div className="profile-row">
              <span className="profile-label">Admin ID</span>
              <span className="profile-value">{formData.adminId}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">System Tier</span>
              <span className="profile-shift-badge">{formData.tier}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Last Login IP</span>
              <span className="profile-value">{formData.ipAddress}</span>
            </div>
            <div className="profile-row profile-row--description">
              <span className="profile-label">Administrative Scope Description</span>
              <span className="profile-value profile-value--description">
                {formData.description}
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
              <input type="file" accept="image/*" />
              <button type="button" className="upload-btn">Upload Avatar</button>
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
            <label className="form-label">Email Endpoint</label>
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
            <label className="form-label">Access Level Token</label>
            <input 
              type="text" 
              className="form-input disabled" 
              value="Super Admin Access (Read/Write/Execute)" 
              disabled 
            />
            <span className="form-hint">Security clearance tokens are managed only via Master Root controls.</span>
          </div>

          <div className="form-group">
            <label className="form-label">Scope & Access Directives</label>
            <textarea 
              className="form-input form-textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="form-submit">Save Configurations</button>
        </form>
      )}

    </div>
  );
}