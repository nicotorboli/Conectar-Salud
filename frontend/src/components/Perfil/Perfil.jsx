import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import WhatsApp from '../../assets/WhatsApp.png'
import './Perfil.css'

const Perfil = () => {
  const { matricula } = useParams()
  const [medico, setMedico] = useState({})
  const [error, setError] = useState(null)

  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const resp = await fetch(
          `http://localhost:8080/medicos/matricula/${matricula}`
        )
        const medicoData = await resp.json()
        setMedico(medicoData)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchMedico()
  }, [matricula])

  return (
    <div className='perfil-container'>
      <div className='perfil-header'>
        <div className='perfil-avatar-placeholder'></div>
        <div>
          <h2 className='perfil-medico-nombre'>
            {medico.nombre} {medico.apellido}
          </h2>
          <p className='perfil-medico-especialidad'>{medico.especialidad}</p>
        </div>
      </div>
      <div className='perfil-body'>
        <div className='perfil-info-item'>
          <span>🩺</span>
          <p>{medico.matriculaProfesional}</p>
        </div>
        <div className='perfil-info-item'>
          <span>📍</span>
          <p>{medico.ubicacion}</p>
        </div>
        <div className='perfil-info-item'>
          <span>$</span>
          <p>{medico.precioConsulta}</p>
        </div>
        <div className='perfil-info-item'>
          <span>📩</span>
          <p>{medico.email}</p>
        </div>
        <div className='perfil-info-item'>
          <span>📞</span>
          <p >{medico.nroLinea || 'no hay numero de linea.'}</p>
        </div>
        <div className='perfil-info-item'>
          <img
            src={WhatsApp}
            alt='WhatsApp'
            className='contact-icon'
          />
          <p>{medico.nroWhatsapp || 'no hay numero de WhatsApp.'}</p>
        </div>
        <div className='perfil-descripcion'>
          <h4>Descripción</h4>
          <p>{medico.descripcion || 'Este médico aún no agregó una descripción.'}</p>
          <button className='perfil-logout-button' onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default Perfil
