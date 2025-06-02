import "./SearchBar.css";
import { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const maxValor = 10000;
  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("Nombre");
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [priceError, setPriceError] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxValor);

  useEffect(() => {
    fetch("http://localhost:8080/medicos/especialidades")
      .then((res) => res.json())
      .then((data) => setEspecialidades(data))
      .catch((error) =>
        console.error("Error al cargar especialidades:", error)
      );
  }, []);

  const handleSearch = () => {
    if (searchOption === "Especialidad" && especialidadSeleccionada) {
      onSearch({ searchText: especialidadSeleccionada, searchOption });
    } else if (searchOption === "Precio") {
      onSearch({
        searchOption,
        searchText: [minPrice, maxPrice],
      });
    } else if (searchOption === "Ubicacion") {
      onSearch({ searchText, searchOption });
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

  const handlePriceChange = (e, type) => {
    const inputValue = e.target.value;
    const numericValue =
      inputValue === "" ? "" : Math.max(0, parseInt(inputValue)) || 0;

    if (type === "min") {
      setMinPrice(numericValue);
      setMaxPrice((prevMax) => {
        const newError = checkPriceErrors(numericValue, prevMax);
        setPriceError(newError);
        return prevMax;
      });
    } else {
      setMaxPrice(numericValue);
      setMinPrice((prevMin) => {
        const newError = checkPriceErrors(prevMin, numericValue);
        setPriceError(newError);
      });
    }
  };

  const checkPriceErrors = (min, max) => {
    if (min === "" || max === "") return "";

    if (min < 0 || max < 0) return "Ningún valor puede ser negativo";
    if (min > max) return "El mínimo no puede ser mayor que el máximo";

    return "";
  };

  const handleOptionChange = (option) => {
    setSearchOption(option);
    setSearchText("");
    setEspecialidadSeleccionada("");
    setMinPrice(0);
    setMaxPrice(maxValor);
    if (option === "Especialidad") {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const especialidadesFiltradas =
    searchOption === "Especialidad" && searchText
      ? especialidades.filter((esp) => {
          const displayText = esp.display || esp.nombreDisplay || "";
          return displayText.toLowerCase().includes(searchText.toLowerCase());
        })
      : especialidades;

  return (
    <div className="container">
      <div className="group">
        {searchOption === "Precio" ? (
          <div className="contenedorPrecio">
            <input
              type="number"
              min={0}
              value={minPrice === "" ? "" : minPrice}
              placeholder="Ingrese precio mínimo"
              onChange={(e) => handlePriceChange(e, "min")}
              className="inputNumber"
            />
            <span className="price-separator">-</span>
            <input
              type="number"
              min={minPrice !== "" ? minPrice : 0}
              value={maxPrice === "" ? "" : maxPrice}
              placeholder="Ingrese precio máximo"
              onChange={(e) => handlePriceChange(e, "max")}
              className="inputNumber"
            />
            {priceError && (
              <div className="price-error-message">
                <span className="error-icon">⚠️</span>
                {priceError}
              </div>
            )}
          </div>
        ) : (
          <div className="input-container">
            <input
              placeholder={
                searchOption === "Especialidad"
                  ? "Seleccionar especialidad"
                  : "Escribe aqui..."
              }
              type="search"
              className="input"
              value={searchText}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {searchOption === "Especialidad" &&
              showDropdown &&
              especialidades.length > 0 && (
                <div className="dropdown-especialidades">
                  {especialidadesFiltradas.length > 0 ? (
                    especialidadesFiltradas.map((especialidad, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleEspecialidadClick(especialidad)}
                      >
                        {especialidad.display ||
                          especialidad.nombreDisplay ||
                          ""}
                      </div>
                    ))
                  ) : (
                    <div className="dropdown-item">No hay resultados</div>
                  )}
                </div>
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
        <label className="radio">
          <input
            type="radio"
            name="radio"
            value="Precio"
            checked={searchOption === "Precio"}
            onChange={(e) => handleOptionChange(e.target.value)}
          />
          <span className="name">Precio</span>
        </label>
        <label className="radio">
          <input
            type="radio"
            name="radio"
            value="Ubicacion"
            checked={searchOption === "Ubicacion"}
            onChange={(e) => handleOptionChange(e.target.value)}
          />
          <span className="name">Ubicacion</span>
        </label>
      </div>
      <button
        onClick={handleSearch}
        disabled={priceError && searchOption === "Precio"}
      >
        Buscar
        <div className="arrow-wrapper">
          <div className="arrow"></div>
        </div>
      </button>
    </div>
  );
};

export default SearchBar;
