import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import Layout from "./components/Layoutt/Layout.jsx";
import RegistroMedico from "./components/Registro/RegistroMedico";
import RegistroUsuario from "./components/Registro/RegistroUsuario";
import SeleccionTipoRegistro from "./components/Registro/SeleccionTipoRegistro";
import MedicosPage from "./components/MedicosPage/MedicosPage.jsx"
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Perfil from "./components/Perfil/Perfil.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import { GoogleMapsProvider } from "./context/GoogleMapsProvider.jsx";

const App = () => {
  return (
    <GoogleMapsProvider>
    <AuthProvider> 
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {<Route index element={<HomePage />} />}
              <Route path="/medicos" element={<MedicosPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/registro" element={<SeleccionTipoRegistro />} />
              <Route path="/registro/usuario" element={<RegistroUsuario />} />
              <Route path="/registro/medico" element={<RegistroMedico />} />
              <Route path="/perfil/:matricula" element={<Perfil />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
    </GoogleMapsProvider>
  );
}

export default App;
