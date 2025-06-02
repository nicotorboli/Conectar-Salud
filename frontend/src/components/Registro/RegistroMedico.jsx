"use client";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./RegistroMedico.css";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { AuthContext } from "../../context/AuthContext";
import Ubicacion from "../Ubicacion/Ubicacion";
import { toast } from 'react-toastify';

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
    fotoPerfil: null,
  });
  const [errors, setErrors] = useState({
    general: null,
  });
  const [especialidades, setEspecialidades] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, getRole, logout, login } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState(null);


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

        const medicoData = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            nroWhatsapp: formData.nroWhatsapp,
            nroLinea: formData.nroLinea || "",
            contraseña: formData.contraseña,
            especialidad: formData.especialidad,
            matriculaProfesional: formData.matriculaProfesional,
            precioConsulta: Number(formData.precioConsulta),
            ubicacion: formData.ubicacion,
            descripcion: formData.descripcion || ""
        };

        const formDataToSend = new FormData();

        formDataToSend.append('medico', JSON.stringify(medicoData));

        if (formData.fotoPerfil) {
            formDataToSend.append('foto', formData.fotoPerfil);
        }

        const response = await fetch("http://localhost:8080/auth/register/medico", {
            method: "POST",
            body: formDataToSend
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al registrar");
        }

        const data = await response.json();

      login(data.token, data.matricula, data.rol, data.email);
      //login(data.token, data.matricula,`MEDICO`);
      toast.success('🔒 Cuenta creada exitosamente');
      navigate("/");
      scrollTo(0,0);

    } catch (error) {
        setErrors({
            general: error.message || "Error en el registro. Intente nuevamente."
        });
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

          <div className="form-group">
              <label className="form-label">Foto de perfil (opcional)</label>
              <div className="image-upload-container">
                  {previewImage ? (
                      <img src={previewImage} alt="Vista previa" className="image-preview" />
                  ) : (
                      <div className="image-placeholder">

                      </div>
                  )}
                  <input
                      type="file"
                      id="fotoPerfil"
                      name="fotoPerfil"
                      accept="image/*"
                      className="image-input"
                      onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              setFormData({...formData, fotoPerfil: file});
                              setPreviewImage(URL.createObjectURL(file));
                          }
                      }}
                  />
                  <label htmlFor="fotoPerfil" className="image-upload-button">
                      Seleccionar imagen
                  </label>
              </div>
              <p className="form-description">Tamaño recomendado: 400x400px</p>
          </div>

            <div className="form-group">
                        <label className="form-label">Ubicación</label>
                     
                        <Ubicacion
                          
                          onChange={(value) => setFormData({...formData, ubicacion: value})}
                        />
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
