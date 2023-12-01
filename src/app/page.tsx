'use client'

import BotonDisponibilidad from "./components/BotonDisponibilidad"
import BotonEliminarDisponibilidad from "./components/BotonEliminarDisponibilidad"
import CalendarioSemanal from "./components/CalendarioSemanal"
import Pendientes from "./components/pendientes"

const HomePage = () => {

  return (
    <div>
      <Pendientes />
      <CalendarioSemanal />
      <div className="flex flex-row justify-center items-center">
        <BotonDisponibilidad />
        <BotonEliminarDisponibilidad />
      </div>
    </div>
  )
}

export default HomePage