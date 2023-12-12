'use client'
import { useUser } from "@clerk/nextjs"
import CalendarioProfesor from "../components/CalendarioProfesor"
import Cargando from "../components/Cargando"
import CalendarioClases from "../components/CalendarioClases"

const Asignar = () => {
  const user = useUser()
  if(user.isLoaded){
    if(user.user){
      if(user.user.organizationMemberships.length){
        return (
          <div>
            <h3 className="text-center p-2 ">Disponibilidad de Horarios:</h3>
            <CalendarioProfesor />
            <h3 className="text-center p-2 ">Clases actuales: (haz click para eliminar en la clase)</h3>
            <CalendarioClases />
          </div>
        )
        
      }else{
        
        return(
          <h2 className="text-center p-2 ">Solo administradores pueden asignar clase</h2>
        )
      }
    }
  }else{
    return <Cargando />
  }
}

export default Asignar