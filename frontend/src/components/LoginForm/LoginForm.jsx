import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    contraseña: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:8080/auth/login/medico", {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        });
    
    if (response.ok) { 
      navigate("/")
    }
  };

  return (
    <div className="registro-medico-card">
      <div className="registro-medico-header">
        <h2 className="registro-medico-title">Iniciar Sesión</h2>
        <p className="registro-medico-description">
          Ingresá con tu cuenta existente para continuar.
        </p>
      </div>
      <div className="registro-medico-content">
        <form className="registro-medico-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              id="contraseña"
              className="form-input"
              value={formData.contraseña}
              onChange={handleChange}
            />
            {errors.contraseña && <p className="form-error">{errors.contraseña}</p>}
          </div>

          <button type="submit" className="submit-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
      <div className="registro-medico-footer">
        <p className="login-link">
          ¿No tenés una cuenta?{" "}
          <a href="/registro" className="login-link-text">
            Registrate acá
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
