'use client'
import { useEffect, useState } from "react"
import Cargando from "./Cargando";

const ListaProfesores = () => {

    const [profesores, setProfesores] = useState<Profesores[]>()
    const [error, setError] = useState<Error | null>(null);

    useEffect(() =>{
        const fetchData =async () => {
            try{
                const resposne = await fetch(`http://localhost:3000/api/profesores`)
                if(!resposne.ok){
                    throw new Error('No se pudo econtrar los profesrores')
                }
                const data = await resposne.json()
                setProfesores(data.profesores)
            }catch (error) {
                console.error((error as Error).message);
            } 
        }
        fetchData()
    }, [])


  return (
    <div>
        <h4 className="text-center">Profesores: </h4>
        {profesores ?
            (profesores.length > 0 ? (
                <ul>
                  {profesores.map((profesor) => (
                    <li key={profesor.id}>
                      {profesor.nombre} {profesor.apellido} <span>Elegir</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No se encontraron profesores en la Base de Datos</p>
              ))
            :
            (<Cargando />)
        }

    </div>
  )
}

export default ListaProfesores