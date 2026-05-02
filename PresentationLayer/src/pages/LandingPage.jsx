import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import projectLogo from '../pages/projectlogo.png';

const services = [
  { id: 1, title: "General Dentistry", desc: "Routine checkups, cleanings, and fillings to keep your smile healthy." },
  { id: 2,  title: "Teeth Whitening", desc: "Professional whitening treatments to brighten your smile instantly." },
  { id: 3,  title: "Orthodontics", desc: "Braces and aligners to straighten teeth for all ages." },
  { id: 4,  title: "Dental Implants", desc: "Permanent solutions for missing teeth with a natural look and feel." }
];


const doctors = [
  { id: 1, name: "Dr. Sarah Ahmed", specialty: "Orthodontics", shift: "Sun–Thu 9AM–3PM", fee: 500 },
  { id: 2, name: "Dr. Mohamed Ali", specialty: "Teeth Whitening", shift: "Mon–Fri 2PM–8PM", fee: 300 },
  { id: 3, name: "Dr. Nour Hassan", specialty: "General Dentistry", shift: "Sat–Wed 10AM–4PM", fee: 250 },
];

const branches = [
  { id: 1, city: "Cairo", address: "15 Tahrir Square, Downtown Cairo", phone: "011111111" },
  { id: 2, city: "Giza", address: "88 Pyramids Road, Giza", phone: "0" },
  { id: 3, city: "Alexandria", address: "22 Corniche Street, Alexandria", phone: "022222222" },
];


const LandingPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
                Book Appointmenet
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
    <h1 className="hero-title">Your Smile Deserves <span>The Best Care</span></h1>
    <p className="hero-subtitle">
      Trusted dental care across Egypt. Expert doctors, modern clinics,
      and treatments tailored just for you.
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
          <h2 className="section-heading">Our Services</h2>
          <p className="section-sub">Everything your smile needs ,all under one roof</p>
          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.id}>
                <span className="service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section grey" id="doctors">
        <div className="section-inner">
          <h2 className="section-heading">Meet Our Doctors</h2>
          <p className="section-sub">Experienced specialists dedicated to your dental health</p>
          <div className="doctors-grid">
            {doctors.map((doc) => (
              <div className="doctor-card" key={doc.id}>
                {/* Replace with real photo later */}
                <div className="doctor-avatar"></div>
                <h3 className="doctor-name">{doc.name}</h3>
                <p className="doctor-specialty">{doc.specialty}</p>
                <div className="doctor-details">
                  <p>{doc.shift}</p>
                  <p>{doc.fee} EGP / session</p>
                </div>
                <button
                  className="btn-solid full"
                  onClick={() => handleProtectedAction("/appointments")}
                >
                  Book with {doc.name.split(" ")[1]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="branches">
        <div className="section-inner">
          <h2 className="section-heading">Our Branches</h2>
          <p className="section-sub">Conveniently located across Egypt</p>
          <div className="branches-grid">
            {branches.map((b) => (
              <div className="branch-card" key={b.id}>
                <h3 className="branch-city"> {b.city}</h3>
                <p>{b.address}</p>
                <p>{b.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section grey" id="about">
        <div className="section-inner about-inner">
          <div className="about-text">
            <h2 className="section-heading left">About Mr. Dentist</h2>
            <p>
              Founded in 2005, Mr. Dentist started as a single clinic in Cairo with a
              simple mission to make high-quality dental care accessible to everyone.
            </p>
            <p>
              Over the years we have grown to 3 branches across Egypt, a team of
              over 20 specialist doctors, and tens of thousands of happy patients.
            </p>
            <p>
             you're in safe hands with Mr.Dentist.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <span className="stat-big">20+</span>
                <span>Specialist Doctors</span>
              </div>
              <div className="about-stat">
                <span className="stat-big">3</span>
                <span>Branches</span>
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
