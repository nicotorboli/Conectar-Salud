import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import Layout from "./Layout.jsx"
import RegistroMedico from "./components/RegistroMedico/RegistroMedico";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          {/* <Route path="/" element={<RegistroMedico />}> */}
            {/* <Route index element={<HomePage />} /> */}
            {/* <Route path="/medicos" element={<MedicosPage />} /> */}
            {/* <Route path="/login" element={<LoginForm />} /> */}
            <Route path="/login" element={<RegistroMedico/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
