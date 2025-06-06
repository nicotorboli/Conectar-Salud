import { useContext, useEffect, useState,useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import WhatsApp from '../../assets/WhatsApp.png'
import TrashIcon from '../../assets/trash.png'
import './Perfil.css'
import editarPerfil from '../../service/editarPerfil'
import Ubicacion from '../Ubicacion/Ubicacion'
import UbicacionViewer from '../Ubicacion/UbicacionViewer'
import Comentario from "../Comentario/Comentario";
import placeholder from  "../../assets/PlaceHolder.png";

const Perfil = () => {
  const { matricula } = useParams()
  const [medico, setMedico] = useState({})
  const [error, setError] = useState(null)
  const [editable, setEditable] = useState(false)
  const { isAuthenticated, getRole, logout } = useContext(AuthContext);
  const[ubiNew, setUbiNew] = useState(null) 
  const [especialidades, setEspecialidades] = useState([])
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleEdit = async () => {
    if (editable) {

          const confirmacion = window.confirm('¿Estás seguro de que querés guardar los cambios?');

      if (confirmacion) {
          const medicoABase = {
              ...medico,
              nombre: document.querySelector(".perfil-medico-nombre").innerHTML,
              apellido:document.querySelector(".perfil-medico-apellido").innerHTML,
              precioConsulta:document.querySelector(".perfil-info-item-precio").innerHTML,
              email:document.querySelector(".perfil-info-item-email").textContent.trim(),
              descripcion:document.querySelector(".perfil-descripcion-d").innerHTML,
              ubicacion:ubiNew
              }
              medico.ubicacion = ubiNew;
            try {
             await editarPerfil(medicoABase);

             setEditable(false);
             alert("Perfil actualizado correctamente");
           } catch (error) {
             alert(`Error: ${error.message}`);
             document.querySelector(".perfil-info-item-email").textContent = medico.email;
           }
         }
    } else {
      setEditable(true)
    }
  }

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

  if (!validTypes.includes(file.type)) {
    alert('Por favor, sube una imagen en formato PNG, JPG, JPEG o GIF');
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert('La imagen no debe superar los 10MB');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result.split(',')[1];
    setMedico(prev => ({
      ...prev,
      fotoPerfil: base64String
    }));
  };
  reader.readAsDataURL(file);
};

    const triggerFileInput = () => {
      if (editable) {
        fileInputRef.current.click()
      }
    }

  const handleDelete = () => {
    const confirmacion = window.confirm('¿Estás seguro de que querés eliminar tu cuenta?')
    if (confirmacion) {
      fetch(`http://localhost:8080/medicos/matricula/${matricula}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            alert('Cuenta eliminada con éxito')
            logout()
            navigate('/')
          } else {
            alert('Error al eliminar la cuenta')
          }
        })
        .catch((err) => console.error(err))
    }
  }

  useEffect(() => {
    fetch('http://localhost:8080/medicos/especialidades')
      .then((res) => res.json())
      .then((data) => setEspecialidades(data))
  }, [])


  const handleChange = (e) => {
    setMedico({
      ...medico,
      especialidad: e.target.value,
    })
  }

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const resp = await fetch(
          `http://localhost:8080/medicos/matricula/${matricula}`
        )
        const medicoData = await resp.json()
        setMedico(medicoData)

        setUbiNew(medicoData.ubicacion)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchMedico()
  }, [matricula])

  return (
    <div className='perfil-container'>
      <button className='perfil-edit-button' onClick={handleEdit}>
        {editable ? 'Guardar Cambios' : 'Editar Perfil'}
      </button>
      <button className='perfil-delete-account-button'>
        <img src={TrashIcon} alt='Eliminar cuenta' onClick={handleDelete}/>
      </button>
      <div className='perfil-header'>
  <div
    onClick={triggerFileInput}
    style={{ cursor: editable ? 'pointer' : 'default', position: 'relative' }}
  >
    {medico.fotoPerfil ? (
      <img
        src={`data:image/jpeg;base64,${medico.fotoPerfil}`}
        alt={`${medico.nombre} ${medico.apellido}`}
        className="avatar-imagen"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholder;
        }}
      />
    ) : (
     <img
             src={`data:image/jpeg;base64,${medico.fotoPerfil}`}
             alt={`${medico.nombre} ${medico.apellido}`}
             className="avatar-imagen"
             onError={(e) => {
               e.target.onerror = null;
               e.target.src = placeholder;
             }}
           />
    )}
    {/* Añade este input */}
<input
  type="file"
  ref={fileInputRef}
  onChange={handleImageChange}
  accept=".png,.jpg,.jpeg,.gif"
  style={{ display: 'none' }}
/>
    {/* Overlay para indicar que se puede editar */}
    {editable}
  </div>
        <div className='perfil-avatar-nombreCompleto'>
          <h2 className='perfil-medico-nombre' contentEditable={editable} >
            {medico.nombre}
          </h2>
          <h2 className='perfil-medico-apellido' contentEditable={editable} >
            {medico.apellido}
          </h2>
        </div>
        {editable ? (
          <select
            name='especialidad'
            className='perfil-medico-especialidad'
            value={medico.especialidad}
            onChange={handleChange}
          >
            <option value=''>
              {medico.especialidad
                ? medico.especialidad
                : 'Seleccione una especialidad Perfil'}
            </option>
            {especialidades.map((esp) => (
              <option key={esp.valor} value={esp.valor}>
                {esp.display}
              </option>
            ))}
          </select>
        ) : (
          <p className='perfil-medico-especialidad'>{medico.especialidad}</p>
        )}
      </div>
      <div className='perfil-info-content'>
      <div className='perfil-body'>
        <div className='perfil-info-item'>
          <span>🩺</span>
          <p>{medico.matriculaProfesional}</p>
        </div>
        
        <div className='perfil-info-item'>
          <span>$</span>
          <p className="perfil-info-item-precio" contentEditable={editable}>{medico.precioConsulta}</p>
        </div>
        <div className='perfil-info-item'>
          <span>📩</span>
          <p className="perfil-info-item-email" contentEditable={editable}>{medico.email}</p>
        </div>
        <div className='perfil-info-item'>
          <span>📞</span>
          <p>{medico.nroLinea || 'no hay numero de linea.'}</p>
        </div>
        <div className='perfil-info-item'>
          <img src={WhatsApp} alt='WhatsApp' className='contact-icon' />
          <p>{medico.nroWhatsapp || 'no hay numero de WhatsApp.'}</p>
        </div>
        <div className='perfil-descripcion'>
          <h4>Descripción</h4>
          <p className='perfil-descripcion-d' contentEditable={editable}>
            {medico.descripcion || 'Este médico aún no agregó una descripción.'}
          </p>
           {medico.id && <Comentario medicoId={medico.id} mostrarCreacion={false} />}
          <button className='perfil-logout-button' onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>

      </div>
      <div className='perfil-ubicacion'>
          {editable ? <Ubicacion value={medico.ubicacion} onChange={(value) => {setUbiNew(value)}}> </Ubicacion>:
          <UbicacionViewer direccion={medico.ubicacion} ></UbicacionViewer>}
      </div>
      </div>
    </div>
  )
}

export default Perfil
