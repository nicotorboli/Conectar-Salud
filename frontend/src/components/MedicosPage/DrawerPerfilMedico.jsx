import React from "react";
import WhatsApp from '../../assets/WhatsApp.png';
import "./DrawerPerfilMedico.css";

const DrawerPerfilMedico = ({ medico, onClose }) => {
    if (!medico) return null;

    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="drawer" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="drawer-header">
                    <div className="avatar-placeholder"></div>
                    <div>
                        <h2 className="medico-nombre">{medico.nombre} {medico.apellido}</h2>
                        <p className="medico-especialidad">{medico.especialidad}</p>
                    </div>
                </div>
                <div className="drawer-body">
                    <div className="info-item">
                        <span>🩺</span>
                        <p>{medico.matriculaProfesional}</p>
                    </div>
                    <div className="info-item">
                        <span>📍</span>
                        <p>{medico.ubicacion}</p>
                    </div>
                    <div className="info-item">
                        <span>$</span>
                        <p>{medico.precioConsulta}</p>
                    </div>
                    <div className="info-item">
                        <span>📩</span>
                        <p>{medico.email}</p>
                    </div>
                    <div className="info-item">
                        <span>📞</span>
                        <p>{medico.nroLinea || "no hay numero de linea."}</p>
                    </div>
                    <div className="contact-buttons">
                        <a
                          href={`https://wa.me/${medico.nroWhatsapp}?text=${encodeURIComponent('Hola, te encontré en Conectar Salud y me gustaría más información')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-link"
                        >
                            <img src={WhatsApp} alt="WhatsApp" className="contact-icon" />
                            {medico.nroWhatsapp}
                        </a>
                    </div>
                    <div className="descripcion">
                        <h4>Sobre el médico</h4>
                        <p>{medico.descripcion || "Este médico aún no agregó una descripción."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerPerfilMedico;