import "./SearchBar.css"
import { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("Nombre");
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/medicos/especialidades")
      .then((res) => res.json())
      .then((data) => setEspecialidades(data))
      .catch((error) => console.error("Error al cargar especialidades:", error));
  }, []);

  const handleSearch = () => {
    if (searchOption === "Especialidad" && especialidadSeleccionada) {
      onSearch({ searchText: especialidadSeleccionada, searchOption });
    } else {
      onSearch({ searchText, searchOption });
    }
  };

  const handleEspecialidadClick = (especialidad) => {
    setSearchText(especialidad.display || especialidad.nombreDisplay || "");
    setEspecialidadSeleccionada(especialidad.valor || especialidad.id || "");
    setShowDropdown(false);
  };

  const handleInputFocus = () => {
    if (searchOption === "Especialidad") {
      setShowDropdown(true);
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    if (searchOption === "Especialidad") {
      setShowDropdown(true);
    }
  };

  const handleOptionChange = (option) => {
    setSearchOption(option);
    setSearchText("");
    setEspecialidadSeleccionada("");
    if (option === "Especialidad") {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const especialidadesFiltradas = searchOption === "Especialidad" && searchText
    ? especialidades.filter(esp => {
        const displayText = esp.display || esp.nombreDisplay || "";
        return displayText.toLowerCase().includes(searchText.toLowerCase());
      })
    : especialidades;

  return (
    <div className="container">
      <div className="group">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          placeholder={searchOption === "Especialidad" ? "Seleccionar especialidad" : "Search"}
          type="search"
          className="input"
          value={searchText}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        {searchOption === "Especialidad" && showDropdown && especialidades.length > 0 && (
          <div className="dropdown-especialidades">
            {especialidadesFiltradas.length > 0 ? (
              especialidadesFiltradas.map((especialidad, index) => (
                <div 
                  key={index} 
                  className="dropdown-item"
                  onClick={() => handleEspecialidadClick(especialidad)}
                >
                  {especialidad.display || especialidad.nombreDisplay || ""}
                </div>
              ))
            ) : (
              <div className="dropdown-item">No hay resultados</div>
            )}
          </div>
        )}
      </div>
      <div className="radio-inputs">
        <label className="radio">
          <input
            type="radio"
            name="radio"
            value="Nombre"
            checked={searchOption === "Nombre"}
            onChange={(e) => handleOptionChange(e.target.value)}
          />
          <span className="name">Nombre</span>
        </label>
        <label className="radio">
          <input
            type="radio"
            name="radio"
            value="Especialidad"
            checked={searchOption === "Especialidad"}
            onChange={(e) => handleOptionChange(e.target.value)}
          />
          <span className="name">Especialidad</span>
        </label>
      </div>
      <button onClick={handleSearch}>
        Buscar
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>
    </div>
  );
};

export default SearchBar;