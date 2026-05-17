import React, { useEffect, useState } from "react";
import "../assets/styles/AdminDashboardPage.css";

const BASE_URL = "http://localhost:5000/api/doctors";

const AdminDashboardPage = () => {

  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    specialty: "",
    consultationFee: "",
    description: "",
    shiftID: "",
    branchId: "",
    gender: "",
    dateofBirth: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [editId, setEditId] = useState(null);

  // FETCH ALL DOCTORS
  const fetchDoctors = async () => {
    try {

      const response = await fetch(BASE_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setDoctors(data.data);

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // HANDLE INPUT CHANGE
  
  const handleChange = (e) => {

    const { name, value } = e.target;

   setDoctorData({
    ...doctorData,

    [name]:
      name === "shiftID"
        ? Number(value)
        : value,
     });

      };

  
  // CREATE / UPDATE DOCTOR

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const url = editId
        ? `${BASE_URL}/${editId}`
        : BASE_URL;

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(doctorData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert(
        editId
          ? "Doctor updated successfully"
          : "Doctor created successfully"
      );

      fetchDoctors();

      setDoctorData({
        name: "",
        email: "",
        password: "",
        specialty: "",
        consultationFee: "",
        description: "",
        shiftID: "",
        branchId: "",
        gender: "",
        dateofBirth: "",
      });

      setEditId(null);

    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

 
  // DELETE DOCTOR

  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Doctor deleted successfully");

      fetchDoctors();

    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

 
  // Edit doctor
  const handleEdit = (doctor) => {

    setDoctorData({
      name: doctor.userId?.name || "",
      email: doctor.userId?.email || "",
      password: "",
      specialty: doctor.specialty || "",
      consultationFee: doctor.consultationFee || "",
      description: doctor.description || "",
      shiftID: doctor.shiftID || "",
      branchId: doctor.branchId || "",
      gender: doctor.userId?.gender || "",
      dateofBirth: doctor.userId?.dateofBirth?.split("T")[0] || "",
    });

    setEditId(doctor._id);
  };

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">

        <div>
          <h1 className="dashboard-welcome">
            Admin Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Manage Doctors
          </p>
        </div>

        <div className="dashboard-stats">

          <div className="stat-box">
            <span className="stat-number">
              {doctors.length}
            </span>

            <span className="stat-label">
              Doctors
            </span>
          </div>

        </div>

      </div>

      {/* FORM */}
      <div className="dashboard-section">

        <h2 className="section-title">
          {editId ? "Update Doctor" : "Create Doctor"}
        </h2>

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <input
              type="text"
              name="name"
              placeholder="Doctor Name"
              value={doctorData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={doctorData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={doctorData.password}
              onChange={handleChange}
              required={!editId}
            />

            <input
              type="text"
              name="specialty"
              placeholder="Specialty"
              value={doctorData.specialty}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="consultationFee"
              placeholder="Consultation Fee"
              value={doctorData.consultationFee}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={doctorData.description}
              onChange={handleChange}
            />

            <input
              type="text"
              name="shiftID"
              placeholder="Shift ID"
              value={doctorData.shiftID}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="branchId"
              placeholder="Branch ID"
              value={doctorData.branchId}
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              value={doctorData.gender}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Gender
              </option>

              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>
            </select>

            <input
              type="date"
              name="dateofBirth"
              value={doctorData.dateofBirth}
              onChange={handleChange}
              required
            />

          </div>

          <button className="action-btn primary">
            {editId
              ? "Update Doctor"
              : "Create Doctor"}
          </button>

        </form>

      </div>

      {/* DOCTORS */}
      <div className="dashboard-section">

        <h2 className="section-title">
          Doctors
        </h2>

        <div className="cards-grid">

          {doctors.map((doctor) => (

            <div
              className="doctor-card"
              key={doctor._id}
            >

              <div className="card-top">

                <span className="card-title">
                  {doctor.userId?.name}
                </span>

                <span className="status-badge upcoming">
                  {doctor.specialty}
                </span>

              </div>

              <p className="card-detail">
                Fee: {doctor.consultationFee} EGP
              </p>

              <p className="card-detail">
                Email: {doctor.userId?.email}
              </p>

              <p className="card-detail">
                Gender: {doctor.userId?.gender}
              </p>

              <div className="doctor-actions">

                <button
                  className="action-btn secondary"
                  onClick={() => handleEdit(doctor)}
                >
                  Edit
                </button>

                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(doctor._id)}
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