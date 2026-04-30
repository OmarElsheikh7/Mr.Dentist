import DoctorList from "../components/doctors/DoctorList";
import "../assets/styles/Doctor.css";

const DoctorsPage = () => {
  return (
    <div className="doctors-page">

      {/* Header */}
      <div className="header">
        <div className="container">
          <h1>Doctors</h1>
          <p><span>Home</span> / Doctors</p>
        </div>
      </div>

      {/* Doctor Component */}
      <DoctorList />

    </div>
  );
};

export default DoctorsPage;

