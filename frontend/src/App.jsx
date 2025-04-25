import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import Layout from "./components/Layoutt/Layout.jsx";
import RegistroMedico from "./components/RegistroMedico/RegistroMedico";
import MedicosPage from "./components/MedicosPage/MedicosPage.jsx"
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Perfil from "./components/Perfil/Perfil.jsx";

const App = () => {
  return (
    <AuthProvider> 
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            {/* <Route path="/" element={<RegistroMedico />}> */}
              {/* <Route index element={<HomePage />} /> */}
              <Route path="/medicos" element={<MedicosPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/registro" element={<RegistroMedico/>} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
