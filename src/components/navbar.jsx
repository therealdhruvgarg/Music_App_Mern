import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Create a CSS file for your Navbar styles
import Login from '../user/pages/Login';

const Navbar = () => {
  return (
    <nav className="spotify-navbar">
      <div className="navbar-logo">
        <Link to="/">Spotify</Link>
      </div>
      <div className="navbar-links">
        <Link to="/search">Search</Link>
        <Link to="/user">User Page</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
