import AppointmentForm from "../components/appointments/AppointmentForm";
import "../assets/styles/appointmentform.css";

const AppointmentsPage = () => {
  return (
    <div className="appointment-page">

      {/* ✅ Header */}
      <div className="header">
        <div className="container">
          <h1>Appointment Form</h1>
          <p><span>Home</span> / Appointment Form</p>
        </div>
      </div>

      {/* ✅ Form - Full width, no gap */}
      <div className="form-section">
        <div className="container">
          <h2>Make an Appointment</h2>
          <AppointmentForm />
        </div>
      </div>

    </div>
  );
};

export default AppointmentsPage;