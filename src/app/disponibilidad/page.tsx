'use client'
import BotonDisponibilidad from "../components/BotonDisponibilidad"
import BotonEliminarDisponibilidad from "../components/BotonEliminarDisponibilidad"
import CalendarioDisponibilidad from "../components/CalendarioDisponibilidad"

const Disponibilidad = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center">
        <BotonDisponibilidad />
        <BotonEliminarDisponibilidad />
      </div>
        <CalendarioDisponibilidad />
    </div>
  )
}

export default Disponibilidad