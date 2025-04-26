import React from "react";
import "./MedicoCard.css";
import { useState } from "react";

const MedicoCard = ({ medico }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div className="medico-card">
            <div className="medico-img-placeholder"></div>
            <h3>{medico.nombre} {medico.apellido}</h3>
            <span className="especialidad">{medico.especialidad}</span>
            <p className="matricula">🩺 {medico.matriculaProfesional}</p>
            <p className="ubicacion">📍 {medico.ubicacion}</p>
            <p className="precio-consulta">${medico.precioConsulta}</p>
            <button className="boton-perfil" onClick={toggleModal}>Ver perfil completo</button>
            {isModalOpen && (
                    <div className="modal-content">
                        <span className="close-button" onClick={toggleModal}>&times;</span>
                        <p><strong>📩 Email:</strong> {medico.email}</p>
                        <p><strong>📲 WhatsApp:</strong> {medico.nroWhatsapp}</p>
                        <p><strong>📞 Línea:</strong> {medico.nroLinea}</p>
                        <p>
                            <strong>📃 Descripción:</strong>{" "}
                            {medico.descripcion ? (
                                <span>{medico.descripcion}</span>
                            ) : (
                                <span style={{ color: "#aaa" }}>Sin descripción</span>
                            )}
                        </p>
                    </div>
            )}
        </div>
    );
};

export default MedicoCard;
