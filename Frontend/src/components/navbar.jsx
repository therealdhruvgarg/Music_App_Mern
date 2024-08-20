import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import './navbar.css'; // Create a CSS file for your Navbar styles
import Login from '../user/pages/Login';
import { Register } from '../user/pages/Signup';


const Navbar = () => {
  return (
    <nav className="spotify-navbar">
      <img src="https://pre00.deviantart.net/225c/th/pre/f/2008/052/3/a/brook__s_flag_by_zerocustom1989.png"width="70" height="70" alt="logo.png" className="nav-logo" ></img>
      <div className="navbar-logo">
        
        <Link to="/">♪Yohoho Music</Link>
      </div>
      <div className="navbar-links">
       
        <NavLink to="/register" element={<Register/>}>Register</NavLink>
        <NavLink to="/login" element={<Login />}>Login</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
