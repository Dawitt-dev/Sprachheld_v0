import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import logo from './assets/Sprachheld.png';
import './App.css'; // Import the CSS file

const App = () => {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <div>
      <header className="app-header">
        <img src={logo} alt="Sprachheld Logo" className="app-logo" />
        <nav>
          <ul>
            {user && <li><Link to="/">Home</Link></li>}
            {!user && <li><Link to="/login">Login</Link></li>}
            {!user && <li><Link to="/register">Register</Link></li>}
            {user && <li><Link to="/exercises">Exercises</Link></li>}
            {user && <li><Link to="/profile">Profile</Link></li>}
            {user && <li><button onClick={logout}>Logout</button></li>}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 Sprachheld. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
