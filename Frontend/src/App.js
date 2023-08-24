import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import Navbar from "./components/navbar";
import UserPage from "./user/components/userpage";
import { Register } from "./user/pages/Signup";
import Login from "./user/pages/Login";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Routes>{" "}
          {/* Add more routes as needed */}
          <SearchPage />
        </div>
      </Router>
    </>
  );
}

export default App;
