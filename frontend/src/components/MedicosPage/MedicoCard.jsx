import React, { useState, useContext, useEffect} from "react";
import "./MedicoCard.css";
import placeholder from '../../assets/PlaceHolder.png';
import { FaHeart } from "react-icons/fa";
import { AuthContext } from '../../context/AuthContext.jsx'
import { toast } from 'react-toastify';

const MedicoCard = ({ medico, onVerPerfil }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [cantLikes, setCantLikes] = useState(medico.cantidadLikes || 0);
    const { email } = useContext(AuthContext)
    const { rol } = useContext(AuthContext)
    console.log(email + rol)
    const handleImageError = (e) => {
        e.target.src = placeholder;
    };

    useEffect(() => {
        const fetchLikeStatusAndCount = async () => {
            if (!email) return;

            try {
                const likeStatusResponse = await fetch(`http://localhost:8080/medicos/${medico.id}/liked-by?email=${email}`);
                if (likeStatusResponse.ok) {
                    const liked = await likeStatusResponse.json();
                    setIsLiked(liked);
                }

                const likeCountResponse = await fetch(`http://localhost:8080/medicos/${medico.id}/likes-count`);
                if (likeCountResponse.ok) {
                    const count = await likeCountResponse.json();
                    setCantLikes(count);
                }
            } catch (error) {
                console.error("Error al obtener información del like:", error);
            }
        };

        fetchLikeStatusAndCount();
    }, [email, medico.id]);

    const handleLike = async () => {
    if (!email) {
        toast.info('🔒 Debés iniciar sesión para dar like.');
        return;
    }

    if (rol == 'MEDICO') {
        toast.info('🔒 Solo los pacientes pueden calificar');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/medicos/${medico.id}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuarioEmail: email }),
        });

        if (response.ok) {
            const nuevoEstado = !isLiked;
            setIsLiked(nuevoEstado);
            setCantLikes(prev => prev + (nuevoEstado ? 1 : -1));
        } else {
            toast.error('Error al procesar el like.');
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
                <p className="likes-info">  {cantLikes} Like(s) </p>
            </div>
            <button className="boton-perfil" onClick={onVerPerfil}>
                Ver perfil completo
            </button>
        </div>
    );
};

export default MedicoCard;
