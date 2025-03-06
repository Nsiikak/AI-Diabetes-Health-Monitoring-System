import { useState, useEffect } from "react";
import { api, LoginResponse } from "./api";

// Interface for user
export interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
          // Validate token with backend
          try {
            const userData = await api.getCurrentUser(savedToken);
            setUser(userData);
            setToken(savedToken);
          } catch (error) {
            console.error("Token validation error:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            setToken(null);
          }
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const response: LoginResponse = await api.login(email, password);
      setUser(response.user);
      setToken(response.accessToken);

      // Save to localStorage
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      const response = await api.register(name, email, password);

      if (response.success && response.user) {
        // Auto-login after successful registration
        await login(email, password);
      }

      return response.success;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
};
