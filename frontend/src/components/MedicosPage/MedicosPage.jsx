import React, { useEffect, useState, useMemo } from "react";
import MedicoCard from "./MedicoCard.jsx";
import DrawerPerfilMedico from "./DrawerPerfilMedico.jsx";
import "./MedicosPage.css";
import { useSearchParams } from "react-router-dom";

const MedicosPage = () => {
  const [medicos, setMedicos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [ordenarPorLikes, setOrdenarPorLikes] = useState(false); // Nuevo estado para controlar el ordenamiento
  const caracteristica = searchParams.get("caracteristica") || "";
  const filter = searchParams.get("filter") || "";

  // Función para ordenar los médicos por likes
  const medicosOrdenados = useMemo(() => {
    if (!ordenarPorLikes) return medicos;

    return [...medicos].sort((a, b) => b.likes - a.likes);
  }, [medicos, ordenarPorLikes]);

  const handlerOrdenar = () => {
    setOrdenarPorLikes(!ordenarPorLikes); // Alternar entre activado/desactivado
  };

  useEffect(() => {
    const handleSearchParamsChange = () => {
      setCargando(true);
      setError(null);
      const fetchMedicos = async () => {
        try {
          let url = "http://localhost:8080/medicos";
          if (caracteristica) {
            if (caracteristica === "precio") {
              const valores = filter.split(",");
              url += `/${encodeURIComponent(
                caracteristica
              )}/${encodeURIComponent(
                parseInt(valores[0])
              )}/${encodeURIComponent(parseInt(valores[1]))}`;
              console.log(url);
            } else {
              url += `/${encodeURIComponent(
                caracteristica
              )}/${encodeURIComponent(filter)}`;
            }
          }
          const response = await fetch(url);
          if (!response.ok) throw new Error("Error al obtener los médicos");
          const data = await response.json();
          setMedicos(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setCargando(false);
        }
      };

      fetchMedicos();
    };

    handleSearchParamsChange();
  }, [caracteristica, filter]);

  if (cargando) return <p>Cargando médicos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (medicos.length == 0)
    return <p>No hay medicos que coincidan con tu busqueda</p>;

  return (
    <div className="medicos-container">
      {medicos.length > 0 && (
        <div className="contenedor-button">
          <button
            onClick={handlerOrdenar}
            className={`ordenar-btn ${ordenarPorLikes ? "activo" : ""}`}
          >
            {ordenarPorLikes ? "Desordenar" : "Ordenar por likes"}
          </button>
        </div>
      )}

      {medicosOrdenados.map((medico, index) => (
        <MedicoCard
          key={index}
          medico={medico}
          onVerPerfil={() => setMedicoSeleccionado(medico)}
        />
      ))}

      {medicoSeleccionado && (
        <DrawerPerfilMedico
          medico={medicoSeleccionado}
          onClose={() => setMedicoSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default MedicosPage;
