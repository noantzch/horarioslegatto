'use client'
import { useUser } from "@clerk/nextjs"
import CalendarioProfesor from "../components/CalendarioProfesor"
import ListaProfesores from "../components/ListaProfesores"
import Cargando from "../components/Cargando"

const Asignar = () => {
  const user = useUser()
  if(user.isLoaded){
    if(user.user){
      if(user.user.organizationMemberships[0].role == "admin"){
        return (
          <div>
            <h3 className="text-center p-2 ">Disponibilidad de Horarios:</h3>
            <CalendarioProfesor />
          </div>
        )
        
      }else{
        <h2>Solo administradores pueden asignar clase</h2>
      }
    }
  }else{
    return <Cargando />
  }
}

export default Asignar