'use client'
import { agregarCampoMes } from "@/ts/agregarMes";
import { formatearFecha } from "@/ts/fecha";
import { getId } from "@/ts/getId";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react"
import Cargando from "../components/Cargando";


const Clases = () => {
    const [clasesPasadas, setClasesPasadas] = useState<AsistenciaInstrumento[]>([])
    const [error, setError] = useState<Error | null>(null);
    const [clasesMes, setClasesMes] = useState<AsistenciaMes[]>([])

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


    useEffect(() => {
        const fetchData = async () => {
            try {
              if (id === null || id === undefined) {
                return;
              }
                const response = await fetch(`https://horarioslegatto.vercel.app/api/clasespasadas?id=${id}`)
                if (!response.ok) {
                    throw new Error('No se pudo obtener')
                }
                const data = await response.json()
                setClasesPasadas(data.clases)
            } catch (error) {
                setError((error as Error))
            }
        }
        fetchData();
    }, [id]); // Cambiado a un array vacío
    
    const agregarCampoMesCallback = useCallback(() => {
      if(clasesPasadas){
        return agregarCampoMes(clasesPasadas);
      }
      }, [clasesPasadas]);
    
      useEffect(() => {
        const claseMes = agregarCampoMesCallback();
        if(claseMes){
          setClasesMes(claseMes);
        }

      }, [agregarCampoMesCallback]);


      const meses: Record<number, AsistenciaMes[]> = {};

      const obtenerNombreMes = (mes: number) => {
        const mesesEnEspanol = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ];
        return mesesEnEspanol[mes - 1];
      };
      if(clasesMes){
        clasesMes.forEach((asistencia) => {
          const { mes } = asistencia;
          if (!meses[mes]) {
            meses[mes] = [];
          }
          meses[mes].push(asistencia);
        });
      }
      if (error) {
        return <p className='text-center p-6'>No tiene clases pasadas</p>;
      }
  return (
    <div>
       { (id === null || id === undefined) || (clasesPasadas === null || clasesPasadas === undefined || clasesPasadas.length < 0) ?
                (clasesPasadas === null?
                    (<Cargando />)
                    :
                    (<p className="text-center p-2 m-3">No tiene clases pasadas</p> ))
                  : 
                Object.keys(meses).map((mes) => (
                    <div key={mes} className="mb-8">
                      <h2 className="text-2xl font-bold mb-4 p-1 m-2 text-center">{obtenerNombreMes(parseInt(mes, 10))}</h2>
                      <table className="min-w-full border border-gray-300">
                        <thead>
                          <tr>
                            <th className="border bg-gray-200 p-2">Alumno</th>
                            <th className="border bg-gray-200 p-2">Fecha</th>
                            <th className="border bg-gray-200 p-2">Instrumento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {meses[parseInt(mes, 10)].map((element) => (
                            <tr key={element.id}>
                              <td className="border p-2">{`${element.nombre} ${element.apellido}`}</td>
                              <td className="border p-2">{formatearFecha(element.fecha)}</td>
                              <td className="border p-2">{element.instrumento}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
            

          }
    </div>
  )
}

export default Clases