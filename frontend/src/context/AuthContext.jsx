import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [matricula, setMatricula] = useState(null);
  const [rol, setRol] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const matriculaSaved = localStorage.getItem("matricula");
    if (savedToken) {
      setToken(savedToken);
      setMatricula(matriculaSaved)
    }
  }, []);

  const login = (newToken,matricula,rol, email) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem('matricula', matricula);
    localStorage.setItem('rol', rol);
    localStorage.setItem('rol', email);
    setEmail(email);
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
