import "../App.css"; // Import your custom styles for the Navbar
import { Search } from "./Search";
import React, { useEffect, useState } from "react";
import { Items } from "../components/Items.jsx";
import { getItems } from "../Services/api-client.js";
import { Player } from "../components/Player.jsx";
import "../App.css";
import { SearchPage } from "../pages/SearchPage";

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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="index.html"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>

          <div className="search-page-container">
            <header className="header">
              <button className="btn btn-primary">Login</button>
            </header>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
