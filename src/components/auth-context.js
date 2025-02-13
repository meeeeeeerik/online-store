import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser?.username) {
      setUserName(storedUser.username);
    }
  }, []);

  const login = async (username, password) => {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    let resUsername;

    if (response.ok) {
      const data = await response.json();

      resUsername = data.username;
    } else {
      let usersList = JSON.parse(localStorage.getItem("users")) || [];

      const existingUser = usersList.find((user) => {
        user.username === username && user.password === password;
      });

      if (!existingUser) {
        throw new Error("Login failed");
      }

      resUsername = existingUser.username;
    }

    setUserName(resUsername);
    localStorage.setItem("currentUser", JSON.stringify({ resUsername }));
  };

  const signup = async (username, password) => {
    const response = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    let usersList = JSON.parse(localStorage.getItem("users")) || [];
    usersList.push({ username, password });
    localStorage.setItem("users", JSON.stringify(usersList));

    setUserName(username);
    localStorage.setItem("currentUser", JSON.stringify({ username }));
  };

  const logout = () => {
    setUserName("");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
