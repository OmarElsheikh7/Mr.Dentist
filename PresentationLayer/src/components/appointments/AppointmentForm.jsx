const timeSlots = [
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM",  "5:00 PM", "6:00 PM", "7:00 PM",
  "8:00 PM",  "9:00 PM", "10:00 PM","11:00 PM",
];

const AppointmentForm = () => {
  return (
    <form>

      {/* ===== Staff Section ===== */}
      <h3 className="mt-4 mb-3">Staff</h3>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label>Select Doctor</label>
          <select className="form-select">
            <option value="">-- Select Doctor --</option>
            <option>Dr. Ahmed</option>
            <option>Dr. Enas</option>
            <option>Dr. Mohamed</option>
          </select>
        </div>
      </div>

      {/* ===== Time Section ===== */}
      <h3 className="mt-4 mb-3">Time</h3>
      <div className="row">
        <div className="col-md-4 mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label>Time</label>
          <select className="form-select">
            <option value="">-- Select Time --</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== Patient Info Section ===== */}
      <h3 className="mt-4 mb-3">Patient Info</h3>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter full name"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter age"
          />
        </div>
        <div className="col-md-8 mb-3">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      {/* ===== Submit Button ===== */}
      <div className="mt-4">
        <button type="submit" className="btn-book">
          Booked
        </button>
      </div>

    </form>
  );
};

export default AppointmentForm;