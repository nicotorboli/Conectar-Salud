import React, { useEffect, useState } from "react";
import MedicoCard from "./MedicoCard.jsx";
import "./MedicosPage.css";

const MedicosPage = () => {
    const [medicos, setMedicos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const response = await fetch("http://localhost:8080/medicos");
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
    }, []);

    if (cargando) return <p>Cargando médicos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="medicos-container">
            {medicos.map((medico, index) => (
                <MedicoCard key={index} medico={medico} />
            ))}
        </div>
    );
};

export default MedicosPage;
