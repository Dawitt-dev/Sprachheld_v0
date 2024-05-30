import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserExercises from './components/UserExercises';
import Exercises from './components/Exercises';
import ExerciseDetail from './components/ExerciseDetail'
import Profile from './components/Profile';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="user-exercises" element={<ProtectedRoute><UserExercises /></ProtectedRoute>} />
            <Route path="exercises" element={<Exercises />} /> 
            <Route path="exercises/:id" element={<ExerciseDetail />} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();