import React from "react";
import PatientDashboardPage from "./PatientDashboardPage";
import DoctorDashboardPage from "./DoctorDashboardPage";

const DashboardPage = () => {
  const role = "Patient";  

  if (role === "doctor") return <DoctorDashboardPage />;
  return <PatientDashboardPage />;
};

export default DashboardPage;