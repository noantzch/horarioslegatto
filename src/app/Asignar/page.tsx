'use client'
import CalendarioProfesor from "../components/CalendarioProfesor"
import ListaProfesores from "../components/ListaProfesores"

const Asignar = () => {
  return (
    <div>
      <h3 className="text-center p-2 ">Disponibilidad de Horarios:</h3>
      <CalendarioProfesor />
{/*       <ListaProfesores /> */}
    </div>
  )
}

export default Asignar