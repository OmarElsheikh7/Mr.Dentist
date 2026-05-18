import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../hooks/useDoctor"; // Adjust this path if your hooks folder is located elsewhere
import "./LandingPage.css";
import projectLogo from '../pages/projectlogo.png';

const services = [
  { id: 1, title: "General Dentistry", desc: "Routine checkups, cleanings, and fillings to keep your smile healthy." },
  { id: 2, title: "Teeth Whitening", desc: "Professional whitening treatments to brighten your smile instantly." },
  { id: 3, title: "Orthodontics", desc: "Braces and aligners to straighten teeth for all ages." },
  { id: 4, title: "Dental Implants", desc: "Permanent solutions for missing teeth with a natural look and feel." }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Initialize the updated custom hook
  const { 
    doctorsList, 
    branchesList, 
    loading, 
    getAllDoctors, 
    getAllBranches 
  } = useDoctor();

  // Fetch data dynamically from the MongoDB database when the page mounts
  useEffect(() => {
    getAllDoctors();
    getAllBranches();
  }, [getAllDoctors, getAllBranches]);

  // Check if user is logged in (will come from AuthContext later)
  const isLoggedIn = false;

  const handleProtectedAction = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Helper mapping to translate numeric DB shiftIDs to clean user strings
  const mapShift = (shiftID) => {
    switch(shiftID) {
      case 0: return "Morning Shift (9AM - 3PM)";
      case 1: return "Evening Shift (3PM - 9PM)";
      case 2: return "Night Shift (9PM - 3AM)";
      default: return "Flexible Shift";
    }
  };

  return (
    <div className="landing">

      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <img src={projectLogo} alt="Mr. Dentist" className="logo-img" />
            <span className="logo-text"> Mr. Dentist</span>
          </div>

          <ul className="nav-links">
            <li><button onClick={() => scrollTo("services")}>Services</button></li>
            <li><button onClick={() => scrollTo("doctors")}>Doctors</button></li>
            <li><button onClick={() => scrollTo("branches")}>Branches</button></li>
            <li><button onClick={() => scrollTo("about")}>About</button></li>
            <li>
              <button
                className="nav-protected"
                onClick={() => handleProtectedAction("/appointments")}
              >
                Book Appointment
              </button>
            </li>
          </ul>

          <div className="nav-auth">
            <button className="btn-outline" onClick={() => navigate("/login")}>Login</button>
            <button className="btn-solid" onClick={() => navigate("/register")}>Register</button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("doctors")}>Doctors</button>
            <button onClick={() => scrollTo("branches")}>Branches</button>
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => handleProtectedAction("/appointments")}>Book Appointment</button>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        )}
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">Welcome to Mr. Dentist</p>
          <h1 className="hero-title">Crafting Confident Smiles <span>With Precision</span></h1>
          <p className="hero-subtitle">
            Experience world-class dental care. Where advanced technology meets unparalleled expertise to give you the perfect smile you deserve.
          </p>
          <div className="hero-actions">
            <button className="btn-solid large" onClick={() => handleProtectedAction("/appointments")}>
              Book an Appointment
            </button>
            <button className="btn-outline large" onClick={() => scrollTo("services")}>
              Explore Services
            </button>
          </div>
          <p className="hero-note">Login required to book appointments or write reviews</p>
        </div>

        <div className="hero-image-container">
          <img src={projectLogo} alt="Mr. Dentist Hero" className="hero-img" />
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-inner">
          <h2 className="section-heading">Premium Dental Services</h2>
          <p className="section-sub">Comprehensive, state-of-the-art treatments for a flawless smile</p>
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.id}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section grey" id="doctors">
        <div className="section-inner">
          <h2 className="section-heading">Meet Our Specialists</h2>
          <p className="section-sub">World-class professionals committed to your care</p>
          <div className="doctors-grid">
            {loading ? (
              <p>Loading real-time doctor listings...</p>
            ) : doctorsList.length > 0 ? (
              doctorsList.map((doc) => (
                <div className="doctor-card" key={doc._id}>
                  <div className="doctor-avatar"></div>
                  {/* Safely accesses the populated user account object, fallback to specialty label */}
                  <h3 className="doctor-name">
                    {doc.user && doc.user.name ? `Dr. ${doc.user.name}` : `Specialist Doctor`}
                  </h3>
                  <p className="doctor-specialty">{doc.specialty}</p>
                  <div className="doctor-details">
                    <p>{mapShift(doc.shiftID)}</p>
                    <p>{doc.consultationFee} EGP / session</p>
                  </div>
                  <button
                    className="btn-solid full"
                    onClick={() => handleProtectedAction("/appointments")}
                  >
                    Book with This Specialist
                  </button>
                </div>
              ))
            ) : (
              <p>No specialist listings available right now.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section" id="branches">
        <div className="section-inner">
          <h2 className="section-heading">Clinic Locations</h2>
          <p className="section-sub">Luxurious and modern facilities across Egypt</p>
          <div className="branches-grid">
            {loading ? (
              <p>Loading closest clinic branches...</p>
            ) : branchesList.length > 0 ? (
              branchesList.map((b) => (
                <div className="branch-card" key={b._id}>
                  {/* Parses the address field to split a major city flag from full location descriptors */}
                  <h3 className="branch-city">
                    {b.address.includes(",") ? b.address.split(",").pop().trim() : "Clinic Location"}
                  </h3>
                  <p><strong>Address:</strong> {b.address}</p>
                  <p><strong>Phone:</strong> {b.phoneNumber || "No contact line available"}</p>
                </div>
              ))
            ) : (
              <p>No clinics are active at this moment.</p>
            )}
          </div>
        </div>
      </section>

      <section className="section grey" id="about">
        <div className="section-inner about-inner">
          <div className="about-text">
            <h2 className="section-heading left">The Mr. Dentist Experience</h2>
            <p>
              Founded in 2005, Mr. Dentist started as a single clinic in Cairo with a
              simple mission to make high-quality dental care accessible to everyone.
            </p>
            <p>
              Over the years we have grown to multiple branches across Egypt, a team of
              top tier specialist doctors, and tens of thousands of happy patients.
            </p>
            <p>
              You are always in safe hands with Mr.Dentist.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <span className="stat-big">{doctorsList.length || "20+"}</span>
                <span>Specialist Doctors</span>
              </div>
              <div className="about-stat">
                <span className="stat-big">{branchesList.length || "3"}</span>
                <span>Active Branches</span>
              </div>
              <div className="about-stat">
                <span className="stat-big">50k+</span>
                <span>Happy Patients</span>
              </div>
            </div>
          </div>
          <div className="about-image-placeholder">
            <div className="about-img-box" style={{ background: 'transparent' }}>
              <img 
                src={projectLogo} 
                alt="Logo" 
                style={{ width: '300px', height: 'auto', objectFit: 'contain' }} 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section cta">
        <div className="section-inner cta-inner">
          <h2>Had a great experience?</h2>
          <p>Share your feedback and help others find the best dental care.</p>
          <button
            className="btn-solid large"
            onClick={() => handleProtectedAction("/reviews")}
          >
            Write a Review
          </button>
          <p className="hero-note"> Login required to write a review</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-text">Mr. Dentist</span>
            <p>Your smile, our mission.</p>
          </div>
          <div className="footer-links">
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("doctors")}>Doctors</button>
            <button onClick={() => scrollTo("branches")}>Branches</button>
            <button onClick={() => scrollTo("about")}>About</button>
          </div>
          <div className="footer-auth">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>
        <p className="footer-copy">© 2026 Mr. Dentist. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default LandingPage;