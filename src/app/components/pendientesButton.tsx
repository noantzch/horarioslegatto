import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { formatearFecha } from '@/ts/fecha';

type PendientesButtonProps = {
  asistencia: Asistencia;
};

const PendientesButton: React.FC<PendientesButtonProps> = ({ asistencia }) => {
  const [asistio, setAsistio] = useState<boolean | null>(null);

  const confirmarAsistencia = async (asistio: boolean) => {
    try {
      const response = await fetch(`https://horarioslegatto.vercel.app/api/confirmarAsistencia?id=${asistencia.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asistio }),
      });

      if (!response.ok) {
        throw new Error('Error al confirmar asistencia');
      }

      // Puedes hacer algo con la respuesta si es necesario
      const data = await response.json();
     
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error como sea necesario
    }
  };

  const handleClick = () => {
    Swal.fire({
      title: "Confirmación de Clase",
      text: `¿Se realizó la clase de ${asistencia.nombre} el ${formatearFecha(asistencia.fecha)}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.isConfirmed) {
        setAsistio(true);
      } else {
        setAsistio(false);
      }
    });
  };

  useEffect(() => {
    if (asistio !== null) {
      confirmarAsistencia(asistio);
    }
  }, [asistio, asistencia.id]);

  return (
    <button
      className="border p-1 bg-gray-200 rounded hover:bg-gray-300 ease-in-out transition-all"
      onClick={handleClick}
    >
      Clase Realizada/ No realizada
    </button>
  );
};

export default PendientesButton;
