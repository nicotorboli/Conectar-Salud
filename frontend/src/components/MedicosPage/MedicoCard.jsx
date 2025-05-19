import React, { useState, useContext} from "react";
import "./MedicoCard.css";
import placeholder from '../../assets/PlaceHolder.png';
import { FaHeart } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext.jsx'

const MedicoCard = ({ medico, onVerPerfil }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [cantLikes, setCantLikes] = useState(medico.cantidadLikes || 0);
    const { email } = useContext(AuthContext)
    console.log(localStorage.getItem("email")); // EL MAIL ES UNDEFINED
    const handleImageError = (e) => {
        e.target.src = placeholder;
    };

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:8080/medicos/${medico.id}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usuarioEmail: localStorage.getItem("email") }),
            });

            if (response.ok) {
                setIsLiked(!isLiked);
                setCantLikes(prev => prev + (isLiked ? -1 : 1));
            } else {
                console.error("Error al enviar el like");
            }
        } catch (error) {
            console.error("Error en la conexión con la API:", error);
        }
    };

    return (
        <div className="medico-card">
            <div className="medico-img-container">
                <img
                    src={medico.fotoPerfil ? `data:image/jpeg;base64,${medico.fotoPerfil}` : placeholder}
                    alt={`${medico.nombre} ${medico.apellido}`}
                    className="medico-foto"
                    onError={handleImageError}
                />
            </div>
            <h3>{medico.nombre} {medico.apellido}</h3>
            <span className="especialidad">{medico.especialidad}</span>
            <p className="matricula">🩺 {medico.matriculaProfesional}</p>
            <p className="ubicacion">📍 {medico.ubicacion}</p>
            <p className="precio-consulta">${medico.precioConsulta}</p>
            <div className="likes-container">
                <FaHeart
                    className={`heart ${isLiked ? "liked" : ""}`}
                    onClick={handleLike}
                    style={{ cursor: "pointer" }}
                />
                <p className="likes-info"> - {cantLikes} Like(s) </p>
            </div>
            <button className="boton-perfil" onClick={onVerPerfil}>
                Ver perfil completo
            </button>
        </div>
    );
};

export default MedicoCard;
