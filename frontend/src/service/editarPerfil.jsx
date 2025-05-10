const editarPerfil = async (medico) => {
  const response = await fetch(`http://localhost:8080/medicos`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medico),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Solo si hay error (backend devuelve ErrorResponse)
    throw new Error(errorData.message); // Lanza el mensaje del backend
  }

  // Si la respuesta es exitosa (200) pero no tiene cuerpo:
  return null; // O devuelve un objeto vacío: return {};
};

  export default editarPerfil

  /*
  const editarPerfil = async (medico) => {
      await fetch(`http://localhost:8080/medicos`, {
       method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(medico),
      })
        .then((response) => response.json())
       .catch((error) => console.error('Error:', error))

      return { medico }
    }
  */