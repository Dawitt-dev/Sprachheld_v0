import React, { createContext, useEffect, useState } from 'react';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');   
            if (token) {
                try {
                    const response = await axios.get('/auth');
                    setUser(response.data);
                    localStorage.setItem('userId', response.data._id);
                } catch (error) {
                    console.log('Error checking auth', error);
                    localStorage.removeItem('token');
                }
            } 
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth', { email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            localStorage.setItem('userId', response.data.user.id);
            setUser(response.data.user);
            navigate('/profile');
        } catch (error) {
            console.error('Error logging in', error);
            console.error('Error logging in', error.response ? error.response.data : error); // Debugging
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUser(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
