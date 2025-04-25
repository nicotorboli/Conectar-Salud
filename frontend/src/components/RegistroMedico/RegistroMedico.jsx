"use client";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./RegistroMedico.css";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { AuthContext } from "../../context/AuthContext";

export function RegistroMedico() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    especialidad: "",
    descripcion: "",
    ubicacion: "",
    precioConsulta: "",
    matriculaProfesional: "",
    nroWhatsapp: "",
    nroLinea: "",
  });
  const [errors, setErrors] = useState({
    general: null,
  });
  const [especialidades, setEspecialidades] = useState([]);
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  useEffect(() => {
    fetch("http://localhost:8080/medicos/especialidades") 
      .then((res) => res.json())
      .then((data) => setEspecialidades(data))
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsLoading(true);
  
      const response = await fetch("http://localhost:8080/auth/register/medico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar");
      }

      login(data.token); 
      navigate("/")
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registro-medico-card">
      <div className="registro-medico-header">
        <h2 className="registro-medico-title">Crear cuenta médica</h2>
        <p className="registro-medico-description">
          Complete el formulario para registrarse como profesional médico.
        </p>
      </div>
      <div className="registro-medico-content">
      <form onSubmit={handleSubmit} className="registro-medico-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Juan"
                className="form-input"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                name="apellido"
                placeholder="Pérez"
                className="form-input"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="doctor@ejemplo.com"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              className="form-input"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
            <p className="form-description">Mínimo 8 caracteres</p>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">WhatsApp</label>
              <input
                type="text"
                name="nroWhatsapp"
                placeholder="Ej: +54 9 11 5555-5555"
                className="form-input"
                value={formData.nroWhatsapp}
                onChange={handleChange}
                required
              />
              
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono (opcional)</label>
              <input
                type="text"
                name="nroLinea"
                placeholder="Ej: 011 4242-4242"
                className="form-input"
                value={formData.nroLinea}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Especialidad</label>
            <select
              name="especialidad"
              className="form-select"
              value={formData.especialidad}
              onChange={handleChange}
            >
              <option value="">Seleccione una especialidad</option>
              {especialidades.map((esp) => (
                <option key={esp.valor} value={esp.valor}>
                  {esp.display}
                </option>
              ))}
            </select>
            {errors.especialidad && (
              <p className="form-error">{errors.especialidad}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Matrícula profesional</label>
            <input
              type="text"
              name="matriculaProfesional"
              placeholder="Ej: MP-12345"
              className="form-input"
              value={formData.matriculaProfesional}
              onChange={handleChange}
              required
            />
            <p className="form-description">
              Ingrese su número de matrícula profesional
            </p>
            
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Precio de consulta</label>
              <input
                type="number"
                name="precioConsulta"
                placeholder="Ej: $5000"
                className="form-input"
                value={formData.precioConsulta}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Ubicación</label>
              <input
                type="text"
                name="ubicacion"
                placeholder="Dirección de consultorio"
                className="form-input"
                value={formData.ubicacion}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Descripción profesional (opcional)
            </label>
            <textarea
              name="descripcion"
              placeholder="Describa su experiencia, especificaciones para la consulta, etc..."
              className="form-textarea"
              value={formData.descripcion}
              onChange={handleChange}
            ></textarea>
            <p className="form-description">
              Esta información será visible en su perfil público
            </p>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Procesando..." : "Crear cuenta"}
          </button>
        </form>
        {errors.general && <ErrorMessage message={errors.general} />}
      </div>
      <div className="registro-medico-footer">
        <div className="login-link">
          ¿Ya tiene una cuenta?{" "}
          <Link to="/login" className="login-link-text">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegistroMedico;
