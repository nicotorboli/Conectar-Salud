import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistroMedico.css";
import { AuthContext } from "../../context/AuthContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { toast } from 'react-toastify';

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({

    email: "",
    password: "",

  });
  const [errors, setErrors] = useState({ general: null });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/register/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar");
      }

      login(data.token, data.matricula, data.rol, data.email);
      toast.success('🔒 Debés iniciar sesión para dar like.');
      navigate("/");
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="registro-medico-card">
      <div className="registro-medico-header">
        <h2 className="registro-medico-title">Crear cuenta de paciente</h2>
        <p className="registro-medico-description">
          Completá tus datos personales para registrarte.
        </p>
      </div>
      <div className="registro-medico-content">
        <form className="registro-medico-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
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
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>


          {errors.general && <ErrorMessage message={errors.general} />}

          <button type="submit" className="submit-button">
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroUsuario;