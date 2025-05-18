import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [matricula, setMatricula] = useState(null);
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const matriculaSaved = localStorage.getItem("matricula");
    const rolSaved = localStorage.getItem("rol")
    if (savedToken) {
      setToken(savedToken);
      setMatricula(matriculaSaved)
      setRol(rolSaved)
    }
  }, []);

  const login = (newToken,matricula,rol) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem('matricula', matricula);
    localStorage.setItem('rol', rol);
    setRol(rol);
    setToken(newToken);
    setMatricula(matricula);
  };



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("matricula");
    localStorage.removeItem("rol")
    setRol(null);
    setToken(null);
    setMatricula(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, rol }}>
      {children}
    </AuthContext.Provider>
  );
};
