import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import Navbar from './components/navbar';
import UserPage from './user/components/userpage';
import { Register } from './user/pages/Signup';
import Login from './user/pages/Login';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
  <Switch>
          
          <Route path="/register" component={Register} />
      
      </Switch>    {/* Add more routes as needed */}
      
      </div>
    </Router>
  );
}

export default App;
