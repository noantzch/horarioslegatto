'use client'
import { agregarCampoMes } from "@/ts/agregarMes";
import { formatearFecha } from "@/ts/fecha";
import { useCallback, useEffect, useState } from "react"


const Clases = () => {
    const [clasesPasadas, setClasesPasadas] = useState<AsistenciaInstrumento[]>([])
    const [error, setError] = useState<Error | null>(null);
    const [clasesMes, setClasesMes] = useState<AsistenciaMes[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/clasespasadas?id=1")
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
    }, []); // Cambiado a un array vacío
    
    const agregarCampoMesCallback = useCallback(() => {
        return agregarCampoMes(clasesPasadas);
      }, [clasesPasadas]);
    
      useEffect(() => {
        const claseMes = agregarCampoMesCallback();
        setClasesMes(claseMes);

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
      clasesMes.forEach((asistencia) => {
        const { mes } = asistencia;
        if (!meses[mes]) {
          meses[mes] = [];
        }
        meses[mes].push(asistencia);
      });
  return (
    <div>
        {Object.keys(meses).map((mes) => (
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