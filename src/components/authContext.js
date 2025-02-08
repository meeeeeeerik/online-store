import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser?.username) {
      setUserName(storedUser.username);
      setIsAuthenticated(true);
    }
  }, []);

  const checkAndLogin = async (username, password) => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      setUserName(username);
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify({ username }));
      return data;
    } catch (error) {
      setError(error?.message || "Login error:");
      return null;
    }
  };

  const register = async (username, password) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();

      let usersList = JSON.parse(localStorage.getItem("users")) || [];
      usersList.push({ username, password });
      localStorage.setItem("users", JSON.stringify(usersList));

      setUserName(username);
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify({ username }));

      return data;
    } catch (error) {
      setError(error?.message || "Registration error:");
      return null;
    }
  };

  const logout = () => {
    setUserName("");
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        isAuthenticated,
        checkAndLogin,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
