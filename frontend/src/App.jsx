import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import Layout from "./Layout.jsx"
import RegistroMedico from "./components/RegistroMedico/RegistroMedico";
import MedicosPage from "./components/MedicosPage/MedicosPage.jsx"
import LoginForm from "./components/LoginForm/LoginForm.jsx";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          {/* <Route path="/" element={<RegistroMedico />}> */}
            {/* <Route index element={<HomePage />} /> */}
            <Route path="/medicos" element={<MedicosPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registro" element={<RegistroMedico/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
