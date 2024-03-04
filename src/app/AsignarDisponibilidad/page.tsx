'use client'
import React, { useState, useEffect } from 'react';
import Cargando from '../components/Cargando';
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

const AsignarDisponibilidad = () => {
    const user = useUser()
    const [profesores, setProfesores] = useState<any[]>([]);

    useEffect(() =>{
    const fetchData =async () => {
        try{
            const resposne = await fetch(`https://horarioslegatto.vercel.app/api/profesores`)
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

if(user.isLoaded){
    if(user.user){
      if(user.user.organizationMemberships.length){
  return (
    <div className="text-center">
    <h4 className="mb-4">Lista de Profesores</h4>
    {profesores ? (
        <ul className="space-y-2"> {/* Agregado space-y-2 para añadir espacio vertical entre elementos */}
            {profesores.map((profesor) => (
                <li key={profesor.id} className="mb-2"> {/* Agregado mb-2 para añadir margen inferior entre elementos */}
                    <Link
                        href={`/AsignarDisponibilidadProfesor/${profesor.id}`}
                        className="block cursor-pointer hover:underline hover:shadow-md"
                    >
                        {profesor.nombre}
                    </Link>
                </li>
            ))}
        </ul>
    ) : (
        <Cargando />
    )}
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

export default AsignarDisponibilidad;
