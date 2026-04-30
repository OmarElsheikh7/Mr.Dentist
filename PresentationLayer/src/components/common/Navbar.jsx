import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/appointments">Appointments</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/">Logout</Link>
    </nav>
  )
}

export default Navbar