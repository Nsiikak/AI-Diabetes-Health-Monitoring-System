import { useState, useEffect } from "react";

// Simple user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "doctor" | "admin";
}

// Mock user for demo
const MOCK_USER: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "patient",
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const checkAuth = async () => {
      try {
        // In a real app, this would check with a backend
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // For demo purposes, we'll auto-log in with the mock user
          setUser(MOCK_USER);
          localStorage.setItem("user", JSON.stringify(MOCK_USER));
        }
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login
    setLoading(true);

    try {
      // In a real app, this would make a backend request
      // For demo, we'll just use the mock user
      setUser(MOCK_USER);
      localStorage.setItem("user", JSON.stringify(MOCK_USER));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };
};
