import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import WhatsApp from '../../assets/WhatsApp.png'
import './Perfil.css'

const Perfil = () => {
  const { matricula } = useParams()
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [nroWhatsapp, setNroWhatsapp] = useState('')
  const [nroLinea, setNroLinea] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [matriculaProfesional, setMtriculaProfesional] = useState('')
  const [precioConsulta, setPecioConsulta] = useState(0)
  const [ubicacion, setUbicacion] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [error, setError] = useState(null)

  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout() // actualiza el contexto y borra el token
    navigate('/') // redirecciona al inicio
  }

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const resp = await fetch(`http://localhost:8080/medicos/matricula/${matricula}`)
        const medicoData = await resp.json()
        setNombre(medicoData.nombre)
        setApellido(medicoData.apellido)
        setEmail(medicoData.email)
        setNroWhatsapp(medicoData.nroWhatsapp)
        setNroLinea(medicoData.nroLinea)
        setEspecialidad(medicoData.especialidad)
        setMtriculaProfesional(medicoData.matriculaProfesional)
        setPecioConsulta(medicoData.precioConsulta)
        setUbicacion(medicoData.ubicacion)
        setDescripcion(medicoData.descripcion)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchMedico()
  }, [matricula])

  return (
    <div className='perfil-container'>
      <div className="perfil-header">
        <div className='perfil-avatar-placeholder'></div>
        <div>
        <h2 className='perfil-medico-nombre'>
            {nombre} {apellido}
          </h2>
          <p className='perfil-medico-especialidad'>{especialidad}</p>
        </div>
      </div>
      <div className='perfil-body'>
        <div className='perfil-info-item'>
          <span>🩺</span>
          <p>{matriculaProfesional}</p>
        </div>
        <div className='perfil-info-item'>
          <span>📍</span>
          <p>{ubicacion}</p>
        </div>
        <div className='perfil-info-item'>
          <span>$</span>
          <p>{precioConsulta}</p>
        </div>
        <div className='perfil-info-item'>
          <span>📩</span>
          <p>{email}</p>
        </div>
        <div className='perfil-info-item'>
          <span>📞</span>
          <p>{nroLinea || 'no hay numero de linea.'}</p>
        </div>
        <div className='perfil-info-item'>
          <img src={WhatsApp} alt='WhatsApp' className='contact-icon' />
            {nroWhatsapp}
        </div>
        <div className='perfil-descripcion'>
          <h4>Descripción</h4>
          <p>{descripcion || 'Este médico aún no agregó una descripción.'}</p>
          <button className='perfil-logout-button' onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Perfil
