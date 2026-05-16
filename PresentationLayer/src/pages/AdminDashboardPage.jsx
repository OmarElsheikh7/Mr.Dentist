import React, { useState } from "react";
import "../assets/styles/AdminDashboardPage.css";

const AdminDashboardPage = () => {

  const [doctorData, setDoctorData] = useState({
    name: "",
    specialty: "",
    consultationFee: "",
    shiftTiming: "",
    branch: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const [doctors, setDoctors] = useState([
    {
      name: "Dr Ahmed",
      specialty: "Cardiology",
      consultationFee: 500,
      shiftTiming: "5 PM - 10 PM",
      branch: "Cairo",
    },
    {
      name: "Dr Sarah",
      specialty: "Dermatology",
      consultationFee: 400,
      shiftTiming: "3 PM - 8 PM",
      branch: "Giza",
    },
  ]);

  const handleChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update doctor
    if (editIndex !== null) {

      const updatedDoctors = [...doctors];

      updatedDoctors[editIndex] = doctorData;

      setDoctors(updatedDoctors);

      setEditIndex(null);

    } 
    
    // Create doctor
    else {

      setDoctors([...doctors, doctorData]);

    }

    // Reset form
    setDoctorData({
      name: "",
      specialty: "",
      consultationFee: "",
      shiftTiming: "",
      branch: "",
    });
  };

  const handleDelete = (index) => {

    const updatedDoctors = doctors.filter(
      (_, i) => i !== index
    );

    setDoctors(updatedDoctors);
  };

  const handleEdit = (index) => {

    setDoctorData(doctors[index]);

    setEditIndex(index);
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">

        <div>
          <h1 className="dashboard-welcome">
            Admin Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Manage doctors, schedules and branches
          </p>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">

          <div className="stat-box">
            <span className="stat-number">
              {doctors.length}
            </span>

            <span className="stat-label">
              Doctors
            </span>
          </div>

          <div className="stat-box">
            <span className="stat-number">
              5
            </span>

            <span className="stat-label">
              Branches
            </span>
          </div>

        </div>

      </div>

      {/* Form Section */}
      <div className="dashboard-section">

        <h2 className="section-title">

          {editIndex !== null
            ? "Edit Doctor"
            : "Register Doctor"}

        </h2>

        <form className="admin-form" onSubmit={handleSubmit}>

          <div className="form-grid">

            <input
              type="text"
              placeholder="Doctor Name"
              name="name"
              value={doctorData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Specialty"
              name="specialty"
              value={doctorData.specialty}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              placeholder="Consultation Fee"
              name="consultationFee"
              value={doctorData.consultationFee}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Shift Timing"
              name="shiftTiming"
              value={doctorData.shiftTiming}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Branch"
              name="branch"
              value={doctorData.branch}
              onChange={handleChange}
              required
            />

          </div>

          <button className="action-btn primary">

            {editIndex !== null
              ? "Update Doctor"
              : "Create Doctor"}

          </button>

        </form>

      </div>

      {/* Doctors Section */}
      <div className="dashboard-section">

        <h2 className="section-title">
          Doctors
        </h2>

        <div className="cards-grid">

          {doctors.map((doctor, index) => (

            <div className="doctor-card" key={index}>

              <div className="card-top">

                <span className="card-title">
                  {doctor.name}
                </span>

                <span className="status-badge upcoming">
                  {doctor.specialty}
                </span>

              </div>

              <p className="card-detail">
                Fee: {doctor.consultationFee} EGP
              </p>

              <p className="card-detail">
                Shift: {doctor.shiftTiming}
              </p>

              <p className="card-detail">
                Branch: {doctor.branch}
              </p>

              <div className="doctor-actions">

                <button
                  className="action-btn secondary"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>

                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboardPage;