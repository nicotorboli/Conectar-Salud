import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

const Perfil = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // actualiza el contexto y borra el token
    navigate("/"); // redirecciona al inicio
  };

  return (
    <div className="perfil-container">
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
  
};

export default Perfil;
