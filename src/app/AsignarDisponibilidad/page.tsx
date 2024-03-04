'use client'
import React, { useState, useEffect } from 'react';
import Cargando from '../components/Cargando';

const AsignarDisponibilidad = () => {
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

  const handleItemClick = (id: number) => {
    // Acción al hacer clic en un profesor (puedes cambiar esto según tus necesidades)
    alert(`Hiciste clic en el profesor con ID: ${id}`);
  };

  return (
    <div>
    <h4>Lista de Profesores</h4>
    {profesores ?
    <ul>
        {profesores.map((profesor) => (
            <li key={profesor.id} onClick={() => handleItemClick(profesor.id)}>
            {profesor.nombre}
            </li>
            ))}
    </ul>
    :
            <Cargando />
    }
    </div>
  );
};

export default AsignarDisponibilidad;
