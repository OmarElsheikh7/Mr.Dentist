import React, { useState } from "react";

const ProfileForm = ({ user, onUpdate }) => {
  if (!user) return null;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name, email, dateOfBirth, phone, role: user.role });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>

      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
      </div>

      <div>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      </div>

      <div>
        <label>Date of Birth:</label>
        <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} type="date" />
      </div>

      <div>
        <label>Phone:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
      </div>

      {/* Role is read-only - patient can't change their role */}
      <div>
        <label>Role:</label>
        <input value={user.role} type="text" disabled />
      </div>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ProfileForm;