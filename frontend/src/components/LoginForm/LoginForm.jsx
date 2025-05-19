import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({general: null,});
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {

        const response = await fetch("http://localhost:8080/auth/login", {
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
        console.log(data)

        login(data.token, data.matricula, data.rol, formData.email);

        navigate("/")
      } catch (error) {
        setErrors({ general: error.message });
      }
    }
  
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
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
          {errors.general && <ErrorMessage message={errors.general} />}
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
