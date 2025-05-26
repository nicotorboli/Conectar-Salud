import React, { useState, useEffect, useContext } from "react";
import "./Comentario.css";
import { AuthContext } from "../../context/AuthContext";

const Comentario = ({ medicoId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const { token, email } = useContext(AuthContext);


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

  const crearComentario = async () => {
    if (!nuevoComentario.trim()) return;

    try {
        console.log(token);
      const response = await fetch("http://localhost:8080/comentarios", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          contenido: nuevoComentario,
          medicoId: medicoId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear comentario");
      }

      const comentarioCreado = await response.json();
      setComentarios([comentarioCreado, ...comentarios]);
      setNuevoComentario("");
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarComentario = async (comentarioId) => {
    try {
      const response = await fetch(`http://localhost:8080/comentarios/${comentarioId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Error al eliminar comentario");

      setComentarios(comentarios.filter(c => c.id !== comentarioId));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, [medicoId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  if (cargando) return <div className="cargando-comentarios">Cargando comentarios...</div>;
  if (error) return <div className="error-comentarios">Error: {error}</div>;

  return (
    <div className="seccion-comentarios">
      <h3>Comentarios</h3>

      {/* Formulario para nuevo comentario */}
      {token && (
        <div className="formulario-comentario">
          <textarea
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            placeholder="Escribe tu comentario..."
            rows="3"
          />
          <button onClick={crearComentario} className="boton-enviar-comentario">
            Enviar Comentario
          </button>
        </div>
      )}

      {/* Lista de comentarios */}
      {comentarios.length === 0 ? (
        <p className="sin-comentarios">No hay comentarios aún</p>
      ) : (
        <div className="lista-comentarios">
          {comentarios.map((comentario) => (
            <div key={comentario.id} className="comentario-individual">
              <div className="cabecera-comentario">
                <span className="autor-comentario">
                  {comentario.autor || "Anónimo"}
                </span>
                <span className="fecha-comentario">
                  {formatDate(comentario.fecha)}
                </span>
              </div>
              <p className="contenido-comentario">{comentario.contenido}</p>

              {/* Botón para eliminar (solo para el autor) */}
              {email === comentario.autorEmail && (
                <button
                  onClick={() => eliminarComentario(comentario.id)}
                  className="boton-eliminar-comentario"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comentario;