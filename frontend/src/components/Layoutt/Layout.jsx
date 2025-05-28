import "./Layout.css";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import { Outlet, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="app">
      <Header children={children} />

      <main className={`main-content ${isHome ? "main-content-home" : ""}`}>
        <div className="content">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
