// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
          setUser(data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [logout]);

  const login = async (email, password) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      email,
      password,
    });
    
    localStorage.setItem('token', data.access_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    
    const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
    setUser(userResponse.data);
  };

  const register = async (name, email, password, password_confirmation, role) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation,
      role,
    });
    
    localStorage.setItem('token', data.access_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    
    const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
    setUser(userResponse.data);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);