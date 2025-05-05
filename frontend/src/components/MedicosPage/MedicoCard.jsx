import React from "react";
import "./MedicoCard.css";
import placeholder from '../../assets/PlaceHolder.png';
import { useState } from "react";

const MedicoCard = ({ medico, onVerPerfil }) => {
    const handleImageError = (e) => {
        e.target.src = placeholder;
    };
    return (
        <div className="medico-card">
            <div className="medico-img-container">
                <img src={medico.fotoPerfil ?`data:image/jpeg;base64,${medico.fotoPerfil}` : placeholder }
                    alt={`${medico.nombre} ${medico.apellido}`}
                    className="medico-foto"
                    onError={handleImageError}/>
            </div>
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
