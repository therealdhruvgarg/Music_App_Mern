import React from 'react';
import './App.css';
import { SearchPage } from './pages/SearchPage';
import Navbar from './components/navbar';
import { Register } from './user/pages/Signup';


function App() {
  return (
    <div className="container">
      <Navbar/>
      <SearchPage />
      <Register/>
    </div>
  );
}

export default App;
