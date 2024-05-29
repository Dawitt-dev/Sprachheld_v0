import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
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