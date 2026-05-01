const doctors = [
  {
    id: 1,
    name: "Dr. Ahmed",
    degree: "M.D, pH.D",
    specialty: "General, Laboratory",
    image: "https://i.pinimg.com/736x/36/e9/a9/36e9a92a71fb6e9ba98880d133862a27.jpg",
    qualification: "BDS, MDS - Periodontology and Oral Implantology, 16 Years Experience",
    certification: "National Specialist Register in Dental Gynecology, Department of Science Major",
    awards: "National Specialist Register in Dental Gynecology, Department of Science Major",
  },
  {
    id: 2,
    name: "Dr. Enas",
    degree: "M.D, pH.D",
    specialty: "Orthodontics, Surgery",
    image: "https://i.pinimg.com/736x/18/35/eb/1835eb1fa62c5a4392798b2bde720450.jpg",
    qualification: "BDS, MDS - Orthodontics and Dentofacial Orthopedics, 12 Years Experience",
    certification: "National Specialist Register in Dental Surgery, Department of Oral Health Science",
    awards: "National Specialist Register in Dental Surgery, Department of Oral Health Science",
  },
];

const DoctorList = () => {
  return (
    <div className="doctor-section">
      <div className="container">

        {doctors.map((doctor, index) => (
          <div key={doctor.id}>

            {/* ===== DOCTOR CARD ===== */}
            <div className="row align-items-center">

              {/* LEFT — Doctor Image */}
              <div className="col-md-5 mb-4 mb-md-0">
                <div className="doctor-image-wrapper">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    style={{ width: "100%", maxWidth: "450px" }}
                  />
                </div>
              </div>

              {/* RIGHT — Doctor Info */}
              <div className="col-md-7">
                <div className="doctor-info">

                  {/* Name + Degree */}
                  <h2 className="doctor-name">
                    {doctor.name}
                    <span>{doctor.degree}</span>
                  </h2>

                  {/* Specialty */}
                  <p className="doctor-specialty">{doctor.specialty}</p>

                  {/* Qualification */}
                  <div className="info-row">
                    <span className="info-label">Qualification</span>
                    <div className="info-divider"></div>
                    <p className="info-value">{doctor.qualification}</p>
                  </div>

                  {/* Certification */}
                  <div className="info-row">
                    <span className="info-label">Certification</span>
                    <div className="info-divider"></div>
                    <p className="info-value">{doctor.certification}</p>
                  </div>

                  {/* Awards */}
                  <div className="info-row">
                    <span className="info-label">Awards</span>
                    <div className="info-divider"></div>
                    <p className="info-value">{doctor.awards}</p>
                  </div>

{/* Book Button */}
<div className="mt-4">
  <a href="/appointments" className="btn-book">
    Book Appointment
  </a>
</div>

                </div>
              </div>
            </div>

            {/* Separator — show between doctors but not after last */}
            {index < doctors.length - 1 && (
              <hr className="doctor-separator" />
            )}

          </div>
        ))}

      </div>
    </div>
  );
};

export default DoctorList;