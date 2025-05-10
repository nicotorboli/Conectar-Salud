const editarPerfil = async (medico) => {
  const response = await fetch(`http://localhost:8080/medicos`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medico),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }


  return null;
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