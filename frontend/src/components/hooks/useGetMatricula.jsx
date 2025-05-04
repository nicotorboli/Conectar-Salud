import { useState } from 'react'

const useGetMatricula = () => {
  const [matricula, setMatricula] = useState('MP-1515')

//   fetch(`http://localhost:8080/api/medicos/matricula`)
//     .then((response) => response.json())
//     .then((data) => setMatricula(data.matricula))
//     .catch((error) => console.error('Error:', error))

  return { matricula }
}

export default useGetMatricula
