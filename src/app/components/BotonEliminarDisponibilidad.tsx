import React, { useEffect, useState } from 'react'
import { IoIosClose } from "react-icons/io";

const BotonEliminarDisponibilidad = () => {
const [showForm, setShowForm] = useState<boolean>(false);
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleClick = () => {
    setShowForm(!showForm);
  };
  const deleteData = async (id: number) => {
    try {
      const response = await fetch('/api/disponibilidad', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Corregir la tipografía en "application/json"
        },
        body: JSON.stringify({ id }), // Envolvemos el ID en un objeto
      });
  
      if (response.ok) {
        console.log('Disponibilidad eliminada');
        handleClick();
        window.location.reload();
      } else {
        console.error('Error al eliminar');
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE: ', error);
    }
  };
  
  const handleEliminar = (id:number) =>{
    deleteData(id)
  }

  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadCalendario[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() =>{
    const fetchData = async () => {
        try{
            const response = await fetch('http://localhost:3000/api/disponibilidad?id=1')
            if(!response.ok){
                throw new Error('No se pudo obtener');
            }
            const data = await response.json();
            setDisponibilidad(data.disponibilidad)
        }catch(error){
            setError((error as Error))
        }
    }
    fetchData();
}, []);

  return (
    <div>
        <button
        onClick={handleClick}
        className="bg-red-400 p-4 rounded hover:bg-red-600 transition duration-300 ease-in-out text-white m-7 text-xl"
      >
        Eliminar Disponibilidad
      </button>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-4 relative"  style={{ zIndex: 1000 }}>
            <button
              onClick={handleCloseForm}
              className="absolute top-0 right-0 p-1"
            >
              <IoIosClose />
            </button>
                {disponibilidad ?
                        (disponibilidad.map((horario) => (
                          <div key={horario.id} className='border border-solid  p-1 m-1' >
                              <p>{horario.dia}</p>
                              <p>De {horario.hora_inicio} a {horario.hora_cierre}</p>
                              <button onClick={() =>handleEliminar(horario.id)} className='bg-red-400 p-1 rounded hover:bg-red-600 transition duration-300 ease-in-out text-white text-sm'>Eliminar</button>
                          </div>
                      )))
                      :
                        <p className=' text-center'>No se encontraron horarios disponibles</p>
                  }
          </div>
        </div>
      )}

    </div>
  )
}

export default BotonEliminarDisponibilidad