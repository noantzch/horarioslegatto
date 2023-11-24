'use client'
import CalendarioSemanal from "./components/CalendarioSemanal"
import Pendientes from "./components/pendientes"

const HomePage = () => {
  return (
    <div>
      <Pendientes />
      <CalendarioSemanal />
    </div>
  )
}

export default HomePage