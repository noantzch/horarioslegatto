'use client'
import { formatearFecha } from '@/ts/fecha';
import React, { useEffect, useState } from 'react';
import PendientesButton from './pendientesButton';
import { useUser } from '@clerk/nextjs';
import { getId } from '@/ts/getId';

const Pendientes = () =>{
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [error, setError] = useState<Error | null>(null);
   //ID
   const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<number| null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          return;
        }

        const userId: string | null = user.id || null;
        const fetchedId = await getId(userId);
        setId(fetchedId);
      } catch (error) {
        console.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  //get asistencias
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (id === null || id === undefined) {
            // Puedes decidir qué hacer si id es null o undefined
            console.log('Cargando');
            return;
          }
          const response = await fetch(`http://localhost:3000/api/asistencia?id=${id}`); 
            if (!response.ok) {
              throw new Error('No se pudo obtener la información');
            }
          const data = await response.json();
          setAsistencias(data.asistencias);
        } catch (error) {
          setError((error as Error))}
      };
  
      fetchData();
    }, [id]); 
  
    if (error) {
      return <p className='text-center p-6'>No tienes asistencias pendientes</p>;
    }
    return(
        <div>
            <div className='w-full flex flex-col mb-6 p-5'>
              <h2 className='font-semibold text-lg p-4 text-center'>Pendientes de Asistencia</h2>
              <table className="w-auto">
                <thead>
                  <tr className='border border-solid border-l-o'>
                    <th className='text-md px-6 py-3'>Fecha</th>
                    <th className='text-md px-6 py-3'>Alumno</th>
                    <th className='text-md px-6 py-3'>Confirmación</th>
                  </tr>
                </thead>

                <tbody>
                  {asistencias ? (
                    asistencias.map((asistencia) => (
                      <tr key={asistencia.id} className='border border-solid border-l-o'>
                        <td className='text-md px-6 py-1 text-center'>{formatearFecha(asistencia.fecha)}</td>
                        <td className='text-md px-6 py-1 text-center'>{`${asistencia.nombre} ${asistencia.apellido}`}</td>
                        <td className='text-md px-6 py-1 text-center'><PendientesButton asistencia={asistencia}/></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className='text-center'>No hay asistencias pendientes</td>
                    </tr>
                  )}
                </tbody>
              </table>


            </div>
            <div>

  </div>
        </div>
    )
}
export default Pendientes