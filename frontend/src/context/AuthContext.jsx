import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [matricula, setMatricula] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const matriculaSaved = localStorage.getItem("matricula");
    if (savedToken) {
      setToken(savedToken);
      setMatricula(matriculaSaved)
    }
  }, []);

  const login = (newToken,matricula) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("matricula", matricula);
    setToken(newToken);
    setMatricula(matricula);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("matricula");
    setToken(null);
    setMatricula(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
