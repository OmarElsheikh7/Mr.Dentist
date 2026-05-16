import React from "react";
import PatientDashboardPage from "./PatientDashboardPage";
import DoctorDashboardPage from "./DoctorDashboardPage";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  // Pull the actual role saved during login
  const role = localStorage.getItem("role");

  // Handle cases where the user isn't logged in
  if (!role) {
    return <Navigate to="/login" />;
  }

  if (role === "doctor") {
    return <DoctorDashboardPage />;
  } 
  
  if (role === "patient") {
    return <PatientDashboardPage />;
  }

  if (role === "admin") {
    return <AdminDashboardPage/>;
  }

  // Fallback if role is unknown
  return <Navigate to="/login" />;
};

export default DashboardPage;