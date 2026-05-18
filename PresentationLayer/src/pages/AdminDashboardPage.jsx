import React, { useEffect, useState } from "react";
import "../assets/styles/AdminDashboardPage.css";
import { useNavigate } from "react-router-dom";


const BASE_URL = "http://localhost:5000/api/doctors";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
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

  // DYNAMIC BRANCHES
  const [branches, setBranches] = useState([]);

  const [editId, setEditId] = useState(null);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const doctorsPerPage = 8;

 
  // FETCH DOCTORS
 

  const fetchDoctors = async () => {

    try {

      const response = await fetch(BASE_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setDoctors(data.data || []);

    } catch (error) {

      console.error(error.message);

    }

  };

  
  // FETCH BRANCHES
  

 const fetchBranches = async () => {
    try {
      const token = localStorage.getItem("token"); // 1. Get the token

      const response = await fetch("http://localhost:5000/api/clinicBranches", {
        headers: {
          "Authorization": `Bearer ${token}`, // 2. Attach the token
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch branches");
      }

      setBranches(Array.isArray(data.data) ? data.data : []);

    } catch (error) {
      console.error("Error fetching branches:", error.message);
    }
  };

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchDoctors();
    fetchBranches();

  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

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

      const method = editId
        ? "PUT"
        : "POST";

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

      // RESET FORM
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

  // EDIT DOCTOR
 

  const handleEdit = (doctor) => {

    setDoctorData({
      name: doctor.user.name || "",
      email: doctor.user.email || "",
      password: "",
      specialty: doctor.specialty || "",
      consultationFee: doctor.consultationFee || "",
      description: doctor.description || "",
      shiftID: doctor.shiftID ?? "",
      branchId: doctor.branchId ?? "",
      gender: doctor.user.gender || "",
      dateofBirth:
        doctor.user.dateofBirth
          ?.split("T")[0] || "",
    });

    setEditId(doctor._id);

  };

  // =========================
  // PAGINATION LOGIC
  // =========================

  const indexOfLastDoctor =
    currentPage * doctorsPerPage;

  const indexOfFirstDoctor =
    indexOfLastDoctor - doctorsPerPage;

  const currentDoctors = doctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const totalPages = Math.ceil(
    doctors.length / doctorsPerPage
  );

  return (
    
    <div className="dashboard">

      {/* HEADER WITH NEW PROFILE BUTTON LINK */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-welcome">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage Doctors</p>
        </div>

        <div className="dashboard-header-actions">
          <button 
            type="button" 
            className="dashboard-profile-btn"
            onClick={() => navigate("/admin-profile")}
          >
            Go to Profile
          </button>

          <div className="dashboard-stats">
            <div className="stat-box">
              <span className="stat-number">{doctors.length}</span>
              <span className="stat-label">Doctors</span>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="dashboard-section">
        <h2 className="section-title">
          {editId ? "Update Doctor" : "Create Doctor"}
        </h2>

        <form className="admin-form" onSubmit={handleSubmit}>
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

            <select
              name="shiftID"
              value={doctorData.shiftID}
              onChange={handleChange}
              required
            >

               <option value="" disabled hidden>
                Select Shift
              </option>

              <option value={0}>Morning (08:00 - 16:00)</option>

              <option value={1}>Afternoon (16:00 - 00:00)</option>

              <option value={2}>Night (00:00 - 08:00)</option>
            </select>

            {/* DYNAMIC BRANCHES */}
            <select
              name="branchId"
              value={doctorData.branchId}
              onChange={handleChange}
              required
            >
              {/* Add disabled and optionally hidden here */}
              <option value="" disabled hidden>
                Select Branch
              </option>

              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.address.toString()}
                </option>
              ))}
            </select>

            <select
              name="gender"
              value={doctorData.gender}
              onChange={handleChange}
              required
            >
               <option value="" disabled hidden>
                Select Gender
              </option>


              <option value="male">Male</option>

              <option value="female">Female</option>
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
            {editId ? "Update Doctor" : "Create Doctor"}
          </button>
        </form>
      </div>

      {/* DOCTORS TABLE */}
      <div className="dashboard-section">
        <h2 className="section-title">Doctors</h2>

        <div className="table-wrapper">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Email</th>
                <th>Fee</th>
                <th>Gender</th>
                <th>Shift</th>
                <th>Branch</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentDoctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.user.name}</td>

                  <td>
                    <span className="status-badge upcoming">
                      {doctor.specialty}
                    </span>
                  </td>

                  <td>{doctor.user.email}</td>

                  <td>{doctor.consultationFee} EGP</td>

                  <td>{doctor.user.gender}</td>

                  <td>
                    {doctor.shiftID === 0
                      ? "Morning"
                      : doctor.shiftID === 1
                        ? "Afternoon"
                        : "Night"}
                  </td>

                  <td>
                    {branches.find(
                      (branch) =>
                        String(branch._id) === String(doctor.branchId),
                    )?.address || "Unknown"}
                  </td>

                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1 ? "page-btn active" : "page-btn"
              }
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

};

export default AdminDashboardPage;