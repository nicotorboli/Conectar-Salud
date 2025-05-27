"use client"

import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext.jsx"
import "./HomePage.css"
import CSLogo from '../../assets/CSLogo-mini.png';

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  const irAMedicos = () => {
    navigate("/medicos")
  }

  const irAGestionDeUsuario = () => {
    const destino = isAuthenticated ? `/perfil/${localStorage.matricula}` : `/login`
    navigate(destino)
  }

  return (
    <div className="homepage-container">
      
      <main className="homepage-main">
        <section className="hero-section">
          <div className="container hero-content">
            <div className="hero-grid">
              <div className="hero-text">
                <div className="hero-title-section">
                  <h1 className="hero-title">Conectando médicos y pacientes</h1>
                  <p className="hero-description">
                    La plataforma que facilita el acceso a servicios médicos de calidad de forma rápida, segura y sin intermediarios.
                  </p>
                </div>
                <div className="hero-buttons">
                  <button className="btn btn-primary" onClick={irAMedicos}>
                    Ver médicos
                  </button>
                  <button className="btn btn-secondary" onClick={irAGestionDeUsuario}>
                    {isAuthenticated ? "Mi perfil" : "Registrarse"}
                  </button>
                </div>
              </div>
              <div className="hero-logo">
                <div className="large-logo-container">
                  <div className="large-logo">
                    <img src={CSLogo || "/placeholder.svg"} alt="ConectarSalud Logo" className="logo-image" />
                  </div>
                  <div className="brand-text-container">
                    <h2 className="brand-text">ConectarSalud</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services-section">
          <div className="container services-content">
            <div className="services-header">
              <div className="services-badge">Nuestros servicios</div>
              <h2 className="services-title">Todo lo que necesitas</h2>
              <p className="services-description">
                ConectarSalud ofrece soluciones tanto para pacientes como para profesionales médicos.
              </p>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="service-icon"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <h3 className="service-card-title">Encuentra especialistas</h3>
                <p className="service-card-description">
                  Accede a una amplia red de médicos especialistas en diferentes áreas.
                </p>
              </div>
              <div className="service-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="service-icon"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                <h3 className="service-card-title">Gestiona tus citas</h3>
                <p className="service-card-description">
                  Programa, reprograma y cancela citas médicas de forma sencilla.
                </p>
              </div>
              <div className="service-card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="service-icon"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <h3 className="service-card-title">Historial médico</h3>
                <p className="service-card-description">
                  Accede a tu historial médico y compártelo con tus médicos de forma segura.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default HomePage
