import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaRegChartBar, FaRegCalendarCheck,
  FaUserFriends, FaSuitcase
} from 'react-icons/fa';
import { MdSettings, MdPersonAddAlt1 } from 'react-icons/md';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "Atharva Sawant";

  const getInitials = (name) => {
    const names = name.trim().split(" ");
    const initials = names.slice(0, 2).map(n => n[0].toUpperCase()).join("");
    return initials;
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo (only visible on desktop via CSS) */}
      <div className="navbar-logo">
        <Link to="/profile">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>

      {/* Add Candidates */}
      <Link to="/add-candidates" className={`navbar-link-vertical ${location.pathname === '/add-candidates' ? 'active-link' : ''}`}>
        <MdPersonAddAlt1 className="navbar-icon-vertical" />
        <span className="navbar-labeladd">Add</span>
        <span className="navbar-labeladd">Candidates</span>
      </Link>

      {/* Dashboard */}
      <Link to="/dashboard" className={`navbar-link-vertical ${location.pathname === '/dashboard' ? 'active-link' : ''}`}>
        <FaRegChartBar className="navbar-icon-vertical" />
        <span className="navbar-label">Dashboard</span>
      </Link>

      {/* Interviews */}
      <Link to="/interviews" className={`navbar-link-vertical ${location.pathname === '/interviews' ? 'active-link' : ''}`}>
        <FaRegCalendarCheck className="navbar-icon-vertical" />
        <span className="navbar-label">Interviews</span>
      </Link>

      {/* Candidates */}
      <Link to="/candidates" className={`navbar-link-vertical ${location.pathname === '/candidates' ? 'active-link' : ''}`}>
        <FaUserFriends className="navbar-icon-vertical" />
        <span className="navbar-label">Candidates</span>
      </Link>

      {/* Jobs */}
      <Link to="/jobs" className={`navbar-link-vertical ${location.pathname === '/jobs' ? 'active-link' : ''}`}>
        <FaSuitcase className="navbar-icon-vertical" />
        <span className="navbar-label">Jobs</span>
      </Link>

      {/* Settings */}
      <Link to="/settings" className={`navbar-link-vertical ${location.pathname === '/settings' ? 'active-link' : ''}`}>
        <MdSettings className="navbar-icon-vertical" />
        <span className="navbar-label">Settings</span>
      </Link>

      {/* Avatar (desktop only via CSS) */}
      <Link to="/profile" className={`navbar-link-vertical profile-avatar-link ${location.pathname === '/profile' ? 'active-link' : ''}`}>
        <div className="avatar-initials">{getInitials(userName)}</div>
      </Link>

      {/* Logout (desktop only via CSS) */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
