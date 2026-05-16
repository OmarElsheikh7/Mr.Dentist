import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="global-navbar">
      <div className="nav-navigation-buttons">
        <button className="nav-btn nav-icon-btn" onClick={() => navigate(-1)} title="Back">
          &larr;
        </button>
        <button className="nav-btn nav-icon-btn" onClick={() => navigate(1)} title="Forward">
          &rarr;
        </button>
      </div>
      <Link to="/" className="nav-btn">Logout</Link>
    </nav>
  )
}

export default Navbar