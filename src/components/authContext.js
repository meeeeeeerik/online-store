import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAndLogin = async (username, password) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const { username: storedUsername, password: storedPassword } =
          JSON.parse(storedUser);
        if (storedUsername === username && storedPassword === password) {
          setUserName(storedUsername);
          setIsAuthenticated(true);
          return { message: "Logged in from localStorage" };
        }
      }

      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      setUserName(username);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify({ username, password }));
      return data;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const register = async (username, password) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();
      const userData = { username, password };
      setUserName(username);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userData));
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      return null;
    }
  };

  const logout = () => {
    setUserName("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ userName, isAuthenticated, checkAndLogin, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
