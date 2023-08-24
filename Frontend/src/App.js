import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import Navbar from "./components/navbar";
import { Register } from "./user/pages/Signup";
import Login from "./user/pages/Login";
import { Search } from "./components/Search";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>{" "}
        {/* Add more routes as needed */}
        {/* <SearchPage /> */}
      </div>
    </>
  );
}

export default App;
