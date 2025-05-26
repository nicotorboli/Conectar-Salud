
import React, { useState, useEffect, useContext } from "react";
import "../Comentario/Comentario.css";
import { AuthContext } from "../../context/AuthContext";

const Comentario = ({ medicoId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

const fetchComentarios = async () => {
    try {

      const response = await fetch(`http://localhost:8080/comentarios/medico/${medicoId}`);
      if (!response.ok) throw new Error("Error al obtener los comentarios");
      const data = await response.json();
      setComentarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  if (cargando) return <div className="cargando-comentarios">Cargando comentarios...</div>;
  if (error) return <div className="error-comentarios">Error: {error}</div>;

  return (
      <div className="seccion-comentarios">
            <h3>Comentarios</h3>
      {comentarios.length === 0 ? (
              <p className="sin-comentarios">No hay comentarios aún</p>
            ) : (
              <div className="lista-comentarios">
                {comentarios.map((comentario) => (
                  <div key={comentario.id} className="comentario-individual">
                    <div className="cabecera-comentario">
                      <span className="autor-comentario">
                        {comentario.autor || "Anónimo" + ${autor}}
                      </span>
                      <span className="fecha-comentario">
                        {formatDate(comentario.fecha)}
                      </span>
                    </div>
                   <p className="contenido-comentario">{comentario.contenido}</p>
                    </div>
                    ))
                }

             </div>)}
           </div>
       )