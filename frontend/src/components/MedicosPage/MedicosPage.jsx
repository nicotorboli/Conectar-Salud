import React, { useEffect, useState } from "react";
import MedicoCard from "./MedicoCard.jsx";
import DrawerPerfilMedico from "./DrawerPerfilMedico.jsx"; // vamos a crear esto
import "./MedicosPage.css";
import { useSearchParams } from "react-router-dom";

const MedicosPage = () => {
    const [medicos, setMedicos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const [medicoSeleccionado, setMedicoSeleccionado] = useState(null); // <<< nuevo estado
    const caracteristica = searchParams.get("caracteristica") || "";
    const filter = searchParams.get("filter") || "";

    useEffect(() => {
        const handleSearchParamsChange = () => {
            setCargando(true);
            setError(null);
            const fetchMedicos = async () => {
                try {
                    let url = "http://localhost:8080/medicos";
                    if (caracteristica) {
                        url += `/${encodeURIComponent(caracteristica)}/${encodeURIComponent(filter)}`;
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
    if (medicos.length == 0) return <p>No hay medicos que coincidan con tu busqueda</p>;

    return (
        <div className="medicos-container">
                    {medicos.map((medico, index) => (
                        <MedicoCard
                            key={index}
                            medico={medico}
                            onVerPerfil={() => setMedicoSeleccionado(medico)} // <<< le pasamos la función
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
