import React from 'react';
import './App.css';
import { SearchPage } from './pages/SearchPage';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="container">
      <Navbar/>
      <SearchPage />
      
    </div>
  );
}

export default App;
