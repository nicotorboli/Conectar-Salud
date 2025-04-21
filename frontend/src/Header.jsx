import CSLogo from "./assets/CSLogo(mini).png";
import { useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./components/search/SearchBar.jsx";
import { useNavigate } from "react-router-dom";

function Header() {
  const [pathname, setPathname] = useState()
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    setPathname(location.pathname)
  }, [location])

  return (
    <div >
      <header className="header">
          <div className="logo-container">
            <img src={CSLogo} />
            <span className="app-title">ConectarSalud</span>
          </div>

          <SearchBar onSearch={({ searchText, searchOption }) => {
            if (searchText && searchOption) {
              navigate(`/login`)
              navigate(`/medicos?caracteristica=${searchOption.toLowerCase()}&filter=${searchText}`);
            }
          }} />
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
      </header>
    </div>
  );
}

export default Header;
