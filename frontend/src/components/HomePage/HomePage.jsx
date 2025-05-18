import "./HomePage.css";
import medicoInicioImagen from '../../assets/medico-inicio.jpg';
import usuarioImagen from '../../assets/cliente.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import CSLogo from '../../assets/CSLogo-mini.png';
import { AuthContext } from '../../context/AuthContext.jsx'

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate();
  const irAMedicos = () => {
    navigate('/medicos');
  };
  const irAGestionDeUsuario = () => {
    const destino = isAuthenticated ? `/perfil/${localStorage.matricula}` : `/login`
    navigate(destino)
  }
  return (
    <div id="main-container">
      <div id="brand-container">
        <img
          src={CSLogo}
          alt="logo"
          id="logo"
        />
        <div>
          <h2 id="CS-titulo">CONECTAR</h2>
          <h2 id="CS-titulo">SALUD</h2>
        </div>
      </div>
      <div id="banner">
      <h4 className="titulo">Tu acceso directo a médicos confiables y especializados.</h4>
        <p id="texto">
          Conectar Salud es una plataforma innovadora que conecta a pacientes con profesionales de la salud matriculados, de forma rápida, segura y sin intermediarios.
          Olvidate de largas esperas o procesos engorrosos: encontrá al médico ideal según tu necesidad y accedé a atención de calidad en el momento justo. 
        </p> <br />
      </div>
      <div id="call-to-action">
        <h4 className="titulo"> ¿Por donde comenzamos?</h4>
         <span id="a">
            <button class="btn gestionar-user" onClick={irAGestionDeUsuario}>
                <span class="btn-text-one">Gestionar mi usuario</span>
                <span class="btn-text-two">Crear o inicia con tu cuenta</span>
            </button>
            <span className="btn-tooltip-container">
              <button class="btn" onClick={irAMedicos}>
                  <span class="btn-text-one">Solo quiero ver</span>
                  <span class="btn-text-two">Ver médicos</span>
              </button>
               <div class="tooltip">❗ Algunas acciones como conectar con un médico requerirán un inicio de sesión</div>
            </span>
          </span>
        <div id="container-tipos-de-usuarios">
          <div className="seccion-tipo-usuario">
            <p className="titulo">¡Impulsa tu carrera con nosotros!</p>
            <div className="info-container">
              <img
                src={medicoInicioImagen}
                alt="Médico"
                className="imagen-tipo-usuario"
              />
              <div class="texto-datos">
                💊 Amplía tu cartera de pacientes de forma segura<br/>
                💊 Consultas presenciales y virtuales integradas<br/>
                💊 Perfil profesional verificado y destacado<br/>
                💊 Cobros automáticos y transparentes
              </div>
            </div>
          </div>

          <div className="seccion-tipo-usuario">
            <p className="titulo">Tu salud en buenas manos</p>
            <div className="info-container">
              <img
                src={usuarioImagen}
                alt="Médico"
                className="imagen-tipo-usuario"
              />
              <div class="texto-datos">
                🩹 Acceso a profesionales certificados<br/>
                🩹 Sistema de calificaciones transparente<br/>
                🩹 elegi la zona donde queres atenderte<br/>
                🩹 encontra a los mejores medicos<br/>
                🩹 Disposición 27/7 desde tu casa<br/>
              </div>
            </div>
          </div>
           
        </div>
      </div>

    </div>
  );
}

export default HomePage;
