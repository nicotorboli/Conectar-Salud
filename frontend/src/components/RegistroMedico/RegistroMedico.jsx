"use client";

import { useState } from "react";
import "./RegistroMedico.css";

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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres.";
    }

    if (formData.apellido.length < 2) {
      newErrors.apellido = "El apellido debe tener al menos 2 caracteres.";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Por favor ingrese un email válido.";
    }

    if (formData.contraseña.length < 8) {
      newErrors.contraseña = "La contraseña debe tener al menos 8 caracteres.";
    }

    if (!formData.especialidad) {
      newErrors.especialidad = "Por favor seleccione una especialidad.";
    }

    if (formData.ubicacion.length < 5) {
      newErrors.ubicacion = "Por favor ingrese una ubicación válida.";
    }

    if (!formData.precioConsulta) {
      newErrors.precioConsulta = "Por favor ingrese el precio de la consulta.";
    }

    if (formData.matriculaProfesional.length < 3) {
      newErrors.matriculaProfesional =
        "Por favor ingrese su número de matrícula profesional.";
    }

    if (formData.nroWhatsapp.length < 8) {
      newErrors.nroWhatsapp = "Por favor ingrese un número de WhatsApp válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // if (!validateForm()) {
    //   return;
    // }

    setIsLoading(true);

    // Simulación de envío de datos
    const response = await fetch("http://localhost:8080/register/medico", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      
    });
    const data = await response.json();
    console.log(data);
    
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
              />
              {errors.nombre && <p className="form-error">{errors.nombre}</p>}
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
              />
              {errors.apellido && (
                <p className="form-error">{errors.apellido}</p>
              )}
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
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="form-description">Mínimo 8 caracteres</p>
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                placeholder="Ej: +54 9 11 5555-5555"
                className="form-input"
                value={formData.whatsapp}
                onChange={handleChange}
              />
              {errors.whatsapp && (
                <p className="form-error">{errors.whatsapp}</p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono (opcional)</label>
              <input
                type="text"
                name="telefono"
                placeholder="Ej: 011 4242-4242"
                className="form-input"
                value={formData.telefono}
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
              <option value="medicina_general">Medicina General</option>
              <option value="cardiologia">Cardiología</option>
              <option value="dermatologia">Dermatología</option>
              <option value="neurologia">Neurología</option>
              <option value="pediatria">Pediatría</option>
              <option value="psiquiatria">Psiquiatría</option>
              <option value="ginecologia">Ginecología</option>
              <option value="oftalmologia">Oftalmología</option>
              <option value="traumatologia">Traumatología</option>
              <option value="otra">Otra</option>
            </select>
            {errors.especialidad && (
              <p className="form-error">{errors.especialidad}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Matrícula profesional</label>
            <input
              type="text"
              name="matricula"
              placeholder="Ej: MP-12345"
              className="form-input"
              value={formData.matricula}
              onChange={handleChange}
            />
            <p className="form-description">
              Ingrese su número de matrícula profesional
            </p>
            {errors.matricula && (
              <p className="form-error">{errors.matricula}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Precio de consulta</label>
              <input
                type="text"
                name="precioConsulta"
                placeholder="Ej: $5000"
                className="form-input"
                value={formData.precioConsulta}
                onChange={handleChange}
              />
              {errors.precioConsulta && (
                <p className="form-error">{errors.precioConsulta}</p>
              )}
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
              />
              {errors.ubicacion && (
                <p className="form-error">{errors.ubicacion}</p>
              )}
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
      </div>
      <div className="registro-medico-footer">
        <div className="login-link">
          ¿Ya tiene una cuenta?{" "}
          <a href="/login" className="login-link-text">
            Iniciar sesión
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegistroMedico;
