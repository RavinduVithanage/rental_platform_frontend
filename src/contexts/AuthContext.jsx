// src/contexts/AuthContext.js
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/user`
          );
          setUser(data);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [logout]);

  const login = async (email, password) => {
    try {
      setError(null);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.access_token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;

      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/user`
      );
      setUser(userResponse.data);
      return { success: true };
    } catch (error) {
      handleApiError(error);
      return { success: false };
    }
  };

  const register = async (
    name,
    email,
    password,
    password_confirmation,
    role
  ) => {
    try {
      const appUrl = import.meta.env.VITE_API_URL;
      console.log("Registering user at:", appUrl); 
      setError(null);
      const { data } = await axios.post(
        `${appUrl}/register`,
        {
          name,
          email,
          password,
          password_confirmation,
          role,
        }
      );

      localStorage.setItem("token", data.access_token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;

      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/user`
      );
      setUser(userResponse.data);
      return { success: true, user: userResponse.data };
    } catch (error) {
      console.log("Error registering user:", error); 
      return handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    let errorMessage = error.message || "An unexpected error occurred";
    if (error.response) {
      // Server responded with a status code that falls out of 2xx range
      if (error.response.data.errors) {
        // Laravel validation errors
        errorMessage = Object.values(error.response.data.errors)[0][0];
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response from server. Please check your connection.";
    }

    setError(errorMessage);
    return { success: false, error: errorMessage };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
