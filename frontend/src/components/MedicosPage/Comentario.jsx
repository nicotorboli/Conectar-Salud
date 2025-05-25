import React, { useState, useContext, useEffect } from "react";
import "./Comentario.css";
const Comentario = ({ medicoId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const llamadoComentarios = async () => {
    setCargando(true);
    setError(null);
    try {
      let url = "http://localhost:8080/comentarios/medico/";
      url += `${medicoId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener los comentarios");

      const data = await response.json();

      setComentarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    llamadoComentarios();
  }, []);

  if (cargando) {
    return <div>Cargando comentarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!comentarios || comentarios.length === 0) {
    return <div>No hay comentarios</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="casillaComentarios">
      {comentarios.map((comentario, index) => {
        return (
          <div key={comentario.id} className="comentario">
            <p>{"Paciente Anónimo" + index} </p>
            <p className="contenido-comentario">{comentario.contenido}</p>
            <p className="fecha-comentario">{formatDate(comentario.time)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comentario;
