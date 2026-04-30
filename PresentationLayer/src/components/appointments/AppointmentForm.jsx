const AppointmentForm = () => {

  // 🕐 Generate time slots from 8:00 AM to 11:00 PM every hour
  const timeSlots = [
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
    "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
  ];

  return (
    <form>

      {/* Service + Staff */}
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <label>Staffs</label>
          <select className="form-control">
            <option>Select Doctor</option>
            <option>Dr. Ahmed</option>
            <option>Dr. Mahmoud</option>
            <option>Dr. Mohamed</option>
          </select>
        </div>
      </div>

      {/* Time */}
      <h3 className="mt-4">Time</h3>

      <div className="row mt-3">
        <div className="col-md-4 mb-3">
          <label>Date</label>
          <input type="date" className="form-control" />
        </div>

        {/* ✅ Time Dropdown instead of time input */}
        <div className="col-md-4 mb-3">
          <label>Time</label>
          <select className="form-control">
            <option value="">Select Time</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Patient Info */}
      <h3 className="mt-4">Patient Info</h3>

      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <label>Full Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="col-md-6 mb-3">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>

        <div className="col-md-4 mb-3">
          <label>Age</label>
          <input type="number" className="form-control" />
        </div>

        <div className="col-md-8 mb-3">
          <label>Phone Number</label>
          <input type="tel" className="form-control" />
        </div>
      </div>

      <button className="btn btn-primary mt-3">
        Book Appointment
      </button>

    </form>
  );
};

export default AppointmentForm;