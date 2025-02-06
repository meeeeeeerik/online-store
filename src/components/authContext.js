import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser?.username) {
      setUserName(storedUser.username);
      setIsAuthenticated(true);
    } else {
      fetch("https://fakestoreapi.com/users/1")
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.username);
          setIsAuthenticated(true);
          localStorage.setItem(
            "user",
            JSON.stringify({ username: data.username })
          );
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, []);

  const login = async (username, password) => {
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
      localStorage.setItem("user", JSON.stringify({ username }));
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
      setUserName(username);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify({ username }));
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserName("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ userName, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
