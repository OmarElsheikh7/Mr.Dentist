

const DoctorList = () => {
  return (
    <div className="doctor-section">
      <div className="container">

        {/* ===== DOCTOR 1 ===== */}
        <div className="row align-items-center mb-5 pb-5 border-bottom">

          {/* LEFT — Doctor Image */}
          <div className="col-md-5">
            <div className="doctor-image-wrapper">
              <img
                src="https://i.pinimg.com/736x/36/e9/a9/36e9a92a71fb6e9ba98880d133862a27.jpg"
                alt="Doctor 1"
                style={{ width: "100%", maxWidth: "450px" }}
              />
            </div>
          </div>

          {/* RIGHT — Doctor Info */}
          <div className="col-md-7">
            <div className="doctor-info">

              {/* Name + Degree */}
              <h2 className="doctor-name">
                Dr. Ahmed
                <span>M.D, pH.D</span>
              </h2>

              {/* Specialty */}
              <p className="doctor-specialty">General, Laboratory</p>

              {/* Qualification */}
              <div className="info-row">
                <span className="info-label">Qualification</span>
                <div className="info-divider"></div>
                <p className="info-value">
                  BDS, MDS - Periodontology and Oral Implantology, <br />
                  16 Years Experience
                </p>
              </div>

              {/* Certification */}
              <div className="info-row">
                <span className="info-label">Certification</span>
                <div className="info-divider"></div>
                <p className="info-value">
                  National Specialist Register in Dental Gynecology <br />
                  Department of Science Major
                </p>
              </div>

              {/* Awards */}
              <div className="info-row">
                <span className="info-label">Awards</span>
                <div className="info-divider"></div>
                <p className="info-value">
                  National Specialist Register in Dental Gynecology <br />
                  Department of Science Major
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ===== DOCTOR 2 ===== */}
        <div className="row align-items-center mt-5 pt-3">

          {/* LEFT — Doctor Image */}
          <div className="col-md-5">
            <div className="doctor-image-wrapper">
              <img
                src="https://i.pinimg.com/736x/18/35/eb/1835eb1fa62c5a4392798b2bde720450.jpg"
                alt="Doctor 2"
                style={{ width: "100%", maxWidth: "450px" }}
              />
            </div>
          </div>

          {/* RIGHT — Doctor Info */}
          <div className="col-md-7">
            <div className="doctor-info">

              {/* Name + Degree */}
              <h2 className="doctor-name">
                Dr. Enas
                <span>M.D, pH.D</span>
              </h2>

              {/* Specialty */}
              <p className="doctor-specialty">Orthodontics, Surgery</p>

              {/* Qualification */}
              <div className="info-row">
                <span className="info-label">Qualification</span>
                <div className="info-divider"></div>
                <p className="info-value">
                  BDS, MDS - Orthodontics and Dentofacial Orthopedics, <br />
                  12 Years Experience
                </p>
              </div>

              {/* Certification */}
              <div className="info-row">
                <span className="info-label">Certification</span>
                <div className="info-divider"></div>
                <p className="info-value">
                  National Specialist Register in Dental Surgery <br />
                  Department of Oral Health Science
                </p>
              </div>

              {/* Awards */}
              <div className="info-row">
                <span className="info-label">Awards</span>
                <div className="info-divider"></div>
                <p className="info-value">
                  National Specialist Register in Dental Surgery <br />
                  Department of Oral Health Science
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorList;