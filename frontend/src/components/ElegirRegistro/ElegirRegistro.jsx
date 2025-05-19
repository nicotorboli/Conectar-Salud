import { Link } from "react-router-dom"
import "./ElegirRegistro.css"

export function ElegirRegistro() {
  return (
    <div className="elegir-registro-container">
      <div className="elegir-registro-header">
        <h1 className="elegir-registro-title">Crear una cuenta</h1>
        <p className="elegir-registro-description">
          Seleccione el tipo de cuenta que desea crear para comenzar a utilizar ConectarSalud.
        </p>
      </div>

      <div className="elegir-registro-options">
        <div className="registro-option">
          <div className="option-icon doctor-icon">
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
            >
              <path d="M8.56 3.69a9 9 0 0 0-2.92 1.95" />
              <path d="M3.69 8.56A9 9 0 0 0 3 12" />
              <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
              <path d="M8.56 20.31A9 9 0 0 0 12 21" />
              <path d="M15.44 20.31a9 9 0 0 0 2.92-1.95" />
              <path d="M20.31 15.44A9 9 0 0 0 21 12" />
              <path d="M20.31 8.56a9 9 0 0 0-1.95-2.92" />
              <path d="M15.44 3.69A9 9 0 0 0 12 3" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <h2 className="option-title">Soy médico</h2>
          <p className="option-description">
            Cree una cuenta profesional para ofrecer sus servicios médicos.
          </p>
          <Link to="/registro" className="option-button doctor-button">
            Registrarme como médico
          </Link>
        </div>

        <div className="registro-option">
          <div className="option-icon patient-icon">
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
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2 className="option-title">Soy paciente</h2>
          <p className="option-description">
            Cree una cuenta para conocer y dar feedback a médicos de la Web.
          </p>
          <Link to="/registroPaciente" className="option-button patient-button">
            Registrarme como paciente
          </Link>
        </div>
      </div>
    </div>
  )
}
