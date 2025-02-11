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
      setError(""); // Очистка старых ошибок перед новым запросом

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
      setError(error?.message || "Login error:"); // Устанавливаем ошибку
      return null;
    }
  };

  const register = async (username, password) => {
    try {
      setError(""); // Очистка старых ошибок перед новым запросом

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
      setError(error?.message || "Registration error:"); // Устанавливаем ошибку
      return null;
    }
  };

  const handleAuth = async (
    type,
    username,
    password,
    repeatPassword,
    email
  ) => {
    const newErrors = {};

    if (type === "signup") {
      if (!email.includes("@")) newErrors.email = "Invalid email format";
    }

    if (password.length < 5)
      newErrors.password = "Password must be at least 5 characters";

    if (type === "signup" && password !== repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setError(Object.values(newErrors).join(". ")); // Устанавливаем ошибки
      return false;
    }

    try {
      setError(""); // Очистка старых ошибок перед новым запросом

      let response = null;
      if (type === "signup") {
        response = await register(username, password);
      } else if (type === "login") {
        response = await checkAndLogin(username, password);
      }

      if (!response) {
        return false; // Не закрываем модалку, если логин/регистрация не удалась
      }

      return true; // Успешный вход/регистрация
    } catch (error) {
      setError(error?.message || "Authentication error:");
      return false;
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
        handleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
