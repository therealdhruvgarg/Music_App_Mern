import "../App.css"; // Import your custom styles for the Navbar
import React, { useEffect, useState } from "react";
import { getItems } from "../Services/api-client.js";
import "../App.css";


const Navbar = () => {
  const [allItems, setItems] = useState([]);
  const [flag, setFlag] = useState(false);
  const [item, setItem] = useState(null);

  const togglePlayer = (flag, itemarg) => {
    setItem(itemarg);
    setFlag(flag);
  };

  const getName = async (Name) => {
    setItems(await getItems(Name));
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <a className="navbar-brand" href="index.html">
          Spotify
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          <div className="search-page-container">
            <header>
              <button className="btn btn-primary">Login</button>
            </header>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
