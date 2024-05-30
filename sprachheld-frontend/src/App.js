import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const App = () => {
  const { user, logout } = React.useContext(AuthContext);

  return (
    <div>
      <header>
        <nav>
          <ul>
            {user &&<li><Link to="/">Home</Link></li>}
            {!user && <li><Link to="/login">Login</Link></li>}
            {!user && <li><Link to="/register">Register</Link></li>}
            {user && <li><Link to="/exercises">Exercises</Link></li>}
            {user && <li><Link to="/profile">Profile</Link></li>}
            {user && <li><button onClick={logout}>Logout</button></li>}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* This will render the matched child route's component */}
      </main>
      <footer>
        <p>&copy; 2024 Sprachheld. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;