import { useState , useContext} from 'react'
import { AuthContext } from "../../context/AuthContext";
const useGetMatricula = () => {

  const {matricula} = useContext(AuthContext);

//   fetch(`http://localhost:8080/api/medicos/matricula`)
//     .then((response) => response.json())
//     .then((data) => setMatricula(data.matricula))
//     .catch((error) => console.error('Error:', error))

  return { matricula }
}

export default useGetMatricula
