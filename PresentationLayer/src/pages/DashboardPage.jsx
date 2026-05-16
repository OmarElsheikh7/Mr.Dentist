import React from "react";
import PatientDashboardPage from "./PatientDashboardPage";
import DoctorDashboardPage from "./DoctorDashboardPage";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
 
  const role = localStorage.getItem("role");

  
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