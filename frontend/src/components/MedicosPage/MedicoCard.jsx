import React from "react";
import "./MedicoCard.css";

import { useState } from "react";

const MedicoCard = ({ medico, onVerPerfil }) => {
    return (
        <div className="medico-card">
            <div className="medico-img-placeholder"></div>
            <h3>{medico.nombre} {medico.apellido}</h3>
            <span className="especialidad">{medico.especialidad}</span>
            <p className="matricula">🩺 {medico.matriculaProfesional}</p>
            <p className="ubicacion">📍 {medico.ubicacion}</p>
            <p className="precio-consulta">${medico.precioConsulta}</p>
            <button className="boton-perfil" onClick={onVerPerfil}>Ver perfil completo</button>
        </div>
    );
};

export default MedicoCard;
