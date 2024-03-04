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
            <ul>
                {profesores.map((profesor) => (
                    <Link
                        href={`/AsignarDisponibilidad/${profesor.id}`}
                        key={profesor.id}
                        className="cursor-pointer hover:underline hover:shadow-md"
                    >
                        {profesor.nombre}
                    </Link>
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
