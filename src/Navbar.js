import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="favicon.ico" alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/about">ABOUT</Link>
        </li>
        <li>
          <Link to="/buy">BUY</Link>
        </li>
        <li>
          <Link to="/plan">PLAN</Link>
        </li>
        <li>
          <Link to="/customersupport">SUPPORT?</Link>
        </li>
        {!isAuthenticated ? (
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        ) : (
          <li>
            <b><button onClick={logout} className="logout-buttonn">Logout</button></b>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
