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
    const rolSaved = localStorage.getItem("rol");
    const emailSaved = localStorage.getItem("email");

    if (savedToken) {
      setToken(savedToken);
      setMatricula(matriculaSaved);
      setRol(rolSaved);
      setEmail(emailSaved);
    }
  }, []);

  const login = (newToken,matricula,rol, email) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem('matricula', matricula);
    localStorage.setItem('rol', rol);
    localStorage.setItem('email', email);
    setEmail(email);
    setRol(rol);
    setToken(newToken);
    setMatricula(matricula);
  };



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("matricula");
    localStorage.removeItem("rol")
    localStorage.removeItem("email");

    setRol(null);
    setToken(null);
    setMatricula(null);
    setEmail(null);

  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, rol, email,matricula  }}>
      {children}
    </AuthContext.Provider>
  );
};
