import React from "react";
import WhatsApp from '../../assets/WhatsApp.png';
import placeholder from '../../assets/PlaceHolder.png';
import "./DrawerPerfilMedico.css";
import UbicacionViewer from "../Ubicacion/UbicacionViewer";
import Comentario from "../Comentario/Comentario";

const DrawerPerfilMedico = ({ medico, onClose }) => {
    if (!medico) return null;

    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="drawer" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <div className="drawer-header">
                    {medico.fotoPerfil ? (
                        <img
                            src={`data:image/jpeg;base64,${medico.fotoPerfil}`}
                            alt={`${medico.nombre} ${medico.apellido}`}
                            className="avatar-imagen-drawer"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/PlaceHolder.png';
                            }}
                        />
                    ) : (
                        <div className="avatar-placeholder-drawer"></div>
                    )}
                    <div>
                        <h2 className="medico-nombre-drawer">{medico.nombre} {medico.apellido}</h2>
                        <p className="medico-especialidad-drawer">{medico.especialidad}</p>
                    </div>
                </div>
                <div className="drawer-body">
                    <div className="info-item-drawer">
                        <span>🩺</span>
                        <p>{medico.matriculaProfesional}</p>
                    </div>
                    <div className="info-item-drawer">
                        <span>📍</span>
                        <p>{medico.ubicacion}</p>
                    </div>
                    <div className="info-item-drawer">
                        <span>$</span>
                        <p>{medico.precioConsulta}</p>
                    </div>
                    <div className="info-item-drawer">
                        <span>📩</span>
                        <p>{medico.email}</p>
                    </div>
                    <div className="info-item-drawer">
                        <span>📞</span>
                        <p>{medico.nroLinea || "no hay numero de linea."}</p>
                    </div>
                    <div className="contact-buttons-drawer">
                        <a
                          href={`https://wa.me/${medico.nroWhatsapp}?text=${encodeURIComponent('Hola, te encontré en Conectar Salud y me gustaría más información')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-link"
                        >
                            <img src={WhatsApp} alt="WhatsApp" className="contact-icon-drawer" />
                            {medico.nroWhatsapp}
                        </a>
                    </div>
                    <div className="descripcion-drawer">
                        <h4>Sobre el médico</h4>
                        <p>{medico.descripcion || "Este médico aún no agregó una descripción."}</p>
                    </div>

                    <div>
                        <UbicacionViewer direccion={medico.ubicacion}></UbicacionViewer>
                    </div>
                    <div className="seccion-comentarios-drawer">
                        <Comentario medicoId={medico.id} mostrarCreacion={true} ></Comentario>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerPerfilMedico;