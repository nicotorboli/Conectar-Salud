import "./Layout.css";
import Footer from "./Footer";
import Header from "./Header.jsx";
import { Outlet } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="app">
      <Header children={children} />

      <main className="main-content">
        <div className="content">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
