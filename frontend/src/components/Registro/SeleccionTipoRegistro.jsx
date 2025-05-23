import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserMd } from "react-icons/fa";
import "./SeleccionTipoRegistro.css";

const SeleccionTipoRegistro = () => {
  const navigate = useNavigate();

  return (
    <div className="registro-container">
      <div className="registro-header">
        <h2 className="registro-titulo">Crear cuenta</h2>
        <p className="registro-subtitulo">
          Selecciona el tipo de cuenta con la cual acceder a Conectar Salud
        </p>
      </div>

      <div className="registro-opciones">
        <div className="registro-tarjeta">
            <FaUser size={48} color="#007bff" style={{ marginBottom: "1rem" }} />
          <h3 className="tarjeta-titulo">Soy Paciente</h3>
          <p className="tarjeta-descripcion">
            Registrate como paciente para buscar médicos, precios, opiniones y mas.
          </p>
          <button
            className="boton-borde"
            onClick={() => navigate("/registro/usuario")}
          >
            Registrarme como Paciente
          </button>
        </div>

        <div className="registro-tarjeta">
            <FaUserMd size={48} color="#007bff" style={{ marginBottom: "1rem" }} />
          <h3 className="tarjeta-titulo">Soy Médico</h3>
          <p className="tarjeta-descripcion">
            Registrate como profesional para ofrecer tus servicios y gestionar tus pacientes.
          </p>
          <button
            className="boton-lleno"
            onClick={() => navigate("/registro/medico")}
          >
            Registrarme como Médico
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeleccionTipoRegistro;