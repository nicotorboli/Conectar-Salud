import CSLogo from "./assets/CSLogo(mini).png";
import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header({ children }) {
  const [pathname, _] = useState(window.location.pathname);
  console.log(pathname);

  return (
    <div >
      <header className="header">
        <div className="container header-container">
          <div className="logo-container">
            <img src={CSLogo} />
            <span className="app-title">ConectarSalud</span>
          </div>
          <nav className="main-nav">
            <Link to={'/'}
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
            >
              Inicio
            </Link>
            <Link to={'/medicos'}
              href="/medicos"
              className={`nav-link ${pathname === "/medicos" ? "active" : ""}`}
            >
              Médicos
            </Link>
            <Link to={'/login'}
              href="/login"
              className={`nav-link ${pathname === "/login" ? "active" : ""}`}
            >
              Iniciar Sesión
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
